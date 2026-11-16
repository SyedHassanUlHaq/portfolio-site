import { Chevron } from "./Icons";

/** Visible Q&A. Answers are real text in the HTML (collapsed by default), so search engines and AI assistants can read and quote them. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((i) => (
        <details key={i.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-lg font-medium text-ink sm:text-xl">{i.q}</h3>
            <Chevron className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 text-[17px] text-muted">{i.a}</p>
        </details>
      ))}
    </div>
  );
}
