/**
 * One "page" of the document: a big chapter number and a margin note on the left, the content on the right.
 * The left column stays pinned while the chapter scrolls, like a running margin.
 */
export default function Chapter({
  id,
  n,
  label,
  note,
  children,
}: {
  id: string;
  n: string;
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      {/* double hairline, like a printed rule */}
      <div aria-hidden className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-[5px] border-y border-ink/20" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[12rem_1fr] lg:gap-16">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <p aria-hidden className="font-display text-6xl font-light leading-none text-ink/20 sm:text-7xl">
            {n}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{label}</p>
          {note && <p className="mt-3 hidden max-w-[11rem] text-sm leading-snug text-faint lg:block">{note}</p>}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function ChapterTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-10">
      <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">{children}</h2>
      {sub && <p className="mt-4 text-lg text-muted">{sub}</p>}
    </div>
  );
}
