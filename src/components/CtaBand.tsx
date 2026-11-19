import { site } from "../../content/site";
import { ev } from "@/lib/analytics";
import { book, mailto } from "@/lib/contact";

const primary = "inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 font-medium text-bg transition hover:bg-accent";
const secondary = "inline-flex h-12 items-center justify-center rounded-full border-2 border-ink/20 bg-white/60 px-7 font-medium text-ink transition hover:border-ink";

/** The closing "next step" for a page: book a call first, Upwork second, email as the quiet third option. */
export default function CtaBand({ id, eyebrow, heading, text, where }: { id?: string; eyebrow?: string; heading: string; text: string; where: string }) {
  const call = book();
  return (
    <section id={id} className="bg-tone-peach">
      <div aria-hidden className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-[5px] border-y border-ink/25" />
      </div>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">{eyebrow}</p>}
        <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">{heading}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink/70">{text}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={call.href} {...(call.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...ev("cta-click", { where: `${where}-book` })} className={primary}>
            Book a call
          </a>
          {site.contact.upwork && (
            <a href={site.contact.upwork} target="_blank" rel="noopener noreferrer" {...ev("cta-click", { where: `${where}-upwork` })} className={secondary}>
              Hire me on Upwork
            </a>
          )}
        </div>
        <p className="mt-5 text-sm text-ink/70">
          Prefer email?{" "}
          <a href={mailto("Project inquiry")} {...ev("cta-click", { where: `${where}-email` })} className="font-medium text-ink underline decoration-ink/30 decoration-2 underline-offset-4 hover:decoration-accent">
            {site.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}

/** Small card for the middle of a long page, so phone visitors don't have to reach the bottom to act. */
export function InlineCta({ where }: { where: string }) {
  const call = book();
  return (
    <div className="rounded-2xl bg-tone-peach p-5">
      <p className="font-display text-xl font-medium text-ink">Need something like this?</p>
      <p className="mt-1 text-[15px] text-ink/70">Tell me what you want to automate and I&apos;ll say how I&apos;d approach it.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a href={call.href} {...(call.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...ev("cta-click", { where: `${where}-inline-book` })} className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-bg hover:bg-accent">
          Book a call
        </a>
        {site.contact.upwork && (
          <a href={site.contact.upwork} target="_blank" rel="noopener noreferrer" {...ev("cta-click", { where: `${where}-inline-upwork` })} className="inline-flex h-11 items-center justify-center rounded-full border-2 border-ink/20 bg-white/60 px-6 text-[15px] font-medium text-ink hover:border-ink">
            Message me on Upwork
          </a>
        )}
      </div>
    </div>
  );
}
