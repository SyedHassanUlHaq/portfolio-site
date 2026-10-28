import "server-only";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { INDUSTRIES, PROJECT_TYPES, TECH } from "../../content/taxonomy";
import { loomId } from "./loom";
import { buildIndex } from "./search";
import type { Project, ProjectCardData, ProjectSource, ResolvedScreenshot } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/projects");
const PUBLIC_DIR = path.join(process.cwd(), "public/projects");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

/* ---------- validation: fail the build loudly, with the file name and fix ---------- */

function validate(file: string, p: ProjectSource): string[] {
  const errs: string[] = [];
  const e = (m: string) => errs.push(`${file}: ${m}`);
  const slug = path.basename(file, ".json");
  if (p.slug !== slug) e(`"slug" is "${p.slug}" but the file is named ${slug}.json — they must match`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug ?? "")) e(`"slug" must be lowercase-with-hyphens`);
  for (const k of ["title", "summary"] as const) if (!p[k]?.trim()) e(`"${k}" is required`);
  const checkIds = (key: "types" | "industries" | "tech", table: Record<string, unknown>, where: string) => {
    if (!Array.isArray(p[key]) || p[key].length === 0) return e(`"${key}" needs at least one id`);
    for (const id of p[key]) if (!(id in table)) e(`unknown ${key} id "${id}" — add it to content/taxonomy.ts (${where}) or fix the typo`);
  };
  checkIds("types", PROJECT_TYPES, "PROJECT_TYPES");
  checkIds("industries", INDUSTRIES, "INDUSTRIES");
  checkIds("tech", TECH, "TECH");
  if (p.loom && !loomId(p.loom.url)) e(`loom.url must look like https://www.loom.com/share/<id>`);
  return errs;
}


/* ---------- loading ---------- */

function resolveScreenshots(slug: string, shots: ProjectSource["screenshots"] = [], errs: string[]): ResolvedScreenshot[] {
  return shots.flatMap((s) => {
    const file = path.join(PUBLIC_DIR, slug, s.src);
    if (!fs.existsSync(file)) {
      errs.push(`${slug}: screenshot "${s.src}" not found — expected at public/projects/${slug}/${s.src}`);
      return [];
    }
    const { width, height } = imageSize(fs.readFileSync(file));
    const sm = s.src.replace(/\.(webp|png|jpe?g)$/i, "-sm.webp");
    const hasSm = sm !== s.src && fs.existsSync(path.join(PUBLIC_DIR, slug, sm));
    return [{ ...s, width, height, srcSm: hasSm ? sm : undefined }];
  });
}

/** Applies confidentiality rules *before* data reaches any page, so redacted details never ship in the HTML. */
function redact(p: ProjectSource, screenshots: ResolvedScreenshot[]) {
  const level = p.confidentiality ?? "public";
  const strip = level === "nda";
  return {
    level,
    screenshots: strip ? [] : screenshots,
    loom: strip ? undefined : p.loom,
    links: level === "public" ? p.links : undefined,
    clientName: level === "public" ? p.clientName : undefined,
    testimonial: p.testimonial && level === "public" ? p.testimonial : p.testimonial && { ...p.testimonial, author: p.clientAlias },
  };
}

let cache: Project[] | undefined;

export function getAllProjects(): Project[] {
  if (cache) return cache;
  const errs: string[] = [];
  const files = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json")) : [];
  const projects: Project[] = [];

  for (const file of files) {
    let src: ProjectSource;
    try {
      src = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"));
    } catch (err) {
      errs.push(`${file}: invalid JSON (${(err as Error).message})`);
      continue;
    }
    if (src.draft && !SHOW_DRAFTS) continue;
    const before = errs.length;
    errs.push(...validate(file, src));
    const shots = resolveScreenshots(src.slug, src.screenshots, errs);
    if (errs.length > before) continue;

    const r = redact(src, shots);
    const posterFile = src.loom?.poster;
    projects.push({
      ...src,
      screenshots: r.screenshots,
      loom: r.loom,
      links: r.links,
      clientName: r.clientName,
      testimonial: r.testimonial,
      confidentiality: r.level,
      loomId: r.loom && loomId(r.loom.url),
      posterSrc: r.loom ? posterFile ?? r.screenshots[0]?.src : undefined,
    });
  }

  if (errs.length) throw new Error(`\n\nContent errors:\n  - ${errs.join("\n  - ")}\n`);
  const rank = (p: Project) => (p.featured ? p.featured : 999);
  projects.sort((a, b) => rank(a) - rank(b) || (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));
  return (cache = projects);
}

export const getListedProjects = () => getAllProjects().filter((p) => !p.unlisted);
export const getProject = (slug: string) => getAllProjects().find((p) => p.slug === slug);
export const getFeatured = () => getListedProjects().filter((p) => p.featured).slice(0, 3);

/** Related = most shared types/industries/tech. */
export function getRelated(p: Project, n = 3): Project[] {
  const overlap = (a: string[], b: string[]) => a.filter((x) => b.includes(x)).length;
  return getListedProjects()
    .filter((o) => o.slug !== p.slug)
    .map((o) => ({ o, s: overlap(o.types, p.types) * 3 + overlap(o.industries, p.industries) * 2 + overlap(o.tech, p.tech) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.o);
}

export function toCard(p: Project): ProjectCardData {
  const shot = p.screenshots[0];
  const label = (table: Record<string, { label: string; aliases?: string[] }>, ids: string[]) =>
    ids.flatMap((id) => [table[id].label, ...(table[id].aliases ?? [])]);
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    types: p.types,
    industries: p.industries,
    tech: p.tech,
    featured: p.featured,
    year: p.year,
    hasLoom: !!p.loomId,
    loomDuration: p.loom?.duration,
    confidentiality: p.confidentiality,
    thumb: shot && {
      src: `/projects/${p.slug}/${shot.srcSm ?? shot.src}`,
      width: shot.srcSm ? 640 : shot.width,
      height: shot.srcSm ? Math.round((640 * shot.height) / shot.width) : shot.height,
      alt: shot.alt,
      blur: shot.blur,
    },
    index: buildIndex({
      title: p.title,
      labels: [...label(PROJECT_TYPES, p.types), ...label(INDUSTRIES, p.industries), ...label(TECH, p.tech)],
      keywords: p.keywords ?? [],
      text: [p.summary, p.problem ?? "", p.solution ?? "", ...(p.highlights ?? []), p.clientAlias ?? ""],
    }),
  };
}
