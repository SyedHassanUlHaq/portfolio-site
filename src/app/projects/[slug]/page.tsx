import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "../../../../content/site";
import { Chip } from "@/components/Chip";
import Cover from "@/components/Cover";
import Gallery from "@/components/Gallery";
import { Back, Chevron, External, Lock } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import ShareButtons from "@/components/ShareButtons";
import VideoFacade from "@/components/VideoFacade";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { industryLabel, needLabel, techLabel, typeLabel } from "@/lib/labels";
import { getAllProjects, getProject, getRelated, toCard } from "@/lib/projects";
import { abs, crumbs, metaDescription, ogImageUrl, pageTitle, homeOgImageUrl } from "@/lib/seo";
import { projectImg } from "@/lib/url";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => getAllProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const url = abs(`/projects/${p.slug}`);
  const title = pageTitle(p.seoTitle ?? p.title);
  const description = metaDescription(p.summary);
  const image = p.thumbnail ? ogImageUrl(p.slug) : homeOgImageUrl;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: p.unlisted ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", title, description, url, images: [{ url: image, width: 1200, height: 630, alt: p.title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="mb-3 font-display text-2xl font-medium tracking-tight text-ink">{children}</h2>;
const BEHIND = new Set(["workflow", "architecture"]);

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const related = getRelated(p).map(toCard);
  // Product screenshots tell the story; workflow diagrams are for people who want the detail.
  const visual = p.screenshots.filter((s) => !BEHIND.has(s.kind ?? ""));
  const behind = p.screenshots.filter((s) => BEHIND.has(s.kind ?? ""));
  // only a landscape screenshot works as a full-width header; phone screenshots go in the gallery instead
  const hero = !p.loomId ? visual.find((s) => s.width >= s.height) : undefined;
  const gallery = visual.filter((s) => s !== hero);
  const client = p.confidentiality === "public" ? p.clientName : p.clientAlias;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: p.title,
        description: p.summary,
        url: abs(`/projects/${p.slug}`),
        author: { "@id": abs("/#person"), "@type": "Person", name: site.name },
        keywords: [...p.needs.map(needLabel), ...p.types.map(typeLabel), ...p.industries.map(industryLabel), ...p.tech.map(techLabel)].join(", "),
        image: p.thumbnail ? ogImageUrl(p.slug) : homeOgImageUrl,
      },
      crumbs([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: p.title, path: `/projects/${p.slug}` }]),
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <Back className="h-4 w-4" /> All projects
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">{p.needs.map(needLabel).join(" · ")}</p>
          <h1 className="mt-3 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">{p.title}</h1>
          <p className="mt-5 text-xl text-muted">{p.summary}</p>
          {p.confidentiality !== "public" && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted">
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
        <div className="min-w-0 space-y-12">
          {p.loomId && p.loom ? (
            <VideoFacade
              loomId={p.loomId}
              shareUrl={p.loom.url}
              title={p.loom.title ?? "project walkthrough"}
              duration={p.loom.duration}
              posterSrc={p.posterSrc ? projectImg(p.slug, p.posterSrc) : undefined}
              label={p.slug}
            />
          ) : hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={projectImg(p.slug, hero.src)} alt={hero.alt} width={hero.width} height={hero.height} className={`w-full rounded-2xl border border-line ${hero.blur ? "blur-md" : ""}`} />
          ) : p.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={projectImg(p.slug, "thumbnail.webp")} alt={p.headline ?? p.title} width={1280} height={720} className="w-full rounded-2xl border border-line" />
          ) : (
            <Cover needs={p.needs} slug={p.slug} size="hero" />
          )}

          {p.problem && (
            <section>
              <H2>The problem</H2>
              <p className="text-lg text-muted">{p.problem}</p>
            </section>
          )}
          {p.solution && (
            <section>
              <H2>What I built</H2>
              <p className="text-lg text-muted">{p.solution}</p>
              {p.highlights && p.highlights.length > 0 && (
                <ul className="mt-5 space-y-2.5 text-muted">
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
              <p className="text-lg text-muted">{p.role}</p>
            </section>
          )}
          {p.results && p.results.length > 0 && (
            <section>
              <H2>What it achieves</H2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.results.map((r) => (
                  <li key={r.label} className="rounded-2xl bg-tone-sage p-5">
                    {r.value && <p className="font-display text-3xl font-medium tracking-tight text-ink">{r.value}</p>}
                    <p className="text-[15px] text-ink/80">{r.label}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {p.testimonial && (
            <blockquote className="rounded-2xl bg-tone-butter p-7">
              <p className="font-display text-2xl leading-snug text-ink">“{p.testimonial.quote}”</p>
              {(p.testimonial.author || p.testimonial.source) && (
                <footer className="mt-3 text-sm text-ink/70">{[p.testimonial.author, p.testimonial.source].filter(Boolean).join(" · ")}</footer>
              )}
            </blockquote>
          )}
          {gallery.length > 0 && (
            <section>
              <H2>See it in action</H2>
              <Gallery slug={p.slug} shots={gallery} />
            </section>
          )}

          <details className="group rounded-2xl border border-line bg-surface">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:hidden [&::-webkit-details-marker]:hidden">
              <span>
                <span className="font-display text-xl font-medium text-ink">Under the hood</span>
                <span className="mt-0.5 block text-sm text-muted">The tools I used{behind.length > 0 ? " and the workflow diagrams" : ""}, for the technically curious.</span>
              </span>
              <Chevron className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180" />
            </summary>
            <div className="space-y-6 border-t border-line p-5">
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Chip key={t}>{techLabel(t)}</Chip>
                ))}
              </div>
              {behind.length > 0 && <Gallery slug={p.slug} shots={behind} />}
            </div>
          </details>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <dl className="space-y-4 rounded-2xl border border-line bg-surface p-5 text-sm">
            <Row k="Industry">{p.industries.map(industryLabel).join(", ")}</Row>
            <Row k="Solves">{p.needs.map(needLabel).join(", ")}</Row>
            {client && <Row k="Client">{client}</Row>}
            {p.year && <Row k="Year">{p.year}</Row>}
            {p.duration && <Row k="Duration">{p.duration}</Row>}
            <Row k="Built with">{p.tech.slice(0, 5).map(techLabel).join(", ")}{p.tech.length > 5 ? ` +${p.tech.length - 5} more` : ""}</Row>
            {p.links && p.links.length > 0 && (
              <div>
                <dt className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint">Links</dt>
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

          <div className="rounded-2xl bg-tone-peach p-6">
            <p className="font-display text-xl font-medium text-ink">Need something like this?</p>
            <p className="mt-1.5 text-[15px] text-ink/70">Tell me what you&apos;re trying to automate and I&apos;ll tell you how I&apos;d approach it.</p>
            <a
              href={site.contact.upwork || mailto(`Re: ${p.title}`)}
              {...(site.contact.upwork ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...ev("cta-click", { where: "project", project: p.slug })}
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink font-medium text-bg hover:bg-accent"
            >
              {site.contact.upwork ? "Message me on Upwork" : "Email me about this"}
            </a>
            {site.contact.calendly && (
              <a href={site.contact.calendly} target="_blank" rel="noopener noreferrer" {...ev("cta-click", { where: "project-calendly", project: p.slug })} className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-ink/15 bg-white/60 font-medium text-ink hover:border-ink">
                Book a quick call
              </a>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <Section className="border-t border-line">
          <h2 className="mb-6 font-display text-3xl font-medium tracking-tight text-ink">Similar projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <dt className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-faint">{k}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
