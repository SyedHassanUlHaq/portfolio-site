import { NEEDS, PROJECT_TYPES } from "../../content/taxonomy";
import { site } from "../../content/site";
import Hero from "@/components/Hero";
import { Arrow, NeedIcon } from "@/components/Icons";
import { TONE } from "@/lib/tones";
import ProjectCard from "@/components/ProjectCard";
import ProjectExplorer from "@/components/ProjectExplorer";
import { Section, SectionHead } from "@/components/Section";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { getFeatured, getListedProjects, toCard } from "@/lib/projects";
import { withBase } from "@/lib/url";

export default function Home() {
  const projects = getListedProjects();
  const cards = projects.map(toCard);
  const featured = getFeatured().map(toCard);

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

      {featured.length > 0 && (
        <Section id="featured">
          <SectionHead eyebrow="Selected work" title="A few things I've built" sub="Each one explains the problem, what I made, and exactly what I did." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} p={p} priority={i === 0} />
            ))}
          </div>
        </Section>
      )}

      <Section id="work" className="border-t border-line">
        <SectionHead
          eyebrow="Explore my work"
          title="Find work like yours"
          sub="Pick what you need, or search. Every filtered view has its own link you can share."
        />
        <ProjectExplorer projects={cards} />
      </Section>

      <Section id="capabilities" className="border-t border-line">
        <SectionHead eyebrow="What I can do" title="What could I take off your plate?" sub="Each one opens the projects where I've actually done it." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <a
              key={c.id}
              href={withBase(`/?needs=${c.id}#work`)}
              {...ev("capability-click", { need: c.id })}
              className={`group flex flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgb(60_40_20/0.25)] ${TONE[c.tone].bg}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-ink">
                <NeedIcon id={c.id} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink">{c.label}</h3>
              <p className="mt-2 text-[15px] text-ink/70">{c.blurb}</p>
              <p className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
                {c.count} {c.count === 1 ? "project" : "projects"} <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </p>
            </a>
          ))}
        </div>
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
