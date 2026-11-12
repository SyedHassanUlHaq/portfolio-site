"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { INDUSTRIES, NEEDS, TECH, type TechGroup } from "../../content/taxonomy";
import { site } from "../../content/site";
import { track } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { emptyFilters, facetCounts, filterAndRank, type Facet, type Filters } from "@/lib/search";
import type { ProjectCardData } from "@/lib/types";
import { Chevron, Close, NeedIcon, Search } from "./Icons";
import ProjectCard from "./ProjectCard";

const PARAMS: Facet[] = ["needs", "industries", "tech"];
const INITIAL = 9;

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
  const [expanded, setExpanded] = useState(false);
  const ready = useRef(false);

  // Restore state from a shared link like /?needs=calls#work
  useEffect(() => {
    const s = readUrl();
    setQ(s.q);
    setFilters(s.filters);
    ready.current = true;
  }, []);

  // The hero picker ("I want AI to…") tells us what to show.
  useEffect(() => {
    const onPick = (e: Event) => {
      const needs = (e as CustomEvent<{ needs: string[] }>).detail.needs;
      setQ("");
      setFilters({ ...emptyFilters(), needs });
    };
    window.addEventListener("portfolio:filter", onPick);
    return () => window.removeEventListener("portfolio:filter", onPick);
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
      needs: facetCounts(projects, q, filters, "needs"),
      industries: facetCounts(projects, q, filters, "industries"),
      tech: facetCounts(projects, q, filters, "tech"),
    }),
    [projects, q, filters],
  );

  const all = useMemo(() => {
    const present = (f: Facet) => new Set(projects.flatMap((p) => p[f]));
    return { needs: present("needs"), industries: present("industries"), tech: present("tech") };
  }, [projects]);

  const toggle = (facet: Facet, id: string) => {
    setFilters((f) => {
      const on = f[facet].includes(id);
      if (!on) track("filter", { facet, value: id });
      return { ...f, [facet]: on ? f[facet].filter((x) => x !== id) : [...f[facet], id] };
    });
  };
  const active = filters.needs.length + filters.industries.length + filters.tech.length + (q ? 1 : 0);
  const clear = () => {
    setQ("");
    setFilters(emptyFilters());
  };
  // Browsing starts with the strongest few; searching or filtering always shows every match.
  const collapsed = !expanded && active === 0 && results.length > INITIAL;
  const shown = collapsed ? results.slice(0, INITIAL) : results;

  const needIds = Object.keys(NEEDS).filter((id) => all.needs.has(id));
  const industryIds = Object.keys(INDUSTRIES).filter((id) => all.industries.has(id));
  const techGroups = useMemo(() => {
    const g = new Map<TechGroup, string[]>();
    for (const [id, t] of Object.entries(TECH)) if (all.tech.has(id)) g.set(t.group, [...(g.get(t.group) ?? []), id]);
    return [...g.entries()];
  }, [all.tech]);

  return (
    <div>
      {/* What do you need? */}
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="What do you need?">
        {needIds.map((id) => (
          <NeedPill key={id} id={id} on={filters.needs.includes(id)} count={counts.needs[id] ?? 0} onClick={() => toggle("needs", id)}>
            {NEEDS[id].label}
          </NeedPill>
        ))}
      </div>

      {/* Search */}
      <div className="relative mt-5">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Or search: “real estate voice agent”, “Instagram”, “n8n”…"
          aria-label="Search projects"
          className="h-14 w-full rounded-xl border border-line bg-surface pl-12 pr-12 text-base text-ink placeholder:text-faint focus:border-accent focus:outline-none"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-ink">
            <Close className="h-4 w-4" />
          </button>
        )}
      </div>
      {!q && site.searchExamples.length > 0 && (
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-faint">
          Try:
          {site.searchExamples.map((e) => (
            <button key={e} onClick={() => setQ(e)} className="rounded px-1 py-1 text-muted underline decoration-line underline-offset-4 hover:text-accent">
              {e}
            </button>
          ))}
        </p>
      )}

      {/* Secondary filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Panel title="Industry" active={filters.industries.length}>
          <div className="flex flex-wrap gap-2">
            {industryIds.map((id) => (
              <FilterPill key={id} on={filters.industries.includes(id)} count={counts.industries[id] ?? 0} onClick={() => toggle("industries", id)}>
                {INDUSTRIES[id].label}
              </FilterPill>
            ))}
          </div>
        </Panel>
        <Panel title="Tools" active={filters.tech.length}>
          <div className="space-y-4">
            {techGroups.map(([group, ids]) => (
              <div key={group}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-faint">{group}</p>
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
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-9 rounded-lg border border-line bg-surface px-2 text-sm text-ink">
            <option value="relevance">Most relevant</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>

      {results.length > 0 ? (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
          {collapsed && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setExpanded(true);
                  track("show-all-projects");
                }}
                className="inline-flex h-12 items-center rounded-full border-2 border-ink/15 bg-surface px-7 font-medium text-ink transition hover:border-ink"
              >
                Show all {results.length} projects
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <p className="font-display text-2xl text-ink">Nothing matches that exactly.</p>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Try fewer words, or describe what you need to me. I&apos;ve probably built something close, and if not I&apos;ll tell you honestly whether I&apos;m the right fit.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button onClick={clear} className="h-11 rounded-full border border-line px-5 text-sm text-ink hover:border-accent">Reset filters</button>
            <a href={mailto("Project inquiry")} className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink">
              Message {site.shortName}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function NeedPill({ id, on, count, onClick, children }: { id: string; on: boolean; count: number; onClick: () => void; children: React.ReactNode }) {
  const disabled = !on && count === 0;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className={`inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full border-2 pl-3.5 pr-4 text-[15px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
        on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink hover:border-ink/40"
      }`}
    >
      <NeedIcon id={id} className="h-5 w-5" />
      {children}
      <span className={`text-xs ${on ? "text-bg/70" : "text-faint"}`}>{count}</span>
    </button>
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
        on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-muted hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
      <span className={`text-xs ${on ? "text-bg/70" : "text-faint"}`}>{count}</span>
    </button>
  );
}

function Panel({ title, active, children }: { title: string; active: number; children: React.ReactNode }) {
  return (
    <details className="group w-full rounded-xl border border-line bg-surface open:border-ink/20 sm:w-auto sm:min-w-[11rem] sm:open:w-full">
      <summary className="flex h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm text-muted marker:hidden hover:text-ink [&::-webkit-details-marker]:hidden">
        <span>
          Filter by {title.toLowerCase()}
          {active > 0 && <span className="ml-2 rounded-full bg-accent px-1.5 text-xs text-accent-ink">{active}</span>}
        </span>
        <Chevron className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-line p-4">{children}</div>
    </details>
  );
}
