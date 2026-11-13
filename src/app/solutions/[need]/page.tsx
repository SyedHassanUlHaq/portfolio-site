import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEEDS } from "../../../../content/taxonomy";
import { site } from "../../../../content/site";
import { Arrow } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { getListedProjects, toCard } from "@/lib/projects";
import { abs, crumbs, homeOgImageUrl, pageTitle } from "@/lib/seo";

type Params = { need: string };

const live = () => Object.keys(NEEDS).filter((id) => getListedProjects().some((p) => p.needs.includes(id)));

export const dynamicParams = false;
export const generateStaticParams = () => live().map((need) => ({ need }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const n = NEEDS[(await params).need];
  if (!n) return {};
  const id = (await params).need;
  const title = pageTitle(n.seoTitle);
  return {
    title: { absolute: title },
    description: n.seoDescription,
    alternates: { canonical: abs(`/solutions/${id}`) },
    openGraph: { type: "website", title, description: n.seoDescription, url: abs(`/solutions/${id}`), images: [{ url: homeOgImageUrl, width: 1200, height: 630, alt: n.seoTitle }] },
    twitter: { card: "summary_large_image", title, description: n.seoDescription, images: [homeOgImageUrl] },
  };
}

export default async function Solution({ params }: { params: Promise<Params> }) {
  const { need } = await params;
  const n = NEEDS[need];
  if (!n) notFound();
  const projects = getListedProjects().filter((p) => p.needs.includes(need));
  if (projects.length === 0) notFound();
  const others = live().filter((id) => id !== need);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: n.seoTitle,
        description: n.seoDescription,
        url: abs(`/solutions/${need}`),
        serviceType: n.label,
        areaServed: "Worldwide",
        provider: { "@type": "Person", "@id": abs("/#person"), name: site.name, url: abs("/") },
      },
      crumbs([{ name: "Home", path: "/" }, { name: n.label, path: `/solutions/${need}` }]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section>
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" prefetch={false} className="hover:text-ink">Home</Link> <span aria-hidden>/</span> <span className="text-ink">{n.label}</span>
        </nav>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">{n.h1}</h1>
        <p className="mt-6 max-w-2xl text-xl text-muted">{n.intro}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.contact.calendly || mailto(`Question about: ${n.label}`)}
            {...(site.contact.calendly ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            {...ev("cta-click", { where: "solution", need })}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-medium text-bg hover:bg-accent"
          >
            {site.contact.calendly ? "Book a quick call" : "Email me"} <Arrow className="h-4 w-4" />
          </a>
          {site.contact.upwork && (
            <a href={site.contact.upwork} target="_blank" rel="noopener noreferrer" {...ev("cta-click", { where: "solution-upwork", need })} className="inline-flex h-12 items-center justify-center rounded-full border-2 border-ink/15 bg-surface px-7 font-medium text-ink hover:border-ink">
              Hire me on Upwork
            </a>
          )}
        </div>
      </Section>

      <Section className="border-t border-line pt-12 sm:pt-16">
        <h2 className="font-display text-3xl font-medium tracking-tight text-ink">
          {projects.length} {projects.length === 1 ? "project" : "projects"} like this
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={toCard(p)} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-line pt-12 sm:pt-16">
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Other things I can build</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {others.map((id) => (
            <Link key={id} href={`/solutions/${id}`} className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition hover:border-ink/40 hover:text-ink">
              {NEEDS[id].label}
            </Link>
          ))}
          <Link href="/projects" className="rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:border-ink">All projects</Link>
        </div>
      </Section>
    </>
  );
}
