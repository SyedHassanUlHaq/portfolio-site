"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { INDUSTRIES, PROJECT_TYPES, TECH, type TechGroup } from "../../content/taxonomy";
import { site } from "../../content/site";
import { track } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { emptyFilters, facetCounts, filterAndRank, type Facet, type Filters } from "@/lib/search";
import type { ProjectCardData } from "@/lib/types";
import { Chevron, Close, Search } from "./Icons";
import ProjectCard from "./ProjectCard";

const PARAMS: Facet[] = ["types", "industries", "tech"];

function readUrl(): { q: string; filters: Filters } {
  const sp = new URLSearchParams(window.location.search);
  const filters = emptyFilters();
  for (const f of PARAMS) filters[f] = (sp.get(f) ?? "").split(",").filter(Boolean);
  return { q: sp.get("q") ?? "", filters };
}

function writeUrl(q: string, filters: Filters) {
  const sp = new URLSearchParams(window.location.search);
  if (q) sp.set("q", q);
  else sp.delete("q");
  for (const f of PARAMS) {
    if (filters[f].length) sp.set(f, filters[f].join(","));
    else sp.delete(f);
  }
  const qs = sp.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
}

export default function ProjectExplorer({ projects }: { projects: ProjectCardData[] }) {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<"relevance" | "newest">("relevance");
  const ready = useRef(false);

  // Restore state from a shared link like /?q=voice&industries=real-estate#work
  useEffect(() => {
    const s = readUrl();
    setQ(s.q);
    setFilters(s.filters);
    ready.current = true;
  }, []);

  useEffect(() => {
    if (ready.current) writeUrl(q, filters);
  }, [q, filters]);

  // Log what people search for (debounced), so you learn which use cases clients look for.
  useEffect(() => {
    if (!ready.current || q.trim().length < 3) return;
    const t = setTimeout(() => track("search", { q: q.trim().toLowerCase() }), 900);
    return () => clearTimeout(t);
  }, [q]);

  const results = useMemo(() => filterAndRank(projects, q, filters, sort), [projects, q, filters, sort]);
  const counts = useMemo(
    () => ({
      types: facetCounts(projects, q, filters, "types"),
      industries: facetCounts(projects, q, filters, "industries"),
      tech: facetCounts(projects, q, filters, "tech"),
    }),
    [projects, q, filters],
  );

  const all = useMemo(() => {
    const present = (f: Facet) => new Set(projects.flatMap((p) => p[f]));
    return { types: present("types"), industries: present("industries"), tech: present("tech") };
  }, [projects]);

  const toggle = (facet: Facet, id: string) => {
    setFilters((f) => {
      const on = f[facet].includes(id);
      if (!on) track("filter", { facet, value: id });
      return { ...f, [facet]: on ? f[facet].filter((x) => x !== id) : [...f[facet], id] };
    });
  };
  const active = filters.types.length + filters.industries.length + filters.tech.length + (q ? 1 : 0);
  const clear = () => {
    setQ("");
    setFilters(emptyFilters());
  };

  const typeIds = Object.keys(PROJECT_TYPES).filter((id) => all.types.has(id));
  const industryIds = Object.keys(INDUSTRIES).filter((id) => all.industries.has(id));
  const techGroups = useMemo(() => {
    const g = new Map<TechGroup, string[]>();
    for (const [id, t] of Object.entries(TECH)) if (all.tech.has(id)) g.set(t.group, [...(g.get(t.group) ?? []), id]);
    return [...g.entries()];
  }, [all.tech]);
  const examples = typeIds.slice(0, 4).map((id) => PROJECT_TYPES[id].label);

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by industry, use case or tech, e.g. “real estate voice agent”"
          aria-label="Search projects"
          className="h-14 w-full rounded-xl border border-line bg-surface pl-12 pr-12 text-base text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-ink">
            <Close className="h-4 w-4" />
          </button>
        )}
      </div>
      {!q && examples.length > 0 && (
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-faint">
          Try:
          {examples.map((e) => (
            <button key={e} onClick={() => setQ(e)} className="rounded px-1 py-1 text-muted underline decoration-line underline-offset-4 hover:text-accent">
              {e}
            </button>
          ))}
        </p>
      )}

      {/* Type chips — always visible, horizontally scrollable on phones */}
      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by project type">
        {typeIds.map((id) => (
          <FilterPill key={id} on={filters.types.includes(id)} count={counts.types[id] ?? 0} onClick={() => toggle("types", id)}>
            {PROJECT_TYPES[id].label}
          </FilterPill>
        ))}
      </div>

      {/* Secondary filters */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Panel title="Industry" active={filters.industries.length}>
          <div className="flex flex-wrap gap-2">
            {industryIds.map((id) => (
              <FilterPill key={id} on={filters.industries.includes(id)} count={counts.industries[id] ?? 0} onClick={() => toggle("industries", id)}>
                {INDUSTRIES[id].label}
              </FilterPill>
            ))}
          </div>
        </Panel>
        <Panel title="Technology" active={filters.tech.length}>
          <div className="space-y-4">
            {techGroups.map(([group, ids]) => (
              <div key={group}>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-faint">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {ids.map((id) => (
                    <FilterPill key={id} on={filters.tech.includes(id)} count={counts.tech[id] ?? 0} onClick={() => toggle("tech", id)}>
                      {TECH[id].label}
                    </FilterPill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Result bar */}
      <div className="mt-6 flex items-center justify-between gap-3 border-b border-line pb-3 text-sm">
        <p aria-live="polite" className="text-muted">
          <span className="font-medium text-ink">{results.length}</span> {results.length === 1 ? "project" : "projects"}
          {active > 0 && (
            <button onClick={clear} className="ml-3 rounded px-1 py-1 text-accent underline-offset-4 hover:underline">
              Clear all
            </button>
          )}
        </p>
        <label className="flex items-center gap-2 text-faint">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-9 rounded-md border border-line bg-surface px-2 text-sm text-ink">
            <option value="relevance">Most relevant</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-line p-8 text-center">
          <p className="text-lg font-medium text-ink">No project matches that exactly.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Try fewer words, or describe your use case to me. I&apos;ve probably built something adjacent, and if not I can tell you honestly whether I&apos;m the right fit.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button onClick={clear} className="h-10 rounded-md border border-line px-4 text-sm text-ink hover:border-accent">Reset filters</button>
            <a href={mailto("Project inquiry")} className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-ink">
              Message {site.shortName}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPill({ on, count, onClick, children }: { on: boolean; count: number; onClick: () => void; children: React.ReactNode }) {
  const disabled = !on && count === 0;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition disabled:cursor-not-allowed disabled:opacity-35 ${
        on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted hover:border-accent/50 hover:text-ink"
      }`}
    >
      {children}
      <span className={`font-mono text-xs ${on ? "text-accent-ink/70" : "text-faint"}`}>{count}</span>
    </button>
  );
}

function Panel({ title, active, children }: { title: string; active: number; children: React.ReactNode }) {
  return (
    <details className="group w-full rounded-xl border border-line bg-surface open:border-accent/30 sm:w-auto sm:min-w-[11rem] sm:open:w-full">
      <summary className="flex h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm text-muted marker:hidden hover:text-ink [&::-webkit-details-marker]:hidden">
        <span>
          {title}
          {active > 0 && <span className="ml-2 rounded-full bg-accent px-1.5 font-mono text-xs text-accent-ink">{active}</span>}
        </span>
        <Chevron className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-line p-4">{children}</div>
    </details>
  );
}
