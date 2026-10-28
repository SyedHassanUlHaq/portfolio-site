"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projectImg } from "@/lib/url";
import { track } from "@/lib/analytics";
import type { ResolvedScreenshot } from "@/lib/types";
import { Arrow, Back, Close } from "./Icons";

const KIND_LABEL: Record<string, string> = {
  ui: "Interface",
  workflow: "Workflow",
  architecture: "Architecture",
  docs: "API docs",
  "before-after": "Before / after",
};

export default function Gallery({ slug, shots }: { slug: string; shots: ResolvedScreenshot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const show = (i: number) => {
    setOpen(i);
    track("screenshot-open", { project: slug });
  };
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)), [shots.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const cur = open !== null ? shots[open] : null;

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2">
        {shots.map((s, i) => {
          const ratio = Math.min(Math.max(s.width / s.height, 0.8), 2);
          return (
            <li key={s.src} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => show(i)}
                className="group block w-full overflow-hidden rounded-lg border border-line bg-surface text-left transition hover:border-accent/50"
                aria-label={`Enlarge screenshot: ${s.alt}`}
              >
                <span className="block overflow-hidden" style={{ aspectRatio: ratio }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={projectImg(slug, s.srcSm ?? s.src)}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02] ${s.blur ? "blur-md" : ""}`}
                  />
                </span>
                {(s.caption || s.kind) && (
                  <span className="block border-t border-line px-3 py-2 text-xs text-muted">
                    {s.kind && s.kind !== "other" && <span className="mr-2 font-mono uppercase tracking-wider text-faint">{KIND_LABEL[s.kind]}</span>}
                    {s.caption}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto max-h-[100dvh] w-full max-w-6xl bg-transparent p-0 text-ink backdrop:bg-black/85"
        aria-label="Screenshot viewer"
      >
        {cur && (
          <div className="flex flex-col gap-3 p-3 sm:p-6">
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="font-mono">{open! + 1} / {shots.length}</span>
              <button onClick={() => setOpen(null)} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface hover:text-ink" aria-label="Close">
                <Close className="h-5 w-5" />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={projectImg(slug, cur.src)} alt={cur.alt} className={`mx-auto max-h-[78dvh] w-auto max-w-full rounded-lg object-contain ${cur.blur ? "blur-md" : ""}`} />
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted">{cur.caption ?? cur.alt}</p>
              {shots.length > 1 && (
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => step(-1)} aria-label="Previous screenshot" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface hover:text-accent"><Back /></button>
                  <button onClick={() => step(1)} aria-label="Next screenshot" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface hover:text-accent"><Arrow /></button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
