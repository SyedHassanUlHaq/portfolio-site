"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { Check, Link as LinkIcon } from "./Icons";

/** Copies this project's URL — the plain one, or one tagged ?ref=upwork so you can see Upwork traffic in analytics. */
export default function ShareButtons({ slug }: { slug: string }) {
  const [done, setDone] = useState<string | null>(null);

  const copy = async (ref?: string) => {
    const url = new URL(window.location.href);
    url.search = ref ? `?ref=${ref}` : "";
    url.hash = "";
    try {
      await navigator.clipboard.writeText(url.toString());
    } catch {
      window.prompt("Copy this link:", url.toString());
    }
    track("share-copy", { project: slug, ref: ref ?? "none" });
    setDone(ref ?? "plain");
    setTimeout(() => setDone(null), 1800);
  };

  const btn = "inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm text-muted transition hover:border-accent/50 hover:text-ink";
  return (
    <div className="flex flex-wrap gap-2">
      <button className={btn} onClick={() => copy()}>
        {done === "plain" ? <Check className="h-4 w-4 text-accent" /> : <LinkIcon className="h-4 w-4" />}
        {done === "plain" ? "Copied" : "Copy link"}
      </button>
      <button className={btn} onClick={() => copy("upwork")} title="Adds ?ref=upwork so analytics can attribute the visit">
        {done === "upwork" ? <Check className="h-4 w-4 text-accent" /> : <LinkIcon className="h-4 w-4" />}
        {done === "upwork" ? "Copied" : "Copy for Upwork"}
      </button>
    </div>
  );
}
