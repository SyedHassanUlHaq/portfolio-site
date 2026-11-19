import type { Metadata } from "next";
import Link from "next/link";
import { NEEDS, PROJECT_TYPES } from "../../content/taxonomy";
import { faq, lastUpdated, seo, site } from "../../content/site";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";
import ProjectExplorer from "@/components/ProjectExplorer";
import Chapter, { ChapterTitle } from "@/components/Chapter";
import { Arrow } from "@/components/Icons";
import { ev } from "@/lib/analytics";
import { getListedProjects, toCard } from "@/lib/projects";
import { abs, baseUrl, faqSchema, homeOgImageUrl } from "@/lib/seo";
import { youtubeId } from "@/lib/video";
import { withBase } from "@/lib/url";

export const metadata: Metadata = {
  title: { absolute: seo.homeTitle },
  description: seo.homeDescription,
  alternates: { canonical: `${baseUrl}/` },
  openGraph: { type: "website", title: seo.homeTitle, description: seo.homeDescription, url: `${baseUrl}/`, images: [{ url: homeOgImageUrl, width: 1200, height: 630, alt: `${site.name}: ${site.role}` }] },
  twitter: { card: "summary_large_image", title: seo.homeTitle, description: seo.homeDescription, images: [homeOgImageUrl] },
};

export default function Home() {
  const projects = getListedProjects();
  const cards = projects.map(toCard);

  const capabilities = Object.entries(NEEDS)
    .map(([id, n]) => ({ id, ...n, count: projects.filter((p) => p.needs.includes(id)).length }))
    .filter((c) => c.count > 0);
  const availableNeeds = capabilities.map((c) => c.id);

  const v = site.introVideo;
  const yt = youtubeId(v.url);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": abs("/#website"), url: `${baseUrl}/`, name: site.name, description: seo.homeDescription, inLanguage: "en" },
      {
        "@type": "Person",
        "@id": abs("/#person"),
        name: site.name,
        alternateName: "Hassan Ul Haq",
        jobTitle: site.role,
        description: seo.homeDescription,
        url: `${baseUrl}/`,
        image: abs("/images/hassan-avatar.webp"),
        email: site.contact.email,
        sameAs: [site.contact.github, site.contact.linkedin, site.contact.upwork].filter(Boolean),
        knowsAbout: [...Object.values(NEEDS).map((n) => n.label), ...Object.values(PROJECT_TYPES).map((t) => t.label), "n8n", "ElevenLabs", "OpenAI"],
        award: "Google Summer of Code 2024 mentee, Chips Alliance (Zvk support in T1, a RISC-V vector coprocessor)",
        makesOffer: capabilities.map((c) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: c.seoTitle, url: abs(`/solutions/${c.id}`) },
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/`,
        url: `${baseUrl}/`,
        name: seo.homeTitle,
        description: seo.homeDescription,
        dateModified: lastUpdated,
        inLanguage: "en",
        isPartOf: { "@id": abs("/#website") },
        about: { "@id": abs("/#person") },
      },
      faqSchema(faq),
      ...(yt
        ? [{
            "@type": "VideoObject",
            name: v.seoName,
            description: v.seoDescription,
            thumbnailUrl: [`https://i.ytimg.com/vi/${yt}/hqdefault.jpg`, abs(v.poster)],
            uploadDate: v.uploadDate,
            duration: v.durationIso,
            embedUrl: `https://www.youtube-nocookie.com/embed/${yt}`,
            contentUrl: `https://www.youtube.com/watch?v=${yt}`,
          }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero availableNeeds={availableNeeds} />

      <Chapter id="solve" n="01" label="What I solve" note="Ten kinds of problem, each with its own page.">
        <ChapterTitle>What could I take off your plate?</ChapterTitle>
        <ol className="grid border-t border-ink/20 md:grid-cols-2 md:gap-x-12">
          {capabilities.map((c, i) => (
            <li key={c.id} className="border-b border-ink/15">
              <Link href={`/solutions/${c.id}`} {...ev("capability-click", { need: c.id })} className="group flex items-baseline gap-4 py-4 transition-colors hover:bg-white/50">
                <span aria-hidden className="w-7 shrink-0 text-sm tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-xl font-medium text-ink">{c.label}</span>
                <span className="text-sm text-faint">{c.count}</span>
                <Arrow className="h-4 w-4 self-center text-faint transition group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter id="work" n="02" label="Work" note={`${projects.length} projects, indexed by need, industry and tool. Search anything.`}>
        <ChapterTitle sub="Pick what you need, or search. Every filtered view has its own link you can share.">Find work like yours</ChapterTitle>
        <ProjectExplorer projects={cards} />
        <p className="mt-6 text-sm text-muted">
          Prefer one long list?{" "}
          <Link href="/projects" className="font-medium text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent">
            Open the full index
          </Link>
          .
        </p>
      </Chapter>

      <Chapter id="reviews" n="03" label="Reviews" note="Real words from real clients, via Upwork.">
        <ChapterTitle>Five stars, in their words</ChapterTitle>
        <Testimonials />
      </Chapter>

      <Chapter id="about" n="04" label="About" note="Who is behind the work.">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <ChapterTitle>{site.about.heading}</ChapterTitle>
            <div className="space-y-4 text-lg text-muted">
              {site.about.paragraphs.map((t, i) => (
                <p key={t} className={i === 0 ? "font-display text-2xl leading-snug text-ink sm:text-[1.7rem]" : ""}>
                  {t}
                </p>
              ))}
            </div>
          </div>
          <figure className="self-start">
            <a href={withBase(site.about.credential.image)} target="_blank" rel="noopener noreferrer" className="block border border-ink/20 bg-surface p-2 shadow-[0_18px_36px_-22px_rgb(60_40_20/0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(site.about.credential.image)} alt={site.about.credential.imageAlt} width={1200} height={848} loading="lazy" decoding="async" className="w-full" />
            </a>
            <figcaption className="mt-3 text-sm text-muted">
              <span className="font-semibold text-ink">Fig. 1</span> · {site.about.credential.title}. {site.about.credential.text}
            </figcaption>
          </figure>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/images/hassan-avatar.webp")} alt={site.name} width={96} height={96} loading="lazy" className="mt-10 h-20 w-20 rounded-full border border-ink/15 object-cover" />
      </Chapter>

      <Chapter id="faq" n="05" label="Q&A" note="Short answers to what people ask first.">
        <ChapterTitle>Before you get in touch</ChapterTitle>
        <Faq items={faq} />
      </Chapter>

      <CtaBand id="contact" eyebrow="06 · The last page" heading={site.cta.heading} text={site.cta.text} where="footer" />
    </>
  );
}
