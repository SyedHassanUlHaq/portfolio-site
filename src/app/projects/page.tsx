import type { Metadata } from "next";
import Link from "next/link";
import { NEEDS } from "../../../content/taxonomy";
import { site } from "../../../content/site";
import ProjectCard from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { getListedProjects, toCard } from "@/lib/projects";
import { abs, crumbs, homeOgImageUrl } from "@/lib/seo";

const title = "AI Automation & AI Agent Projects";
const description = "Every AI automation, AI voice agent, chatbot, CRM and integration project I've built, with what each one does, the tools used and my role.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: abs("/projects") },
  openGraph: { type: "website", title, description, url: abs("/projects"), images: [{ url: homeOgImageUrl, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [homeOgImageUrl] },
};

export default function AllProjects() {
  const projects = getListedProjects();
  const cards = projects.map(toCard);
  const needs = Object.entries(NEEDS).filter(([id]) => projects.some((p) => p.needs.includes(id)));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: title, description, url: abs("/projects"), isPartOf: { "@id": abs("/#website") } },
      { "@type": "ItemList", itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/projects/${p.slug}`), name: p.title })) },
      crumbs([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]),
    ],
  };

  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">All projects</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-xl text-muted">
        {projects.length} projects across voice agents, chatbots, lead generation, CRM automation and custom apps. Looking for something specific? Use the{" "}
        <Link href="/#work" prefetch={false} className="font-medium text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent">search and filters</Link>.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {needs.map(([id, n]) => (
          <Link key={id} href={`/solutions/${id}`} className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition hover:border-ink/40 hover:text-ink">
            {n.label}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </Section>
  );
}
