/** Scaffolds a project: npm run new-project -- my-project-slug */
import fs from "node:fs";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run new-project -- <lowercase-slug>");
  process.exit(1);
}
const file = `content/projects/${slug}.json`;
if (fs.existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}
const tpl = {
  $schema: "../schema/project.schema.json",
  slug,
  title: "",
  summary: "",
  types: [],
  industries: [],
  tech: [],
  draft: true,
  problem: "",
  solution: "",
  highlights: [],
  role: "",
  results: [{ label: "" }],
  loom: { url: "", duration: "" },
  screenshots: [{ src: "screenshot-1.webp", alt: "" }],
  confidentiality: "public",
};
fs.writeFileSync(file, JSON.stringify(tpl, null, 2) + "\n");
fs.mkdirSync(`public/projects/${slug}`, { recursive: true });
console.log(`Created ${file} and public/projects/${slug}/\nDrop screenshots into that folder, run "npm run images", then remove "draft" when ready.`);
