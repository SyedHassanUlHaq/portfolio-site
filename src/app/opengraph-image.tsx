import { site } from "../../content/site";
import { ogCard, OG_SIZE } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

export default function Image() {
  return ogCard({ eyebrow: site.role, title: site.hero.headline, footer: site.name });
}
