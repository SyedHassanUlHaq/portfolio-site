import { NEEDS } from "../../../content/taxonomy";
import { seo, site } from "../../../content/site";
import { getListedProjects } from "@/lib/projects";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/** Plain-text site summary for AI assistants and search crawlers (https://llmstxt.org). */
export function GET() {
  const projects = getListedProjects();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${seo.homeDescription}`,
    "",
    `${site.name} is a freelance ${site.role.toLowerCase()}. Contact: ${site.contact.email}${site.contact.upwork ? ` · Upwork: ${site.contact.upwork}` : ""}`,
    "",
    "## Services",
    ...Object.entries(NEEDS)
      .filter(([id]) => projects.some((p) => p.needs.includes(id)))
      .map(([id, n]) => `- [${n.seoTitle}](${abs(`/solutions/${id}`)}): ${n.seoDescription}`),
    "",
    "## Projects",
    ...projects.map((p) => `- [${p.seoTitle ?? p.title}](${abs(`/projects/${p.slug}`)}): ${p.summary}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
