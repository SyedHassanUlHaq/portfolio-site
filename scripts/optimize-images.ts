/**
 * Converts every PNG/JPG in public/projects/** to WebP (max 1600px wide) plus a 640px "-sm" variant for cards,
 * then deletes the original. Safe to re-run. Run: npm run images
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

function* walk(dir: string): Generator<string> {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(png|jpe?g)$/i.test(e.name)) yield p;
  }
}

async function main() {
  const root = "public/projects";
  let n = 0;
  for (const file of walk(root)) {
    const base = file.replace(/\.(png|jpe?g)$/i, "");
    const img = sharp(file).rotate();
    await img.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${base}.webp`);
    await img.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${base}-sm.webp`);
    fs.unlinkSync(file);
    console.log(`optimized ${file}`);
    n++;
  }
  console.log(n ? `Done (${n} images).` : "Nothing to optimize.");
}
main();
