import { Chevron } from "./Icons";

/** Visible Q&A. Answers are real text in the HTML (collapsed by default), so search engines and AI assistants can read and quote them. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/15 border-y border-ink/20">
      {items.map((i, idx) => (
        <details key={i.q} className="group">
          <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 marker:hidden hover:bg-white/40 [&::-webkit-details-marker]:hidden">
            <span aria-hidden className="w-7 shrink-0 text-sm tabular-nums text-faint">{String(idx + 1).padStart(2, "0")}</span>
            <h3 className="flex-1 font-display text-xl font-medium text-ink sm:text-2xl">{i.q}</h3>
            <Chevron className="h-5 w-5 shrink-0 self-center text-muted transition group-open:rotate-180" />
          </summary>
          <p className="pb-6 pl-11 pr-8 text-[17px] text-muted">{i.a}</p>
        </details>
      ))}
    </div>
  );
}
