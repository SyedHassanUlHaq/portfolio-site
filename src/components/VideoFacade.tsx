"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { External, Play } from "./Icons";

type Props = {
  /** Pass one of: a Loom id, a YouTube id, or `src` for a self-hosted mp4 */
  loomId?: string;
  youtubeId?: string;
  src?: string;
  /** Share URL, for the "open in Loom/YouTube" fallback link */
  shareUrl?: string;
  title: string;
  duration?: string;
  posterSrc?: string;
  posterAlt?: string;
  /** The poster image already contains its own play button, so don't draw another */
  posterHasPlay?: boolean;
  /** analytics label, e.g. "intro" or a project slug */
  label: string;
  priority?: boolean;
};

/**
 * Click-to-load video (Loom embed or self-hosted mp4). Nothing heavy loads until someone presses play,
 * so the video never hurts page speed. Loom embeds fall back to a plain link if embedding is blocked.
 */
export default function VideoFacade({ loomId, youtubeId, src, shareUrl, title, duration, posterSrc, posterAlt = "", posterHasPlay, label }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-surface">
        {playing && src ? (
          <video className="absolute inset-0 h-full w-full bg-black" src={src} poster={posterSrc} controls autoPlay playsInline preload="auto" aria-label={title} />
        ) : playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={
              youtubeId
                ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
                : `https://www.loom.com/embed/${loomId}?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`
            }
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
              track("video-play", { video: label });
            }}
            className="group absolute inset-0 flex h-full w-full items-center justify-center"
            aria-label={`Play video: ${title}`}
          >
            {posterSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={posterSrc} alt={posterAlt} className={`absolute inset-0 h-full w-full object-cover object-top transition group-hover:brightness-110 ${posterHasPlay ? "" : "opacity-70 group-hover:opacity-90"}`} />
            ) : (
              <span className="bg-grid absolute inset-0" />
            )}
            {posterHasPlay ? (
              duration && <span className="absolute bottom-3 right-3 rounded bg-bg/80 px-2 py-1 font-mono text-xs text-muted">{duration}</span>
            ) : (
              <>
                <span className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg transition group-hover:scale-105 sm:h-20 sm:w-20">
                  <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8" />
                </span>
                <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-sm">
                  <span className="rounded bg-bg/80 px-2.5 py-1 font-medium text-ink">Watch {title}</span>
                  {duration && <span className="rounded bg-bg/80 px-2 py-1 font-mono text-xs text-muted">{duration}</span>}
                </span>
              </>
            )}
          </button>
        )}
      </div>
      {shareUrl && (
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("video-open-external", { video: label })}
        className="mt-2 inline-flex items-center gap-1 text-xs text-faint hover:text-ink"
      >
        Video not loading? Open it directly <External className="h-3 w-3" />
      </a>
      )}
    </div>
  );
}
