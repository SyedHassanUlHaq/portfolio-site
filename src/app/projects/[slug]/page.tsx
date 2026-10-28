import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "../../../../content/site";
import Gallery from "@/components/Gallery";
import { Back, External, Lock } from "@/components/Icons";
import { Chip } from "@/components/Chip";
import ProjectCard from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import ShareButtons from "@/components/ShareButtons";
import VideoFacade from "@/components/VideoFacade";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { industryLabel, techLabel, typeLabel } from "@/lib/labels";
import { getAllProjects, getProject, getRelated, toCard } from "@/lib/projects";
import { projectImg } from "@/lib/url";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => getAllProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const url = `${site.url.replace(/\/$/, "")}/projects/${p.slug}`;
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: url },
    robots: p.unlisted ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", title: p.title, description: p.summary, url },
    twitter: { title: p.title, description: p.summary },
  };
}

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="mb-3 text-xl font-semibold tracking-tight text-ink">{children}</h2>;

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const related = getRelated(p).map(toCard);
  const hero = p.screenshots[0];
  const client = p.confidentiality === "public" ? p.clientName : p.clientAlias;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    url: `${site.url}/projects/${p.slug}`,
    author: { "@type": "Person", name: site.name },
    keywords: [...p.types.map(typeLabel), ...p.industries.map(industryLabel), ...p.tech.map(techLabel)].join(", "),
    ...(hero && { image: `${site.url}/projects/${p.slug}/${hero.src}` }),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <Back className="h-4 w-4" /> All projects
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{p.types.map(typeLabel).join(" · ")}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">{p.title}</h1>
          <p className="mt-4 text-lg text-muted">{p.summary}</p>
          {p.confidentiality !== "public" && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-muted">
              <Lock className="h-4 w-4" />
              {p.confidentiality === "nda" ? "Delivered under NDA. Details are limited; ask me for what I can share." : "Client details anonymized at their request."}
            </p>
          )}
          <div className="mt-5">
            <ShareButtons slug={p.slug} />
          </div>
        </header>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_20rem] lg:gap-14">
        <div className="min-w-0 space-y-10">
          {p.loomId && p.loom ? (
            <VideoFacade
              loomId={p.loomId}
              shareUrl={p.loom.url}
              title={p.loom.title ?? "project walkthrough"}
              duration={p.loom.duration}
              posterSrc={p.posterSrc ? projectImg(p.slug, p.posterSrc) : undefined}
              label={p.slug}
            />
          ) : (
            hero && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={projectImg(p.slug, hero.src)}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                className={`w-full rounded-xl border border-line ${hero.blur ? "blur-md" : ""}`}
              />
            )
          )}

          {p.problem && (
            <section>
              <H2>The problem</H2>
              <p className="text-muted">{p.problem}</p>
            </section>
          )}
          {p.solution && (
            <section>
              <H2>What I built</H2>
              <p className="text-muted">{p.solution}</p>
              {p.highlights && p.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 text-muted">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
          {p.role && (
            <section>
              <H2>My role</H2>
              <p className="text-muted">{p.role}</p>
            </section>
          )}
          {p.results && p.results.length > 0 && (
            <section>
              <H2>Results</H2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.results.map((r) => (
                  <li key={r.label} className="rounded-lg border border-line bg-surface p-4">
                    {r.value && <p className="text-2xl font-semibold tracking-tight text-accent">{r.value}</p>}
                    <p className="text-sm text-muted">{r.label}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {p.testimonial && (
            <blockquote className="rounded-xl border border-line bg-surface p-6">
              <p className="text-lg text-ink">“{p.testimonial.quote}”</p>
              {(p.testimonial.author || p.testimonial.source) && (
                <footer className="mt-3 text-sm text-muted">{[p.testimonial.author, p.testimonial.source].filter(Boolean).join(" · ")}</footer>
              )}
            </blockquote>
          )}
          {p.screenshots.length > 0 && (
            <section>
              <H2>Screenshots</H2>
              <Gallery slug={p.slug} shots={p.screenshots} />
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <dl className="space-y-4 rounded-xl border border-line bg-surface p-5 text-sm">
            <Row k="Industry">{p.industries.map(industryLabel).join(", ")}</Row>
            <Row k="Type">{p.types.map(typeLabel).join(", ")}</Row>
            {client && <Row k="Client">{client}</Row>}
            {p.year && <Row k="Year">{p.year}</Row>}
            {p.duration && <Row k="Duration">{p.duration}</Row>}
            <div>
              <dt className="mb-2 font-mono text-[11px] uppercase tracking-wider text-faint">Tech stack</dt>
              <dd className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <Chip key={t}>{techLabel(t)}</Chip>
                ))}
              </dd>
            </div>
            {p.links && p.links.length > 0 && (
              <div>
                <dt className="mb-2 font-mono text-[11px] uppercase tracking-wider text-faint">Links</dt>
                <dd className="space-y-1.5">
                  {p.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" {...ev("project-link", { project: p.slug, label: l.label })} className="flex items-center gap-1.5 text-accent hover:underline">
                      {l.label} <External className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>

          <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
            <p className="font-semibold text-ink">Need something like this?</p>
            <p className="mt-1 text-sm text-muted">Tell me what you&apos;re trying to automate and I&apos;ll tell you how I&apos;d approach it.</p>
            <a
              href={site.contact.upwork || mailto(`Re: ${p.title}`)}
              {...(site.contact.upwork ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...ev("cta-click", { where: "project", project: p.slug })}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-accent font-medium text-accent-ink hover:brightness-110"
            >
              {site.contact.upwork ? "Message me on Upwork" : "Email me about this"}
            </a>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <Section className="border-t border-line">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-ink">Similar projects</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProjectCard key={r.slug} p={r} />
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-1 font-mono text-[11px] uppercase tracking-wider text-faint">{k}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
