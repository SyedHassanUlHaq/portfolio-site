import Link from "next/link";
import { industryLabel, needLabel } from "@/lib/labels";
import { withBase } from "@/lib/url";
import type { ProjectCardData } from "@/lib/types";
import { Arrow, Play } from "./Icons";

/** One line of the project index: number, title, one-line summary, and a thumbnail that slides in on hover. */
export default function ProjectRow({ p, n }: { p: ProjectCardData; n: number }) {
  return (
    <li className="group relative border-b border-ink/15 transition-colors hover:bg-white/50">
      <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 py-5 sm:grid-cols-[3.5rem_1fr_2rem] sm:gap-x-5 lg:pr-64">
        <span aria-hidden className="text-sm tabular-nums text-faint">{String(n).padStart(2, "0")}</span>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
            <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-2px]">
              {p.title}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 max-w-2xl text-[15px] text-muted">{p.summary}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wider text-faint">
            <span>
              {needLabel(p.needs[0])} · {p.industries.map(industryLabel).join(" · ")}
            </span>
            {p.featured && p.featured <= 3 && <span className="rounded-full bg-accent-soft px-2 py-0.5 normal-case tracking-normal text-accent-strong">Featured</span>}
            {p.hasLoom && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 normal-case tracking-normal text-accent-ink">
                <Play className="h-2.5 w-2.5" /> Watch{p.loomDuration ? ` · ${p.loomDuration}` : ""}
              </span>
            )}
          </p>
        </div>
        <Arrow className="hidden h-5 w-5 self-center text-faint transition group-hover:translate-x-1 group-hover:text-accent sm:block" />
      </div>
      {p.thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={withBase(p.thumb.src)}
          alt=""
          width={640}
          height={360}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute right-14 top-1/2 z-10 hidden w-56 -translate-y-1/2 rotate-2 scale-95 rounded-lg border border-ink/10 opacity-0 shadow-[0_20px_40px_-18px_rgb(60_40_20/0.5)] transition duration-200 group-hover:rotate-1 group-hover:scale-100 group-hover:opacity-100 group-focus-within:opacity-100 lg:block"
        />
      )}
    </li>
  );
}
