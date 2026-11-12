import { NEEDS } from "../../content/taxonomy";
import { TONE } from "@/lib/tones";
import { NeedIcon } from "./Icons";

// four decorative arrangements, picked per project so the grid doesn't look stamped out
const DECOR = [
  ["-right-8 -top-10 h-44 w-44", "left-8 -bottom-12 h-28 w-28"],
  ["-left-10 -top-12 h-40 w-40", "right-10 -bottom-10 h-32 w-32"],
  ["right-12 -top-14 h-36 w-36", "-left-8 bottom-2 h-24 w-24"],
  ["-right-8 bottom-[-2rem] h-48 w-48", "left-12 -top-10 h-24 w-24"],
];

/** Designed cover used on cards and as the project-page header when there's no video. */
export default function Cover({ needs, slug, size = "card" }: { needs: string[]; slug: string; size?: "card" | "hero" }) {
  const need = NEEDS[needs[0]] ?? NEEDS.app;
  const tone = TONE[need.tone];
  const hash = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const [a, b] = DECOR[hash % DECOR.length];
  const hero = size === "hero";

  return (
    <div className={`relative overflow-hidden ${tone.bg} ${hero ? "aspect-[16/8] rounded-2xl" : "aspect-[16/9]"}`}>
      <span className={`absolute rounded-full ${tone.deep} opacity-70 ${a}`} aria-hidden />
      <span className={`absolute rounded-full ${tone.deep} opacity-40 ${b}`} aria-hidden />
      <div className={`absolute inset-0 flex flex-col justify-between ${hero ? "p-8" : "p-5"}`}>
        <span className={`flex items-center justify-center rounded-2xl bg-white/80 text-ink shadow-sm ${hero ? "h-20 w-20" : "h-12 w-12"}`}>
          <NeedIcon id={needs[0] in NEEDS ? needs[0] : "app"} className={hero ? "h-10 w-10" : "h-6 w-6"} />
        </span>
        <span className={`font-display font-medium text-ink/75 ${hero ? "text-2xl" : "text-lg"}`}>{need.label}</span>
      </div>
    </div>
  );
}
