/**
 * Site-wide copy and settings. Everything a visitor reads on the homepage that isn't a project
 * lives here, so you can tune positioning without touching components.
 */
export const site = {
  name: "Syed Hassan Ul Haq",
  shortName: "Hassan",
  role: "AI Automation & Agent Engineer",
  /** Production URL, used for canonical links, sitemap and social previews. Update when you get a custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://syedhassanulhaq.github.io/portfolio-site",

  hero: {
    eyebrow: "AI Automation & Agent Engineer",
    headline: "I build AI agents and automations that take real work off your team.",
    sub: "Two years shipping AI agents, voice systems, RAG and integrations for real businesses — plus the backend and apps that make them dependable in production.",
    primaryCta: "See work like yours",
    secondaryCta: "Start a conversation",
  },

  /** Intro video: a YouTube or Loom URL (`url`), or a self-hosted file (`src`, in public/ — wins if both are set). Leave all empty to hide the slot. */
  introVideo: {
    src: "",
    url: "https://youtu.be/j4idL0ATPPM",
    duration: "2:22",
    title: "intro video",
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

export const analytics = {
  /** Umami Cloud website id (free tier). Leave empty for no analytics. https://umami.is */
  umamiId: process.env.NEXT_PUBLIC_UMAMI_ID ?? "",
};
