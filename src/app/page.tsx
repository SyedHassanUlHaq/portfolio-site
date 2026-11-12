import { NEEDS, PROJECT_TYPES } from "../../content/taxonomy";
import { site } from "../../content/site";
import Hero from "@/components/Hero";
import ProjectExplorer from "@/components/ProjectExplorer";
import { Section, SectionHead } from "@/components/Section";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { getListedProjects, toCard } from "@/lib/projects";
import { withBase } from "@/lib/url";

export default function Home() {
  const projects = getListedProjects();
  const cards = projects.map(toCard);

  const capabilities = Object.entries(NEEDS)
    .map(([id, n]) => ({ id, ...n, count: projects.filter((p) => p.needs.includes(id)).length }))
    .filter((c) => c.count > 0);
  const availableNeeds = capabilities.map((c) => c.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: site.contact.email,
    sameAs: [site.contact.github, site.contact.linkedin, site.contact.upwork].filter(Boolean),
    knowsAbout: Object.values(PROJECT_TYPES).map((t) => t.label),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero availableNeeds={availableNeeds} />

      <Section id="work" className="border-t border-line">
        <SectionHead
          eyebrow="Explore my work"
          title="Find work like yours"
          sub="Pick what you need, or search. Every filtered view has its own link you can share."
        />
        <ProjectExplorer projects={cards} />
      </Section>

      <Section id="about" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/images/hassan-avatar.webp")} alt={site.name} width={160} height={160} loading="lazy" className="h-32 w-32 rounded-3xl border border-line object-cover shadow-sm sm:h-40 sm:w-40" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-accent">About</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.1]">{site.about.heading}</h2>
            <div className="mt-5 space-y-4 text-muted">
              {site.about.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
          <a
            href={withBase(site.about.credential.image)}
            target="_blank"
            rel="noopener noreferrer"
            className="group block self-start overflow-hidden rounded-xl border border-line bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase(site.about.credential.image)} alt={site.about.credential.imageAlt} width={1200} height={848} loading="lazy" decoding="async" className="w-full border-b border-line" />
            <div className="p-5">
              <h3 className="font-display text-lg font-medium text-ink">{site.about.credential.title}</h3>
              <p className="mt-1 text-sm text-muted">{site.about.credential.text}</p>
            </div>
          </a>
        </div>
      </Section>

      <Section id="contact" className="border-t border-line">
        <div className="rounded-3xl bg-tone-peach p-8 text-center sm:p-16">
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-5xl">{site.cta.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">{site.cta.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={mailto("Project inquiry")} {...ev("cta-click", { where: "footer" })} className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 font-medium text-bg hover:bg-accent">
              Email me
            </a>
            {site.contact.calendly && (
              <a href={site.contact.calendly} target="_blank" rel="noopener noreferrer" {...ev("cta-click", { where: "footer-calendly" })} className="inline-flex h-12 items-center justify-center rounded-full border-2 border-ink/15 bg-white/60 px-7 font-medium text-ink hover:border-ink">
                Book a call
              </a>
            )}
            {site.contact.upwork && (
              <a href={site.contact.upwork} target="_blank" rel="noopener noreferrer" {...ev("cta-click", { where: "footer-upwork" })} className="inline-flex h-12 items-center justify-center rounded-full border-2 border-ink/15 bg-white/60 px-7 font-medium text-ink hover:border-ink">
                Hire me on Upwork
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
