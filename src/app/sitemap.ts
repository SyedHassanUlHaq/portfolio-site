import type { MetadataRoute } from "next";
import { NEEDS } from "../../content/taxonomy";
import { lastUpdated } from "../../content/site";
import { getListedProjects } from "@/lib/projects";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getListedProjects();
  return [
    { url: abs("/"), lastModified: lastUpdated, changeFrequency: "monthly", priority: 1 },
    { url: abs("/projects"), lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    ...Object.keys(NEEDS)
      .filter((id) => projects.some((p) => p.needs.includes(id)))
      .map((id) => ({ url: abs(`/solutions/${id}`), lastModified: lastUpdated, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: abs(`/projects/${p.slug}`), lastModified: p.updated ?? lastUpdated, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
