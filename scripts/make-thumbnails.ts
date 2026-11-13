/**
 * Generates a 1280x720 thumbnail for every project: public/projects/<slug>/thumbnail.webp (+ thumbnail-sm.webp).
 * Used on project cards, as the video poster, and at the top of project pages.
 *
 *   npm run thumbnails              all projects
 *   npm run thumbnails -- my-slug   just one
 *
 * Needs Chrome/Chromium (set CHROME_PATH if it isn't at /usr/bin/google-chrome) and internet (Google Fonts).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { NEEDS } from "../content/taxonomy";
import { site } from "../content/site";

const TONES: Record<string, [string, string]> = {
  peach: ["#fde3d3", "#f9c8ad"], butter: ["#fbefc4", "#f5dc8c"], sky: ["#d9e8f5", "#b4d3ec"], sage: ["#dcebd9", "#bcd9b6"],
  lilac: ["#e7e0f5", "#cfc2ec"], rose: ["#f8dce2", "#f0b8c4"], mint: ["#d5efe6", "#a8dcc9"], sand: ["#efe6d4", "#e0cfae"],
  periwinkle: ["#dde3f7", "#bcc7ee"], clay: ["#efdacf", "#dfb9a5"],
};
const ICON: Record<string, string> = {
  calls: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  leads: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  crm: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 20a6.5 6.5 0 0 0-3-5.5"/>',
  reports: '<path d="M5 20V11M11 20V4M17 20v-7M3 20h18"/>',
  knowledge: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z"/><path d="M8 7h6M8 11h6"/>',
  social: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/>',
  connect: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4"/>',
  data: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  app: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/>',
  models: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>',
};

type P = { slug: string; title: string; headline?: string; needs: string[]; draft?: boolean; screenshots?: { src: string; kind?: string }[] };
const root = process.cwd();
const only = process.argv[2];
const projects: P[] = fs
  .readdirSync("content/projects")
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(`content/projects/${f}`, "utf8")))
  .filter((p: P) => !p.slug.startsWith("sample-") && (!only || p.slug === only));

const avatar = `file://${root}/public/images/hassan-avatar.webp`;

type Dim = { w: number; h: number };
async function dims(slug: string, src: string): Promise<Dim> {
  const m = await sharp(`public/projects/${slug}/${src}`).metadata();
  return { w: m.width ?? 1, h: m.height ?? 1 };
}

function html(p: P, d: Dim[]) {
  const need = NEEDS[p.needs[0]] ?? NEEDS.app;
  const [bg, deep] = TONES[need.tone];
  const text = p.headline ?? p.title;
  // product screenshots make the best thumbnails; workflow diagrams look too technical, so those get a big icon instead
  const shots = (p.screenshots ?? []).filter((s) => s.kind !== "workflow" && s.kind !== "architecture");
  const shot = shots[0];
  const portrait = !!shot && d[0].h / d[0].w > 1.3;
  const fs_ = shot ? (text.length > 40 ? 56 : 64) : text.length > 40 ? 76 : 88;
  const width = shot && !portrait ? 520 : shot ? 560 : 700;
  const url = (s: { src: string }) => `file://${root}/public/projects/${p.slug}/${s.src}`;
  const visual = portrait
    ? `<div class="phone p1"><img src="${url(shots[1] ?? shot)}"></div><div class="phone p2"><img src="${url(shot)}"></div>`
    : shot
    ? `<div class="frame"><div class="bar"><i></i><i></i><i></i></div><img src="file://${root}/public/projects/${p.slug}/${shot.src}"></div>`
    : `<div class="icon"><svg viewBox="0 0 24 24" width="220" height="220" fill="none" stroke="#1f1a17" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${ICON[p.needs[0]] ?? ICON.app}</svg></div>`;
  return `<!doctype html><meta charset="utf-8"><link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1280px;height:720px;background:${bg};position:relative;overflow:hidden;font-family:Inter,sans-serif;color:#1f1a17}
.c1,.c2{position:absolute;border-radius:50%;background:${deep}}
.c1{width:560px;height:560px;right:-140px;top:-190px;opacity:.7}
.c2{width:340px;height:340px;left:-110px;bottom:-150px;opacity:.45}
.pill{position:absolute;left:72px;top:64px;background:rgba(255,255,255,.78);padding:10px 22px;border-radius:999px;font-size:22px;font-weight:600;letter-spacing:.09em;text-transform:uppercase}
h1{position:absolute;left:72px;top:148px;width:${width}px;font-family:Fraunces,serif;font-weight:500;font-size:${fs_}px;line-height:1.07;letter-spacing:-.02em}
.by{position:absolute;left:72px;bottom:54px;display:flex;align-items:center;gap:16px;font-size:24px;font-weight:600}
.by img{width:58px;height:58px;border-radius:50%;object-fit:cover;border:3px solid #fff}
.frame{position:absolute;right:-70px;top:120px;width:660px;height:480px;border-radius:22px;background:#fff;box-shadow:0 36px 70px -24px rgba(60,40,20,.5);transform:rotate(3deg);overflow:hidden;border:1px solid rgba(0,0,0,.08)}
.bar{height:38px;background:#f3eee6;display:flex;gap:8px;align-items:center;padding-left:18px}
.bar i{width:12px;height:12px;border-radius:50%;background:#d6ccbc}
.frame img{display:block;width:100%;height:calc(100% - 38px);object-fit:cover;object-position:top left}
.phone{position:absolute;width:290px;height:590px;border-radius:44px;border:9px solid #1f1a17;background:#fff;overflow:hidden;box-shadow:0 36px 70px -24px rgba(60,40,20,.55)}
.phone img{display:block;width:100%;height:100%;object-fit:cover;object-position:top}
.p1{right:80px;top:84px;transform:rotate(5deg)}
.p2{right:340px;top:130px;transform:rotate(-4deg)}
.icon{position:absolute;right:96px;top:150px;width:420px;height:420px;border-radius:110px;background:rgba(255,255,255,.82);display:flex;align-items:center;justify-content:center;box-shadow:0 36px 70px -30px rgba(60,40,20,.45);transform:rotate(-3deg)}
</style>
<div class="c1"></div><div class="c2"></div>
<div class="pill">${need.label}</div>
<h1>${text.replace(/&/g, "&amp;")}</h1>
${visual}
<div class="by"><img src="${avatar}"><span>${site.name}</span></div>`;
}

/** Social preview for the homepage itself (shown when the site link is shared on LinkedIn, Upwork, Slack…). */
function homeHtml() {
  return `<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@600&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0}body{width:1280px;height:720px;background:#faf7f2;position:relative;overflow:hidden;font-family:Inter,sans-serif;color:#1f1a17}
.a,.b{position:absolute;border-radius:50%}.a{width:620px;height:620px;right:-150px;top:-200px;background:#fde3d3}.b{width:380px;height:380px;left:-120px;bottom:-170px;background:#fbefc4}
.pill{position:absolute;left:72px;top:64px;background:#fff;padding:10px 22px;border-radius:999px;font-size:22px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;border:1px solid #e8e0d3}
h1{position:absolute;left:72px;top:150px;width:720px;font-family:Fraunces,serif;font-weight:500;font-size:74px;line-height:1.06;letter-spacing:-.02em}
.who{position:absolute;left:72px;bottom:56px;font-size:28px;font-weight:600}
.photo{position:absolute;right:96px;top:120px;width:380px;height:380px;border-radius:50%;object-fit:cover;border:10px solid #fff;box-shadow:0 36px 70px -24px rgba(60,40,20,.5)}</style>
<div class="a"></div><div class="b"></div><div class="pill">${site.role}</div>
<h1>${site.hero.headline}</h1><img class="photo" src="${avatar}"><div class="who">${site.name}</div>`;
}

