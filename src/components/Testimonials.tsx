import { endorsements, site, testimonials } from "../../content/site";
import { Arrow, Star } from "./Icons";
import { SectionHead } from "./Section";

/** Real Upwork reviews. Plain visible quotes (no review-rating markup: Google ignores self-published reviews and may penalise it). */
export default function Testimonials() {
  return (
    <>
      <SectionHead eyebrow="What clients say" title="Five stars, in their words" sub="Real reviews from my Upwork profile." />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.job} className="flex flex-col rounded-2xl bg-tone-butter p-7">
            <div className="flex gap-0.5 text-accent" role="img" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5" />
              ))}
            </div>
            <blockquote className="mt-4 space-y-3 font-display text-xl leading-snug text-ink sm:text-2xl">
              {t.quote.split("\n\n").map((para) => (
                <p key={para}>{para}</p>
              ))}
            </blockquote>
            <figcaption className="mt-auto pt-6 text-sm text-ink/70">
              <span className="font-semibold text-ink">Upwork client</span> · {t.job} · {t.when}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>Clients endorse me as:</span>
          {endorsements.map((e) => (
            <span key={e} className="rounded-full border border-line bg-surface px-3 py-1 text-ink">
              {e}
            </span>
          ))}
        </p>
        {site.contact.upwork && (
          <a href={site.contact.upwork} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent">
            See every review on Upwork <Arrow className="h-4 w-4" />
          </a>
        )}
      </div>
    </>
  );
}
