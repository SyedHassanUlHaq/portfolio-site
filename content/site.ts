/**
 * Site-wide copy and settings. Everything a visitor reads on the homepage that isn't a project
 * lives here, so you can tune positioning without touching components.
 */
export const site = {
  name: "Syed Hassan Ul Haq",
  shortName: "Hassan",
  role: "AI Automation & Agent Engineer",
  /** Production URL, used for canonical links, sitemap and social previews. Update when you get a custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://syedhassanulhaq.github.io/portfolio-site",

  hero: {
    eyebrow: "AI Automation & Agent Engineer",
    headline: "I build AI agents and automations that take real work off your team.",
    sub: "AI that answers your calls, finds your leads, writes your reports and connects your tools. Built solo, end to end, for real businesses.",
    primaryCta: "See work like yours",
    secondaryCta: "Start a conversation",
    pickerPrefix: "I want AI to",
    pickerPlaceholder: "pick a task…",
    pickerButton: "Show examples",
    pickerButtonEmpty: "Browse all work",
  },

  /** Clickable example searches under the search box. */
  searchExamples: ["voice agent", "lead generation", "dashboard", "instagram"],

  /** Intro video: a YouTube or Loom URL (`url`), or a self-hosted file (`src`, in public/ — wins if both are set). Leave all empty to hide the slot. */
  introVideo: {
    src: "",
    url: "https://youtu.be/j4idL0ATPPM",
    duration: "2:22",
    title: "intro video",
    // used for search-engine video markup
    seoName: "Syed Hassan | Full-Stack Developer & AI Automation Engineer",
    seoDescription: "A two-minute introduction to Syed Hassan Ul Haq, an AI automation and agent engineer: what he builds, who he helps and how to get started.",
    uploadDate: "2026-10-08T04:03:58-07:00",
    durationIso: "PT2M22S",
    poster: "/images/intro-poster.webp", // file in public/
    posterHasPlay: true, // the thumbnail already has a play button drawn on it
  },

  /** Contact channels. Empty values are hidden. */
  contact: {
    email: "ulhaqhassan1@gmail.com",
    upwork: "https://www.upwork.com/freelancers/~01fffaa37457b3e468",
    calendly: "https://calendly.com/syedhassan27/new-meeting",
    github: "https://github.com/SyedHassanUlHaq",
    linkedin: "https://linkedin.com/in/syed-hassan-ul-haq",
  },

  /** Small trust strip under the hero. Only put verifiable facts here. */
  trust: [
    { value: "100%", label: "Job Success on Upwork" },
    { value: "2 yrs", label: "building AI systems" },
    { value: "GSoC '24", label: "Google Summer of Code mentee" },
  ],

  about: {
    heading: "Backend-strong, AI-native, and easy to work with.",
    paragraphs: [
      "I'm Hassan, a software engineer who builds AI-powered systems end to end: the model logic, the APIs, the integrations and the interface people actually use.",
      "My background is backend and systems work, which is why my automations tend to survive contact with messy real-world data. I've shipped across industries, from logistics and finance to media security, so I usually have seen a version of your problem before.",
    ],
    credential: {
      title: "Google Summer of Code 2024",
      text: "Selected as a GSoC 2024 mentee under Chips Alliance, working on Zvk support in T1, a RISC-V vector coprocessor.",
      image: "/images/gsoc/certificate.webp",
      imageAlt: "Google Summer of Code 2024 completion certificate",
    },
  },

  cta: {
    heading: "Have something similar in mind?",
    text: "Send me a short description of the problem. I'll reply with how I'd approach it and point to the closest thing I've already built.",
  },
};

/** ElevenLabs conversational agent (chat + voice). Leave agentId empty to hide it. Must be a public agent with this site's domain on its allowlist. */
export const assistant = {
  agentId: "agent_0001m77sacs1ech9x9pbwmw6nc5p",
  label: "Ask my AI assistant",
};

/** Search-engine settings. */
export const seo = {
  homeTitle: "Syed Hassan Ul Haq | AI Automation & AI Agent Developer",
  homeDescription:
    "Freelance AI automation engineer building AI voice agents, chatbots, CRM automations and n8n workflows. See real projects, demo videos and book a call.",
  /** Google Search Console HTML-tag verification token (the content="…" value). Leave empty until you have one. */
  googleVerification: process.env.NEXT_PUBLIC_GSC_TOKEN || "xvC3-XVQbEqL06ObdzwySDN9-rwThpGFSJ0X0BlqMsA",
};

/**
 * Client reviews from the Upwork profile. Quotes are copied word for word, so don't edit the wording.
 * The Upwork page doesn't show client names to us here, so they're attributed to the job, not a person.
 */
export const testimonials = [
  {
    quote: "Hassan was quick, professional, and very responsive.\n\nHe understood my business' needs perfectly and fixed the issue very quickly.\n\nHighly recommended",
    job: "HubSpot workflow automation fix",
    when: "August 2026",
  },
  {
    quote: "He expertly debugged the voice assistant issue, swiftly identifying and resolving the problem with Elevenlabs, n8n, and Twilio. His technical expertise and attention to detail ensured a seamless solution.",
    job: "Voice assistant debugging (ElevenLabs, n8n, Twilio)",
    when: "August 2025",
  },
];

/** Skills clients have endorsed on Upwork. */
export const endorsements = ["Solution Oriented", "Clear Communicator", "Detail Oriented", "Reliable", "Committed to Quality"];

/** Site-wide "last updated" date (YYYY-MM-DD). Bump it whenever you make a meaningful content change. */
export const lastUpdated = "2026-11-16";

/** Common questions, shown on the homepage and marked up for search and AI answers. Edit the answers here (add real pricing/timelines when you're ready). */
export const faq = [
  { q: "What do you do?", a: "I'm Syed Hassan Ul Haq, a freelance AI automation and agent engineer. I build AI voice agents, chatbots that answer from your own documents, lead-generation and CRM automations, reporting dashboards, integrations between business tools, and the web and mobile apps around them." },
  { q: "Do you work alone?", a: "Mostly, yes. On the projects in my portfolio I was the sole engineer and built everything end to end. On some, such as the 5dot mobile app, I worked alongside the client's separate backend developer." },
  { q: "How do we start a project?", a: "Send me a short description of the problem by email or on Upwork, or book a call. I reply with how I'd approach it and point to the closest thing I've already built." },
  { q: "How much does it cost?", a: "It depends on the scope: what the system needs to do, which tools it connects and how much custom work is involved, so I don't list fixed prices. Describe what you need and I'll tell you honestly how I'd approach it and what's involved." },
  { q: "How long does a project take?", a: "That depends on the size. A single automation is much quicker than a full app with an app-store release. Once you've described the project I'll give you a realistic estimate rather than a guess." },
  { q: "Which tools and technologies do you use?", a: "For AI and automation: n8n, Zapier, OpenAI, Claude, ElevenLabs, Twilio, GoHighLevel and HubSpot. For building products: Python, FastAPI, React, TypeScript, Supabase, PostgreSQL, and React Native with Expo for mobile apps." },
  { q: "Can I see examples of your work?", a: "Yes. Every project in the portfolio explains the problem, what I built, my role and what the system does, and most have screenshots. You can browse by what you need or search by industry and tool." },
];

export const analytics = {
  /** Umami Cloud website id (free tier). Leave empty for no analytics. https://umami.is */
  // the deploy passes unset GitHub variables as empty strings, so use || (not ??) to fall back
  umamiId: process.env.NEXT_PUBLIC_UMAMI_ID || "d757292b-f978-4371-bf54-68435dba7d03",
};
