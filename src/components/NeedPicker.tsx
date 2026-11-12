"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { Arrow, Chevron } from "./Icons";

type Option = { id: string; phrase: string };

/** "I want AI to [ … ▾ ] [Show me]" — filters the project library and scrolls to it. */
export default function NeedPicker({ options, prefix, placeholder, button }: { options: Option[]; prefix: string; placeholder: string; button: string }) {
  const [id, setId] = useState("");

  const go = () => {
    if (!id) return;
    track("need-picked", { need: id });
    window.dispatchEvent(new CustomEvent("portfolio:filter", { detail: { needs: [id] } }));
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        go();
      }}
      className="rounded-2xl border border-line bg-surface p-4 shadow-[0_8px_30px_-12px_rgb(60_40_20/0.2)] sm:p-5"
    >
      <label htmlFor="need" className="font-display text-xl text-muted sm:text-2xl">
        {prefix}
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <select
            id="need"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={`h-14 w-full appearance-none rounded-xl border-2 border-line bg-bg pl-4 pr-11 font-display text-lg italic focus:border-accent focus:outline-none sm:text-xl ${id ? "text-accent" : "text-faint"}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((o) => (
              <option key={o.id} value={o.id} className="font-sans not-italic text-ink">
                {o.phrase}
              </option>
            ))}
          </select>
          <Chevron className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        </div>
        <button
          type="submit"
          disabled={!id}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-medium text-accent-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {button} <Arrow className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
