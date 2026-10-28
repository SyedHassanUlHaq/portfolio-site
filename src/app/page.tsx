import { PROJECT_TYPES, TECH } from "../../content/taxonomy";
import { site } from "../../content/site";
import Hero from "@/components/Hero";
import { Arrow } from "@/components/Icons";
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

  const capabilities = Object.entries(PROJECT_TYPES)
    .map(([id, t]) => {
      const mine = projects.filter((p) => p.types.includes(id));
      const tech = [...new Set(mine.flatMap((p) => p.tech))].slice(0, 4).map((x) => TECH[x].label);
      return { id, ...t, count: mine.length, tech };
    })
    .filter((c) => c.count > 0);

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
      <Hero />

      {featured.length > 0 && (
        <Section id="featured">
          <SectionHead eyebrow="Selected work" title="Recent projects, in detail" sub="Each one has the problem, what I built, my exact role and the stack behind it." />
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
          sub="Search by industry, use case or technology. Any filtered view has its own link you can share."
        />
        <ProjectExplorer projects={cards} />
      </Section>

      <Section id="capabilities" className="border-t border-line">
        <SectionHead eyebrow="What I build" title="One engineer, the whole system" sub="Each capability links to the projects where I've actually delivered it." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <a
              key={c.id}
              href={withBase(`/?types=${c.id}#work`)}
              {...ev("capability-click", { type: c.id })}
              className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-accent/50"
            >
              <h3 className="font-semibold text-ink">{c.label}</h3>
              <p className="mt-2 text-sm text-muted">{c.blurb}</p>
              <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm text-accent">
                {c.count} {c.count === 1 ? "project" : "projects"} <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </p>
              {c.tech.length > 0 && <p className="mt-1 font-mono text-xs text-faint">{c.tech.join(" · ")}</p>}
            </a>
          ))}
        </div>
      </Section>

      <Section id="about" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">About</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{site.about.heading}</h2>
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
              <h3 className="font-semibold text-ink">{site.about.credential.title}</h3>
              <p className="mt-1 text-sm text-muted">{site.about.credential.text}</p>
            </div>
          </a>
        </div>
      </Section>

      <Section id="contact" className="border-t border-line">
        <div className="rounded-2xl border border-line bg-surface p-8 text-center sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{site.cta.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{site.cta.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={mailto("Project inquiry")} {...ev("cta-click", { where: "footer" })} className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 font-medium text-accent-ink hover:brightness-110">
              Email me
            </a>
            {site.contact.calendly && (
              <a href={site.contact.calendly} target="_blank" rel="noopener noreferrer" {...ev("cta-click", { where: "footer-calendly" })} className="inline-flex h-12 items-center justify-center rounded-md border border-line px-6 font-medium text-ink hover:border-accent/60">
                Book a call
              </a>
            )}
            {site.contact.upwork && (
              <a href={site.contact.upwork} target="_blank" rel="noopener noreferrer" {...ev("cta-click", { where: "footer-upwork" })} className="inline-flex h-12 items-center justify-center rounded-md border border-line px-6 font-medium text-ink hover:border-accent/60">
                Hire me on Upwork
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
