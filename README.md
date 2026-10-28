# Portfolio site

Static Next.js site (App Router, Tailwind 4, no runtime dependencies beyond React/Next). Every project is one JSON file; the UI, search, filters, project pages, sitemap and social cards are generated from it.

## Adding a project (≈5 minutes)

```bash
npm run new-project -- real-estate-voice-agent   # scaffolds content/projects/<slug>.json + public/projects/<slug>/
# 1. drop screenshots (png/jpg) into public/projects/<slug>/
npm run images                                    # → optimized .webp (1600px) + -sm.webp (640px), originals removed
# 2. fill in the JSON (editor autocompletes ids), remove "draft": true
npm run dev                                       # drafts are visible in dev, hidden in production
```

Only `slug, title, summary, types, industries, tech` are required — sections with no content simply don't render.
Order on the homepage: set `"featured": 1` (first), `2`, `3`. The page lives at `/projects/<slug>`.

Unknown ids fail the build with the file name and a fix. New technology/industry/category? Add one line in `content/taxonomy.ts`, then run `npm run schema`.

## Where things live

| Path | What |
|---|---|
| `content/site.ts` | All homepage copy, contact links, trust strip, **intro video URL**, Upwork/Calendly links |
| `content/taxonomy.ts` | Project types, industries, technologies, search aliases/synonyms |
| `content/projects/*.json` | One file per project |
| `public/projects/<slug>/` | That project's screenshots |
| `src/lib/search.ts` | Search + filter engine (tiny, no library) |
| `src/lib/projects.ts` | Loads, validates and redacts projects at build time |

## Confidentiality

`"confidentiality"` per project:
- `public` (default): everything shows.
- `anonymized`: client name and links are stripped from the build; use `clientAlias` ("US real-estate brokerage").
- `nda`: also strips screenshots and Loom. Text only.
- `"unlisted": true`: page works by URL only, is `noindex`, and is left out of lists and the sitemap. Use it for a private per-client link.
- Screenshot `"blur": true` is CSS-only and can be undone in dev tools. Blur the real file before saving it.

**Anything committed to a public GitHub repo is public**, even if the page hides it. For sensitive material, use a private repo (Cloudflare Pages deploys from private repos for free).

## Analytics (optional)

Set `NEXT_PUBLIC_UMAMI_ID` (GitHub: repo → Settings → Variables → `UMAMI_ID`) using a free Umami Cloud account. Events tracked: CTA clicks (with location), video plays, searches, filters, screenshot opens, link copies, outbound project links.
Use **Copy for Upwork** on a project page to get a `?ref=upwork` link; the source then shows up in Umami.

## Deploying

- **GitHub Pages (now):** push to `main`; the workflow builds with `NEXT_PUBLIC_BASE_PATH=/portfolio-site`.
- **Custom domain (later):** buy the domain, deploy on Cloudflare Pages (build `npm run build`, output `out`), and set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`. Do **not** set `NEXT_PUBLIC_BASE_PATH`.

Commands: `npm run dev` · `npm run build` (output in `out/`) · `npm run typecheck` · `npm run lint`.
