import Link from "next/link";
import { industryLabel } from "@/lib/labels";
import type { ProjectCardData } from "@/lib/types";
import { withBase } from "@/lib/url";
import Cover from "./Cover";
import { Play } from "./Icons";

export default function ProjectCard({ p, from }: { p: ProjectCardData; priority?: boolean; from?: string }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgb(60_40_20/0.25)]">
      <div className="relative">
        {p.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={withBase(p.thumb.src)} alt={p.thumb.alt} width={640} height={360} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
        ) : (
          <Cover needs={p.needs} slug={p.slug} />
        )}
        {p.featured && p.featured <= 3 && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm">Featured</span>
        )}
        {p.hasLoom && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink shadow-sm">
            <Play className="h-3 w-3" /> Watch{p.loomDuration ? ` · ${p.loomDuration}` : ""}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5 pb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-faint">{p.industries.map(industryLabel).join(" · ")}</p>
        <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-ink">
          <Link
            href={`/projects/${p.slug}${from ? `?ref=${from}` : ""}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-2px]"
          >
            {p.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[15px] text-muted">{p.summary}</p>
      </div>
    </article>
  );
}
