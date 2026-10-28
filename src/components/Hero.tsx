import { site } from "../../content/site";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { loomId } from "@/lib/loom";
import { youtubeId } from "@/lib/video";
import { withBase } from "@/lib/url";
import { Arrow } from "./Icons";
import VideoFacade from "./VideoFacade";

export default function Hero() {
  const { hero, introVideo, trust, contact } = site;
  const id = loomId(introVideo.url);
  const yt = youtubeId(introVideo.url);
  const hasVideo = !!(introVideo.src || id || yt);

  return (
    <div className="bg-grid border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-x-14 lg:gap-y-0 lg:py-24">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end lg:pb-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> Available for new projects
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">{hero.headline}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{hero.sub}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#work" {...ev("cta-click", { where: "hero-work" })} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-medium text-accent-ink transition hover:brightness-110">
              {hero.primaryCta} <Arrow className="h-4 w-4" />
            </a>
            <a
              href={contact.upwork || mailto("Project inquiry")}
              {...(contact.upwork ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...ev("cta-click", { where: "hero-contact" })}
              className="inline-flex h-12 items-center justify-center rounded-md border border-line bg-surface px-6 font-medium text-ink transition hover:border-accent/60"
            >
              {contact.upwork ? "View my Upwork profile" : hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        {hasVideo ? (
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
          />
        ) : (
          <div className="flex items-center gap-5 rounded-xl border border-line bg-surface p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/images/hassan-avatar.webp")} alt={site.name} width={96} height={96} className="h-24 w-24 rounded-full border border-line object-cover" />
            <div>
              <p className="text-lg font-semibold text-ink">{site.name}</p>
              <p className="text-sm text-muted">{site.role}</p>
            </div>
          </div>
        )}
        </div>

          <dl className="grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6 lg:col-start-1 lg:row-start-2 lg:self-start">
            {trust.map((t) => (
              <div key={t.label}>
                <dt className="sr-only">{t.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-ink">{t.value}</dd>
                <p className="mt-0.5 text-xs leading-snug text-muted">{t.label}</p>
              </div>
            ))}
          </dl>
      </div>
    </div>
  );
}
