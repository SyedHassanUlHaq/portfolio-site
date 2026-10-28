/**
 * Single source of truth for filters, labels and search synonyms.
 * To add a category/industry/technology: add one line here, then use its id in project files.
 * A typo in a project file fails the build with a clear message.
 */

export type Term = {
  label: string;
  /** Extra words that should find this term in search ("postgres" → PostgreSQL). */
  aliases?: string[];
  /** Short client-facing line, used on the Capabilities section (types only). */
  blurb?: string;
};

export const PROJECT_TYPES: Record<string, Term> = {
  "ai-agents": {
    label: "AI Agents",
    aliases: ["agent", "agentic", "autonomous", "llm", "multi-agent"],
    blurb: "Agents that reason, use your tools and finish real tasks — not chatbots that just answer.",
  },
  "ai-automation": {
    label: "AI Automation",
    aliases: ["automation", "workflow", "workflows", "automate", "ai workflow"],
    blurb: "Repetitive, judgment-heavy processes turned into reliable automated workflows.",
  },
  "voice-ai": {
    label: "Voice AI",
    aliases: ["voice agent", "voice", "phone", "call", "caller", "receptionist", "speech", "ai caller"],
    blurb: "Inbound and outbound AI phone agents that book, qualify and follow up.",
  },
  rag: {
    label: "RAG & Knowledge",
    aliases: ["rag", "retrieval", "knowledge base", "chatbot", "vector", "embeddings", "semantic search"],
    blurb: "Assistants grounded in your own documents and data, with sources.",
  },
  integrations: {
    label: "Integrations & APIs",
    aliases: ["integration", "api", "apis", "webhook", "sync", "connect"],
    blurb: "Systems that talk to each other — CRMs, marketplaces, payments, internal tools.",
  },
  "data-pipelines": {
    label: "Scraping & Data",
    aliases: ["scraping", "scraper", "scrape", "crawler", "etl", "pipeline", "data extraction"],
    blurb: "Reliable data collection, extraction and structuring at scale.",
  },
  "full-stack": {
    label: "Full-Stack Apps",
    aliases: ["full stack", "fullstack", "web app", "web application", "saas", "dashboard", "frontend", "backend"],
    blurb: "Complete web products: UI, API and database, built to be maintained.",
  },
  "machine-learning": {
    label: "Machine Learning",
    aliases: ["ml", "deep learning", "model", "classifier", "computer vision", "detection"],
    blurb: "Custom models where off-the-shelf APIs don't cut it.",
  },
};

export const INDUSTRIES: Record<string, Term> = {
  "real-estate": { label: "Real Estate", aliases: ["property", "realtor", "realty", "brokerage"] },
  healthcare: { label: "Healthcare", aliases: ["medical", "clinic", "health"] },
  ecommerce: { label: "E-commerce", aliases: ["shopify", "amazon", "ebay", "store", "retail", "marketplace"] },
  logistics: { label: "Logistics", aliases: ["warehouse", "shipping", "fulfillment", "supply chain"] },
  marketing: { label: "Marketing & Sales", aliases: ["leads", "lead generation", "outreach", "crm", "sales"] },
  finance: { label: "Finance", aliases: ["fintech", "equity", "investing", "banking"] },
  saas: { label: "SaaS", aliases: ["software", "b2b"] },
  restaurants: { label: "Restaurants", aliases: ["food", "hospitality"] },
  "professional-services": { label: "Professional Services", aliases: ["agency", "consulting", "legal"] },
  media: { label: "Media & Security", aliases: ["deepfake", "video", "audio", "trust and safety"] },
  other: { label: "Other" },
};

export type TechGroup = "AI & LLM" | "Automation" | "Backend" | "Frontend" | "Data" | "Cloud & Tools";

