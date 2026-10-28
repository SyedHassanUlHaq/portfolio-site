import Link from "next/link";
import { withBase } from "@/lib/url";
import { industryLabel, techLabel, typeLabel } from "@/lib/labels";
import type { ProjectCardData } from "@/lib/types";
import { Chip } from "./Chip";
import { Lock, Play } from "./Icons";

const MAX_TECH = 4;

export default function ProjectCard({ p, priority = false, from }: { p: ProjectCardData; priority?: boolean; from?: string }) {
  const extra = p.tech.length - MAX_TECH;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-accent/40">
      <div className={`relative overflow-hidden border-b border-line bg-raised ${p.thumb ? "aspect-[16/10]" : "aspect-[16/6]"}`}>
        {p.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBase(p.thumb.src)}
            alt={p.thumb.alt}
            width={p.thumb.width}
            height={p.thumb.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={`h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02] ${p.thumb.blur ? "blur-md" : ""}`}
          />
        ) : (
          <div className="bg-grid flex h-full w-full items-end p-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-faint">{typeLabel(p.types[0])}</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {p.hasLoom && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-ink">
              <Play className="h-3 w-3" /> Video walkthrough{p.loomDuration ? ` · ${p.loomDuration}` : ""}
            </span>
          )}
          {p.confidentiality !== "public" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-bg/85 px-2.5 py-1 text-xs text-muted">
              <Lock className="h-3 w-3" /> {p.confidentiality === "nda" ? "Under NDA" : "Client anonymized"}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
          {p.industries.map(industryLabel).join(" · ")} <span aria-hidden>/</span> {p.types.map(typeLabel).slice(0, 2).join(" · ")}
        </p>
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">
          <Link
            href={`/projects/${p.slug}${from ? `?ref=${from}` : ""}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-2px]"
          >
            {p.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-muted">{p.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {p.tech.slice(0, MAX_TECH).map((t) => (
            <Chip key={t}>{techLabel(t)}</Chip>
          ))}
          {extra > 0 && <Chip>+{extra}</Chip>}
        </div>
      </div>
    </article>
  );
}

