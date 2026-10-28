import { site } from "../../../../content/site";
import { ogCard, OG_SIZE } from "@/lib/og";
import { techLabel, typeLabel } from "@/lib/labels";
import { getAllProjects, getProject } from "@/lib/projects";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const generateStaticParams = () => getAllProjects().map((p) => ({ slug: p.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug)!;
  return ogCard({
    eyebrow: p.types.map(typeLabel).join(" · "),
    title: p.title,
    chips: p.tech.map(techLabel),
    footer: `${site.name} · ${site.role}`,
  });
}
