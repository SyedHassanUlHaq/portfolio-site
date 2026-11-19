import { endorsements, site, testimonials } from "../../content/site";
import { Arrow, Star } from "./Icons";

/** Real Upwork reviews, set as printed pull quotes. Plain visible text (no review-rating markup: Google ignores self-published reviews and may penalise it). */
export default function Testimonials() {
  return (
    <>
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        {testimonials.map((t) => (
          <figure key={t.job} className="border-l-[3px] border-accent pl-6">
            <div className="flex gap-0.5 text-accent" role="img" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
            <blockquote className="mt-4 space-y-3 font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
              {t.quote.split("\n\n").map((para, i, all) => (
                <p key={para} className={`${i === 0 ? "before:mr-1 before:text-accent before:content-['“']" : ""} ${i === all.length - 1 ? "after:ml-1 after:text-accent after:content-['”']" : ""}`}>
                  {para}
                </p>
              ))}
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              <span className="font-semibold text-ink">Upwork client</span> · {t.job} · {t.when}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start gap-4 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>Clients endorse me as:</span>
          {endorsements.map((e) => (
            <span key={e} className="rounded-full border border-ink/20 px-3 py-1 text-ink">
              {e}
            </span>
          ))}
        </p>
        {site.contact.upwork && (
          <a href={site.contact.upwork} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent">
            See every review on Upwork <Arrow className="h-4 w-4" />
          </a>
        )}
      </div>
    </>
  );
}