async function main() {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome", args: ["--no-sandbox", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const tmp = path.join(os.tmpdir(), `thumb-${process.pid}.html`);
  for (const p of projects) {
    const d = await Promise.all((p.screenshots ?? []).filter((x) => x.kind !== "workflow" && x.kind !== "architecture").map((x) => dims(p.slug, x.src)));
    fs.writeFileSync(tmp, html(p, d));
    await page.goto(`file://${tmp}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: "png" });
    const dir = `public/projects/${p.slug}`;
    fs.mkdirSync(dir, { recursive: true });
    await sharp(png).webp({ quality: 86 }).toFile(`${dir}/thumbnail.webp`);
    await sharp(png).resize({ width: 640 }).webp({ quality: 82 }).toFile(`${dir}/thumbnail-sm.webp`);
    // JPEG at the 1.91:1 size social networks expect (LinkedIn and others are unreliable with WebP)
    await sharp(png).resize(1200, 630, { fit: "cover", position: "top" }).jpeg({ quality: 86, mozjpeg: true }).toFile(`${dir}/thumbnail-og.jpg`);
    console.log("✓", p.slug);
  }
  if (!only) {
    fs.writeFileSync(tmp, homeHtml());
    await page.goto(`file://${tmp}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: "png" });
    await sharp(png).resize(1200, 630, { fit: "cover", position: "top" }).jpeg({ quality: 86, mozjpeg: true }).toFile("public/images/og-home.jpg");
    console.log("✓ home social card");
  }
  fs.rmSync(tmp, { force: true });
  await browser.close();
}
main();
