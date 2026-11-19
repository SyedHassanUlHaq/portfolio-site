"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type ChapterLink = { id: string; n: string; label: string };

/** Numbered table of contents in the header. On the homepage it highlights the chapter you're reading. */
export default function ChapterNav({ items }: { items: ChapterLink[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Chapters" className="hidden items-center gap-1 md:flex">
      {items.map((i) => (
        <Link
          key={i.id}
          href={`/#${i.id}`}
          prefetch={false}
          aria-current={active === i.id ? "location" : undefined}
          className={`group flex items-baseline gap-1.5 rounded px-2.5 py-2 text-sm transition ${active === i.id ? "text-ink" : "text-muted hover:text-ink"}`}
        >
          <span className={`text-[11px] tabular-nums ${active === i.id ? "text-accent" : "text-faint"}`}>{i.n}</span>
          <span className={active === i.id ? "border-b-2 border-accent" : ""}>{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}
