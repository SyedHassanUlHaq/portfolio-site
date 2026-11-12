import type { Tone } from "../../content/taxonomy";

/** Full class names so Tailwind can see them. */
export const TONE: Record<Tone, { bg: string; deep: string }> = {
  peach: { bg: "bg-tone-peach", deep: "bg-tone-peach-deep" },
  butter: { bg: "bg-tone-butter", deep: "bg-tone-butter-deep" },
  sky: { bg: "bg-tone-sky", deep: "bg-tone-sky-deep" },
  sage: { bg: "bg-tone-sage", deep: "bg-tone-sage-deep" },
  lilac: { bg: "bg-tone-lilac", deep: "bg-tone-lilac-deep" },
  rose: { bg: "bg-tone-rose", deep: "bg-tone-rose-deep" },
  mint: { bg: "bg-tone-mint", deep: "bg-tone-mint-deep" },
  sand: { bg: "bg-tone-sand", deep: "bg-tone-sand-deep" },
  periwinkle: { bg: "bg-tone-periwinkle", deep: "bg-tone-periwinkle-deep" },
  clay: { bg: "bg-tone-clay", deep: "bg-tone-clay-deep" },
};