export const TECH: Record<string, Term & { group: TechGroup }> = {
  // AI & LLM
  openai: { label: "OpenAI", group: "AI & LLM", aliases: ["gpt", "chatgpt", "gpt-4"] },
  anthropic: { label: "Claude / Anthropic", group: "AI & LLM", aliases: ["claude"] },
  langchain: { label: "LangChain", group: "AI & LLM" },
  langgraph: { label: "LangGraph", group: "AI & LLM" },
  crewai: { label: "CrewAI", group: "AI & LLM" },
  vapi: { label: "Vapi", group: "AI & LLM", aliases: ["voice"] },
  retell: { label: "Retell AI", group: "AI & LLM", aliases: ["voice"] },
  elevenlabs: { label: "ElevenLabs", group: "AI & LLM", aliases: ["voice", "tts", "text to speech"] },
  twilio: { label: "Twilio", group: "AI & LLM", aliases: ["sms", "phone", "voice"] },
  tensorflow: { label: "TensorFlow", group: "AI & LLM", aliases: ["deep learning"] },
  pytorch: { label: "PyTorch", group: "AI & LLM", aliases: ["deep learning"] },
  // Automation
  n8n: { label: "n8n", group: "Automation" },
  make: { label: "Make", group: "Automation", aliases: ["integromat"] },
  zapier: { label: "Zapier", group: "Automation" },
  // Backend
  python: { label: "Python", group: "Backend" },
  fastapi: { label: "FastAPI", group: "Backend", aliases: ["fast api"] },
  django: { label: "Django REST", group: "Backend", aliases: ["drf", "django rest framework"] },
  nodejs: { label: "Node.js", group: "Backend", aliases: ["node", "express"] },
  go: { label: "Go", group: "Backend", aliases: ["golang"] },
  // Frontend
  react: { label: "React", group: "Frontend" },
  nextjs: { label: "Next.js", group: "Frontend", aliases: ["next"] },
  typescript: { label: "TypeScript", group: "Frontend", aliases: ["ts"] },
  "react-native": { label: "React Native", group: "Frontend", aliases: ["mobile", "ios", "android"] },
  // Data
  postgresql: { label: "PostgreSQL", group: "Data", aliases: ["postgres", "sql"] },
  supabase: { label: "Supabase", group: "Data" },
  mongodb: { label: "MongoDB", group: "Data", aliases: ["mongo", "nosql"] },
  redis: { label: "Redis", group: "Data" },
  playwright: { label: "Playwright", group: "Data", aliases: ["scraping", "browser automation", "puppeteer"] },
  librosa: { label: "Librosa", group: "Data", aliases: ["audio"] },
  // Cloud & tools
  docker: { label: "Docker", group: "Cloud & Tools" },
  aws: { label: "AWS", group: "Cloud & Tools" },
  cloudflare: { label: "Cloudflare", group: "Cloud & Tools" },
  shopify: { label: "Shopify API", group: "Cloud & Tools", aliases: ["ecommerce"] },
  "amazon-sp-api": { label: "Amazon API", group: "Cloud & Tools", aliases: ["amazon", "fba", "fbm"] },
  "ebay-api": { label: "eBay API", group: "Cloud & Tools", aliases: ["ebay"] },
  hubspot: { label: "HubSpot", group: "Cloud & Tools", aliases: ["crm"] },
  gohighlevel: { label: "GoHighLevel", group: "Cloud & Tools", aliases: ["ghl", "highlevel", "crm"] },
};

/**
 * Words that should behave the same in a search box. Each row is one group.
 * "real estate voice agent" → still finds a project tagged "Voice AI" + "Real Estate".
 */
export const SYNONYMS: string[][] = [
  ["agent", "agents", "agentic"],
  ["voice", "phone", "call", "calls", "caller", "receptionist"],
  ["rag", "retrieval", "knowledge"],
  ["scraper", "scraping", "scrape", "crawler"],
  ["crm", "hubspot", "gohighlevel", "ghl"],
  ["automation", "automate", "automations", "workflow", "workflows"],
  ["ecommerce", "e-commerce", "shopify", "store"],
  ["postgres", "postgresql"],
];
