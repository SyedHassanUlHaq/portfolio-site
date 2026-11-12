import { NEEDS } from "../../content/taxonomy";
import { site } from "../../content/site";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { loomId } from "@/lib/loom";
import { youtubeId } from "@/lib/video";
import { withBase } from "@/lib/url";
import NeedPicker from "./NeedPicker";
import VideoFacade from "./VideoFacade";

export default function Hero({ availableNeeds }: { availableNeeds: string[] }) {
  const { hero, introVideo, trust, contact } = site;
  const id = loomId(introVideo.url);
  const yt = youtubeId(introVideo.url);
  const hasVideo = !!(introVideo.src || id || yt);
  const options = availableNeeds.filter((n) => n in NEEDS).map((n) => ({ id: n, phrase: NEEDS[n].phrase }));

  return (
    <div className="hero-wash border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden /> Available for new projects
          </p>
          <h1 className="mt-5 font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-[3.3rem] lg:text-[3.6rem]">{hero.headline}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{hero.sub}</p>

          <div className="mt-7 max-w-xl">
            <NeedPicker options={options} prefix={hero.pickerPrefix} placeholder={hero.pickerPlaceholder} button={hero.pickerButton} />
            <p className="mt-3 text-sm text-faint">
              Or{" "}
              <a
                href={contact.upwork || mailto("Project inquiry")}
                {...(contact.upwork ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...ev("cta-click", { where: "hero-contact" })}
                className="font-medium text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent"
              >
                {contact.upwork ? "view my Upwork profile" : "message me directly"}
              </a>
              .
            </p>
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
              <div key={t.label}>
                <dt className="sr-only">{t.label}</dt>
                <dd className="font-display text-2xl font-medium tracking-tight text-ink">{t.value}</dd>
                <p className="mt-0.5 text-xs leading-snug text-muted">{t.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
