import { NEEDS } from "../../content/taxonomy";
import { site } from "../../content/site";
import { ev } from "@/lib/analytics";
import { book } from "@/lib/contact";
import { loomId } from "@/lib/loom";
import { youtubeId } from "@/lib/video";
import { withBase } from "@/lib/url";
import AssistantLink from "./AssistantLink";
import { Star } from "./Icons";
import NeedPicker from "./NeedPicker";
import VideoFacade from "./VideoFacade";

export default function Hero({ availableNeeds }: { availableNeeds: string[] }) {
  const { hero, introVideo, trust, contact } = site;
  const id = loomId(introVideo.url);
  const yt = youtubeId(introVideo.url);
  const hasVideo = !!(introVideo.src || id || yt);
  const options = availableNeeds.filter((n) => n in NEEDS).map((n) => ({ id: n, phrase: NEEDS[n].phrase }));
  const call = book();
  const btn = "inline-flex h-11 items-center justify-center rounded-full px-5 text-[15px] font-medium transition";

  return (
    <div className="hero-wash border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden /> Available for new projects
          </p>
          <h1 className="mt-4 font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-[3.1rem] lg:text-[3.3rem]">{hero.headline}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{hero.sub}</p>

          {/* proof on the first phone screen (the full stats block sits below the video there) */}
          <p className="mt-4 text-sm leading-relaxed text-muted lg:hidden">
            {trust.map((t, i) => (
              <span key={t.label}>
                {i > 0 && <span aria-hidden className="mx-2 text-ink/30">·</span>}
                <span className="font-semibold text-ink">{t.value}</span> {t.label}
              </span>
            ))}
          </p>

          <div className="mt-6 max-w-xl">
            <NeedPicker options={options} prefix={hero.pickerPrefix} placeholder={hero.pickerPlaceholder} button={hero.pickerButton} buttonEmpty={hero.pickerButtonEmpty} />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={call.href}
                {...(call.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...ev("cta-click", { where: "hero-book" })}
                className={`${btn} bg-ink text-bg hover:bg-accent`}
              >
                Book a call
              </a>
              {contact.upwork && (
                <a
                  href={contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...ev("cta-click", { where: "hero-upwork" })}
                  className={`${btn} border-2 border-ink/15 bg-surface text-ink hover:border-ink`}
                >
                  View my Upwork profile
                </a>
              )}
              <AssistantLink className="text-[15px] font-medium text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent" />
            </div>

            <figure className="mt-5 flex items-start gap-3 text-sm text-muted">
              <span className="mt-0.5 flex shrink-0 gap-0.5 text-accent" role="img" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5" />
                ))}
              </span>
              <blockquote>
                “…quick, professional, and very responsive.” <span className="text-faint">· Upwork client</span>
              </blockquote>
            </figure>
          </div>
        </div>

        <div>
          {hasVideo && (
            <VideoFacade
              src={introVideo.src ? withBase(introVideo.src) : undefined}
              loomId={introVideo.src ? undefined : id}
              youtubeId={introVideo.src ? undefined : yt}
              shareUrl={introVideo.src ? undefined : introVideo.url}
              posterHasPlay={introVideo.posterHasPlay}
              title={introVideo.title}
              duration={introVideo.duration}
              posterSrc={introVideo.poster ? withBase(introVideo.poster) : undefined}
              label="intro"
              priority
            />
          )}
          <div className="mt-5 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/images/hassan-avatar.webp")} alt={site.name} width={56} height={56} className="h-14 w-14 rounded-full border-2 border-surface object-cover shadow-sm" />
            <div className="min-w-0">
              <p className="font-display text-lg font-medium text-ink">{site.name}</p>
              <p className="text-sm text-muted">{site.role}</p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
            {trust.map((t) => (
              <div key={t.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-0.5 text-xs leading-snug text-muted">{t.label}</dt>
                <dd className="font-display text-2xl font-medium tracking-tight text-ink">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
