/** Regenerates content/schema/project.schema.json so editors autocomplete taxonomy ids. Run: npm run schema */
import fs from "node:fs";
import { INDUSTRIES, PROJECT_TYPES, TECH } from "../content/taxonomy";

const ids = (t: object) => ({ type: "array", minItems: 1, items: { enum: Object.keys(t) } });
const str = { type: "string" };
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Portfolio project",
  type: "object",
  required: ["slug", "title", "summary", "types", "industries", "tech"],
  additionalProperties: false,
  properties: {
    $schema: str,
    slug: { type: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$", description: "Must match the file name. Becomes /projects/<slug>" },
    title: { ...str, description: "Outcome-oriented, e.g. 'AI Voice Receptionist for Real Estate Lead Qualification'" },
    summary: { ...str, description: "One line. Shown on cards and link previews." },
    types: ids(PROJECT_TYPES),
    industries: ids(INDUSTRIES),
    tech: ids(TECH),
    featured: { type: "integer", minimum: 1, description: "Homepage order (1 = first). Omit if not featured." },
    draft: { type: "boolean", description: "Hidden in production builds" },
    unlisted: { type: "boolean", description: "Reachable by URL only; noindex; not in lists or sitemap" },
    year: { type: "integer" },
    duration: str,
    problem: str,
    solution: str,
    highlights: { type: "array", items: str },
    role: { ...str, description: "What YOU personally handled" },
    results: {
      type: "array",
      description: "Real numbers only. If there's no metric, describe the practical outcome and omit value.",
      items: { type: "object", required: ["label"], additionalProperties: false, properties: { value: str, label: str } },
    },
    loom: {
      type: "object",
      required: ["url"],
      additionalProperties: false,
      properties: { url: str, duration: str, title: str, poster: str },
    },
    screenshots: {
      type: "array",
      items: {
        type: "object",
        required: ["src", "alt"],
        additionalProperties: false,
        properties: {
          src: { ...str, description: "File in public/projects/<slug>/" },
          alt: str,
          caption: str,
          kind: { enum: ["ui", "workflow", "architecture", "docs", "before-after", "other"] },
          blur: { type: "boolean", description: "CSS blur only — pre-blur the file for real confidentiality" },
        },
      },
    },
    links: { type: "array", items: { type: "object", required: ["label", "url"], additionalProperties: false, properties: { label: str, url: str } } },
    confidentiality: { enum: ["public", "anonymized", "nda"], description: "anonymized: hides client name + links. nda: also hides screenshots and Loom." },
    clientAlias: { ...str, description: "e.g. 'US real-estate brokerage'" },
    clientName: str,
    testimonial: { type: "object", required: ["quote"], additionalProperties: false, properties: { quote: str, author: str, source: str } },
    keywords: { type: "array", items: str },
  },
};
fs.writeFileSync("content/schema/project.schema.json", JSON.stringify(schema, null, 2) + "\n");
console.log("wrote content/schema/project.schema.json");
