/**
 * The shape of one project file in content/projects/<slug>.json.
 * Everything except the fields marked REQUIRED can be omitted — the UI
 * simply skips sections that have no content.
 */
export type Screenshot = {
  /** File name inside public/projects/<slug>/ (e.g. "dashboard.webp") */
  src: string;
  alt: string;
  caption?: string;
  kind?: "ui" | "workflow" | "architecture" | "docs" | "before-after" | "other";
  /** CSS-blurs the image. NOT real protection — pre-blur the file for anything truly confidential. */
  blur?: boolean;
};

export type ProjectLink = { label: string; url: string };

export type ProjectSource = {
  slug: string; // REQUIRED — must match the file name
  title: string; // REQUIRED — outcome-oriented, e.g. "AI Voice Receptionist for Real Estate Lead Qualification"
  summary: string; // REQUIRED — one line, shown on cards and in link previews
  types: string[]; // REQUIRED — ids from content/taxonomy.ts → PROJECT_TYPES
  industries: string[]; // REQUIRED — ids from INDUSTRIES
  tech: string[]; // REQUIRED — ids from TECH

  /** Ordering on the homepage. 1 = first. Leave out if not featured. */
  featured?: number;
  /** Drafts are hidden in production builds (visible in `npm run dev`). */
  draft?: boolean;
  /** Reachable by URL but not listed, not in sitemap, noindex. For per-client private links. */
  unlisted?: boolean;
  year?: number;
  duration?: string; // "3 weeks"

  problem?: string;
  solution?: string;
  highlights?: string[]; // "What it does" bullets
  role?: string; // what YOU personally handled
  /** Only real numbers. No metric? Describe the practical outcome instead (value can be omitted). */
  results?: { value?: string; label: string }[];

  loom?: {
    url: string; // https://www.loom.com/share/<id>
    duration?: string; // "2:40"
    title?: string;
    /** Optional poster image (file in public/projects/<slug>/). Defaults to the first screenshot. */
    poster?: string;
  };
  screenshots?: Screenshot[];
  links?: ProjectLink[]; // GitHub, live demo…

  confidentiality?: "public" | "anonymized" | "nda";
  /** Shown instead of the real client name when anonymized/nda, e.g. "US real-estate brokerage" */
  clientAlias?: string;
  /** Real client name. Stripped from the build output unless confidentiality is "public". */
  clientName?: string;
  /** Client feedback, if you have it. */
  testimonial?: { quote: string; author?: string; source?: string };

  /** Extra search terms that don't appear elsewhere. */
  keywords?: string[];
};

export type ResolvedScreenshot = Screenshot & {
  width: number;
  height: number;
  /** ~640px variant, used for grids/cards when it exists */
  srcSm?: string;
};

/** What the UI receives: validated, redacted, with image sizes resolved. */
export type Project = Omit<ProjectSource, "screenshots" | "clientName"> & {
  screenshots: ResolvedScreenshot[];
  clientName?: string;
  loomId?: string;
  posterSrc?: string;
  confidentiality: "public" | "anonymized" | "nda";
};

/** Lightweight version sent to the client-side explorer. */
export type ProjectCardData = {
  slug: string;
  title: string;
  summary: string;
  types: string[];
  industries: string[];
  tech: string[];
  featured?: number;
  year?: number;
  loomDuration?: string;
  hasLoom: boolean;
  thumb?: { src: string; width: number; height: number; alt: string; blur?: boolean };
  confidentiality: Project["confidentiality"];
  /** pre-computed lowercase search fields, see lib/search.ts */
  index: Record<"title" | "labels" | "keywords" | "text", string>;
};
