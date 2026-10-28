import { SYNONYMS } from "../../content/taxonomy";
import type { ProjectCardData } from "./types";

/* ---------- text normalisation (shared by build-time indexing and browser search) ---------- */

/** Splits into lowercase words; "Node.js" and "e-commerce" also yield "nodejs" / "ecommerce". */
export function words(text: string): string[] {
  const base = text.toLowerCase();
  const out = base.split(/[^a-z0-9+#]+/).filter(Boolean);
  for (const joined of base.match(/[a-z0-9]+(?:[-.][a-z0-9]+)+/g) ?? []) out.push(joined.replace(/[-.]/g, ""));
  return out;
}

const normToken = (t: string) => t.toLowerCase().replace(/[^a-z0-9+#]/g, "");

const synonymMap = new Map<string, string[]>();
for (const group of SYNONYMS) {
  const g = group.map(normToken);
  for (const w of g) synonymMap.set(w, g);
}

const stem = (w: string) => (w.length > 3 ? w.replace(/(ing|es|s)$/, "") : w);

/** All spellings a single query word should match. */
function variants(token: string): string[] {
  return [...new Set([token, stem(token), ...(synonymMap.get(token) ?? [])])];
}

/* ---------- indexing ---------- */

export function buildIndex(p: {
  title: string;
  labels: string[]; // type / industry / tech labels + aliases
  keywords: string[];
  text: string[]; // summary, problem, solution, highlights…
}): ProjectCardData["index"] {
  const join = (parts: string[]) => words(parts.join(" ")).join(" ");
  return {
    title: join([p.title]),
    labels: join(p.labels),
    keywords: join(p.keywords),
    text: join(p.text),
  };
}

const FIELD_WEIGHT = { title: 5, labels: 4, keywords: 3, text: 1 } as const;

/* ---------- querying ---------- */

/**
 * Every word the visitor typed must match somewhere (prefix match, synonyms expanded).
 * Returns 0 when something doesn't match, otherwise a relevance score.
 * With an empty query every project scores 1.
 */
export function score(card: ProjectCardData, query: string): number {
  const tokens = query.split(/\s+/).map(normToken).filter(Boolean);
  if (!tokens.length) return 1;
  let total = 0;
  for (const token of tokens) {
    const vs = variants(token);
    let best = 0;
    for (const field of Object.keys(FIELD_WEIGHT) as (keyof typeof FIELD_WEIGHT)[]) {
      const ws = card.index[field].split(" ");
      if (vs.some((v) => ws.some((w) => w.startsWith(v)))) best = Math.max(best, FIELD_WEIGHT[field]);
    }
    if (!best) return 0;
    total += best;
  }
  return total;
}

/* ---------- filters ---------- */

export type Facet = "types" | "industries" | "tech";
export type Filters = Record<Facet, string[]>;
export const emptyFilters = (): Filters => ({ types: [], industries: [], tech: [] });

/** OR within a facet, AND across facets. */
export function matchesFilters(card: ProjectCardData, filters: Filters, skip?: Facet): boolean {
  return (Object.keys(filters) as Facet[]).every(
    (f) => f === skip || filters[f].length === 0 || filters[f].some((v) => card[f].includes(v)),
  );
}

export function filterAndRank(cards: ProjectCardData[], query: string, filters: Filters, sort: "relevance" | "newest") {
  const scored = cards
    .filter((c) => matchesFilters(c, filters))
    .map((c) => ({ c, s: score(c, query) }))
    .filter((x) => x.s > 0);
  scored.sort((a, b) => {
    if (sort === "newest") return (b.c.year ?? 0) - (a.c.year ?? 0);
    const rank = (c: ProjectCardData) => (c.featured ? 100 - c.featured : 0);
    return b.s - a.s || rank(b.c) - rank(a.c) || (b.c.year ?? 0) - (a.c.year ?? 0);
  });
  return scored.map((x) => x.c);
}

/** How many results each option would give if picked — computed against the *other* active filters, so options never lead to dead ends. */
export function facetCounts(cards: ProjectCardData[], query: string, filters: Filters, facet: Facet) {
  const counts: Record<string, number> = {};
  for (const c of cards) {
    if (!matchesFilters(c, filters, facet) || score(c, query) === 0) continue;
    for (const v of c[facet]) counts[v] = (counts[v] ?? 0) + 1;
  }
  return counts;
}
