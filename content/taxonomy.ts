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


export type Faq = { q: string; a: string };

export type Tone = "peach" | "butter" | "sky" | "sage" | "lilac" | "rose" | "mint" | "sand" | "periwinkle" | "clay";

/**
 * What a client is trying to get done, in their words. This is the main way visitors browse the work.
 * `phrase` completes the sentence "I want AI to ..." in the homepage picker.
 */
export const NEEDS: Record<string, Term & { phrase: string; tone: Tone; seoTitle: string; seoDescription: string; h1: string; intro: string; answer: string; faq: Faq[] }> = {
  calls: {
    answer: "An AI voice agent is software that answers or places phone calls in a natural human voice, works out what the caller wants and takes action, such as qualifying a lead, booking an appointment or updating your CRM. I build them with ElevenLabs, Twilio and your existing tools.",
    faq: [
      {
            "q": "What can an AI voice agent do on a business phone line?",
            "a": "It can answer inbound calls like a receptionist, tell new leads from existing clients, collect project and contact details, and hand over to a person when needed. It can also place outbound follow-up calls that work out whether a lead wants to book, call back later or isn't interested."
      },
      {
            "q": "Which tools do you build voice agents with?",
            "a": "ElevenLabs for the voice and conversation, Twilio for telephony, OpenAI for the language model, and n8n or GoHighLevel to connect the agent to your CRM and workflows."
      },
      {
            "q": "Can the voice agent update my CRM?",
            "a": "Yes. In my projects the agent submits structured details through webhook tools and writes the outcome of each call back to the CRM, so statuses update without manual entry."
      }
],
    seoTitle: "AI Voice Agent Developer for Business Calls",
    seoDescription: "Hire an AI voice agent developer: inbound AI receptionists and outbound follow-up callers built with ElevenLabs, Twilio and CRM integration. See real projects.",
    h1: "AI voice agents that answer and make your calls",
    intro: "I build AI phone agents that answer inbound calls like a real receptionist, follow up with leads by phone, qualify callers and write the outcome straight into your CRM. They run on ElevenLabs, Twilio and your existing tools, and I handle the whole build myself.",
    label: "Answer & make calls",
    phrase: "answer and make my phone calls",
    tone: "peach",
    blurb: "AI receptionists and callers that sound human, book appointments and never miss a call.",
    aliases: ["phone", "voice", "receptionist", "call", "calls", "caller", "voice agent"],
  },
  leads: {
    answer: "AI lead generation and cold email automation finds prospects, researches each company, writes personalised emails with AI, enrols leads in sending campaigns and follows up based on how each lead behaves. I build these in n8n with tools such as Apollo and Instantly.",
    faq: [
      {
            "q": "How does your cold email automation work?",
            "a": "It finds and enriches leads through Apollo.io, researches each company from its website, has Claude write a personalised email, and enrols the lead in an Instantly campaign. Leads are then sorted by what they did (opened, clicked or ignored) so follow-ups match, and a report is produced for each campaign."
      },
      {
            "q": "Which tools does it use?",
            "a": "n8n for the workflows, Apollo.io for leads, Claude for writing, Google Sheets for data, WordPress for site integration and Instantly for sending."
      },
      {
            "q": "Do the emails sound generic?",
            "a": "Each email is written for the individual lead from real research on their company, rather than from one shared template."
      }
],
    seoTitle: "AI Cold Email & Lead Generation Automation",
    seoDescription: "Automated lead discovery, company research, personalised AI emails and smart follow-ups using n8n, Apollo and Instantly. See how I built it.",
    h1: "Lead generation and cold email that runs itself",
    intro: "I build systems that find prospects, research each company, write personalised emails with AI, enrol leads in email campaigns and follow up based on how each lead behaves. Below are the outbound and lead-generation systems I've built.",
    label: "Get more leads",
    phrase: "find and email new leads for me",
    tone: "butter",
    blurb: "Find the right prospects, research them and send personal outreach on autopilot.",
    aliases: ["lead generation", "cold email", "outreach", "prospecting", "sales"],
  },
  crm: {
    answer: "CRM automation moves information into your CRM and between your tools without manual entry, so every call, form and deal lands at the right pipeline stage. My work spans GoHighLevel, Monday.com, Zapier and n8n.",
    faq: [
      {
            "q": "Which CRMs and tools do you work with?",
            "a": "GoHighLevel, Monday.com and HubSpot, connected through Zapier, n8n and Google Apps Script, with Fathom for call recordings and Microsoft Teams and Google Sheets alongside. I've also fixed broken HubSpot workflow automations for clients."
      },
      {
            "q": "How do sales calls get into the CRM?",
            "a": "In one system I built, finishing a call in Fathom triggers a Zapier automation that updates the contact in GoHighLevel. That creates or updates the opportunity, and an n8n workflow classifies the call and records the outcome."
      },
      {
            "q": "Can you keep two tools in sync in both directions?",
            "a": "Yes. I built a two-way sync between Google Sheets and Monday.com using Apps Script and the Monday.com GraphQL API, with batch processing and retries."
      }
],
    seoTitle: "CRM & Sales Automation Developer",
    seoDescription: "CRM and sales automation with GoHighLevel, Monday.com, Zapier and n8n: calls, forms and deals synced to the right pipeline stage automatically.",
    h1: "CRM and sales automation that keeps your pipeline current",
    intro: "I connect calls, forms, call recordings and deals to your CRM so every lead lands at the right stage without manual data entry. My work spans GoHighLevel, Monday.com, Zapier and n8n.",
    label: "Keep my CRM updated",
    phrase: "keep my CRM and sales pipeline up to date",
    tone: "sky",
    blurb: "Calls, forms and deals land in your CRM with the right stage, every time.",
    aliases: ["crm", "pipeline", "gohighlevel", "follow up", "follow-up", "sales"],
  },
  reports: {
    answer: "Automated reporting pulls numbers from your marketing, sales and project tools into one dashboard or a scheduled report, so nobody copies figures by hand. Some of my reports also include AI-written summaries and recommendations.",
    faq: [
      {
            "q": "Which sources can reports pull from?",
            "a": "In my projects: WebinarJam, GoHighLevel, Facebook, LinkedIn, Asana and Fathom, stored in Supabase and shown in a React dashboard."
      },
      {
            "q": "Can AI write the report summary?",
            "a": "Yes. For Asana I built weekly and quarterly reports where an OpenAI model writes the analysis and recommendations and the report is emailed to stakeholders."
      },
      {
            "q": "Are the numbers updated automatically?",
            "a": "Yes. Scheduled n8n workflows sync the data, for example weekly, so the dashboard stays current without anyone touching it."
      }
],
    seoTitle: "Automated Reporting & Analytics Dashboards",
    seoDescription: "Automated reporting and analytics dashboards that pull data from your marketing, sales and project tools, with AI-written summaries. See real projects.",
    h1: "Reports and dashboards that fill themselves",
    intro: "I build dashboards and scheduled reports that pull numbers from your marketing, sales and project tools, so nobody copies figures by hand. Some include AI-written summaries and recommendations.",
    label: "Stop manual reporting",
    phrase: "build my reports for me",
    tone: "sage",
    blurb: "Dashboards and weekly reports that fill themselves, so nobody copies numbers by hand.",
    aliases: ["report", "reporting", "dashboard", "analytics", "kpi", "metrics"],
  },
  knowledge: {
    answer: "An AI knowledge assistant answers questions from your own documents, such as SOPs and policies, instead of from the open internet. The technique is called retrieval-augmented generation, or RAG. I build them as chatbots and as voice assistants.",
    faq: [
      {
            "q": "What is RAG in plain English?",
            "a": "The assistant first looks up the relevant passages in your documents, then writes its answer from them. That keeps answers tied to your material instead of the AI's guesses."
      },
      {
            "q": "How does the knowledge stay up to date?",
            "a": "A scheduled workflow re-fetches your documents, rebuilds the knowledge base and replaces the old one. In my document editor, search embeddings are refreshed automatically whenever a file changes."
      },
      {
            "q": "Can it work by voice as well as chat?",
            "a": "Yes. I've built both: an ElevenLabs voice assistant for SOP questions, and a chatbot that can also send emails on request."
      }
],
    seoTitle: "AI Knowledge Base & Document Chatbot (RAG)",
    seoDescription: "Build an AI knowledge base or document chatbot (RAG) that answers from your SOPs and files, by chat or voice. See real projects and how they work.",
    h1: "AI assistants that answer from your own documents",
    intro: "I build chatbots and voice assistants that answer questions from a company's SOPs and documents, with knowledge that updates itself when the source changes. This is retrieval-augmented generation (RAG), explained in plain English in each project.",
    label: "Search company knowledge",
    phrase: "answer questions from my documents",
    tone: "lilac",
    blurb: "Ask in plain English, get answers from your own SOPs and documents, with the latest version.",
    aliases: ["knowledge base", "sop", "documents", "chatbot", "search", "rag", "assistant"],
  },
  social: {
    answer: "Social media reply automation uses AI to answer customer comments and messages, filter spam and abuse, and escalate to a person when needed, using your real business data so replies stay accurate.",
    faq: [
      {
            "q": "Can AI reply to Instagram comments safely?",
            "a": "In my Instagram system every comment is checked for spam and aggression, support requests are escalated, and a reply is written only after matching the comment to real event data."
      },
      {
            "q": "Where does the AI get its answers?",
            "a": "From your own data. Event information is stored in a vector database and retrieved by meaning for each comment, so replies are grounded rather than invented."
      },
      {
            "q": "Can I moderate it myself?",
            "a": "Yes. I built an operations dashboard to switch workflows on and off, watch executions, and review or delete comments."
      }
],
    seoTitle: "AI Chatbots & Social Media Reply Automation",
    seoDescription: "AI chatbots and social media reply automation with spam filtering and escalation, grounded in your own data. See Instagram and chat bot projects.",
    h1: "AI that replies to your customers and comments",
    intro: "I build AI that answers customer questions on social media and chat, filters spam and abuse, escalates when a human is needed, and uses your real business data to reply accurately.",
    label: "Handle customer replies",
    phrase: "reply to my customers and comments",
    tone: "rose",
    blurb: "Chatbots and moderation that answer questions on social media and chat, politely and accurately.",
    aliases: ["instagram", "social media", "comments", "chatbot", "support", "customer service", "moderation"],
  },
  connect: {
    answer: "Integration automation connects the apps your team already uses so information moves between them automatically. I do this with n8n, Zapier and direct API work.",
    faq: [
      {
            "q": "Which tools can you connect?",
            "a": "Slack, Asana, Microsoft Teams, Google Sheets, Monday.com, GoHighLevel, Gmail, Google Drive, Fathom, WebinarJam and more, using n8n, Zapier or the tools' own APIs."
      },
      {
            "q": "Do you use n8n or Zapier?",
            "a": "Both. I've built production workflows in each, and I write direct API code when neither fits."
      },
      {
            "q": "Can an automation start from a chat message?",
            "a": "Yes. In one project, a request posted in Slack creates a complete Asana campaign with deadlines, email drafts and documents."
      }
],
    seoTitle: "n8n, Zapier & API Integration Developer",
    seoDescription: "n8n, Zapier and API integration work that connects Slack, Asana, Teams, Google Sheets, Monday.com and more. See real automation projects.",
    h1: "Connect your tools so nobody copy-pastes",
    intro: "I connect the apps your team already uses (Slack, Asana, Teams, Sheets, Monday and more) so information moves between them automatically, using n8n, Zapier and direct API work.",
    label: "Connect my tools",
    phrase: "connect my tools so I stop copy-pasting",
    tone: "mint",
    blurb: "Slack, Asana, Teams, Sheets, Monday and more, talking to each other automatically.",
    aliases: ["integration", "integrations", "sync", "zapier", "automation", "workflow", "api"],
  },
  data: {
    answer: "Web scraping and data extraction automation collects information from websites and forms automatically, then cleans and structures it so it's ready to use. I build it with Playwright, Apify and n8n.",
    faq: [
      {
            "q": "Can you scrape sites that need a login?",
            "a": "Yes. My financial-data pipeline keeps user sessions and works with Cloudflare-protected pages using open-source tools. Scraping should only be done where you have the right to the data."
      },
      {
            "q": "What happens to the data afterwards?",
            "a": "It's cleaned and parsed, optionally classified by an LLM, and stored where you need it, for example in MongoDB or Google Sheets."
      },
      {
            "q": "Can you fill in web forms automatically?",
            "a": "Yes. I've built automations that read each form's fields, map your data onto them with AI, and submit them with a headless browser."
      }
],
    seoTitle: "Web Scraping & Data Extraction Automation",
    seoDescription: "Web scraping and data extraction automation with Playwright, Apify and LLM classification, including login and Cloudflare-protected sites.",
    h1: "Reliable data collection from the web",
    intro: "I build scraping, form-filling and data-extraction pipelines that handle logins, bot protection and messy pages, then clean and classify the results so they're ready to use.",
    label: "Collect data from the web",
    phrase: "collect data from websites",
    tone: "sand",
    blurb: "Reliable scraping, form filling and data extraction, cleaned and ready to use.",
    aliases: ["scraping", "scraper", "extraction", "forms", "web", "monitoring"],
  },
  app: {
    answer: "A custom AI app wraps an automation in a proper product: login, database, dashboard and an interface your team or customers use. I build web apps and dashboards, and iOS and Android apps with React Native and Expo.",
    faq: [
      {
            "q": "Do you build mobile apps?",
            "a": "Yes. I built the 5dot app for iOS and Android with React Native and Expo, including sign-in with Apple and Google, push notifications, and the build and release pipeline for both app stores."
      },
      {
            "q": "Do you build web dashboards and admin panels?",
            "a": "Yes, with React and Vite on Supabase for login and data. Examples include a marketing and sales analytics dashboard and an operations dashboard for AI workflows."
      },
      {
            "q": "Can you add AI search to an app?",
            "a": "Yes. In my knowledge-base editor, embeddings are created automatically whenever a document is saved, so everything is searchable by meaning."
      }
],
    seoTitle: "Custom AI App & Dashboard Development",
    seoDescription: "Custom AI app development: React and Supabase web apps and dashboards, plus React Native and Expo mobile apps released to the App Store and Google Play.",
    h1: "A real product around the AI",
    intro: "When an automation needs a proper interface, I build it: web apps and dashboards with login and a database, and mobile apps for iOS and Android with React Native and Expo, all the way through to the app stores.",
    label: "Build a custom app",
    phrase: "run inside a custom app or dashboard",
    tone: "periwinkle",
    blurb: "A real product around the AI: login, database, dashboard and a clean interface.",
    aliases: ["web app", "dashboard", "saas", "full stack", "frontend", "backend", "software"],
  },
  models: {
    answer: "Custom AI model work is for problems that off-the-shelf AI doesn't solve well. I've built a deep-learning pipeline that classifies audio as real or synthetic, using Python, TensorFlow and Librosa.",
    faq: [
      {
            "q": "What kind of models have you built?",
            "a": "A pipeline that detects synthetic, AI-generated audio, written in Python with TensorFlow and Librosa."
      },
      {
            "q": "Have you worked on audio and video deepfake detection?",
            "a": "Yes, on both sides. I built the audio-detection pipeline, and I built the 5dot mobile app that presents audio, video and lip-sync detection results. The detection API behind 5dot was built by a separate backend developer."
      }
],
    seoTitle: "Custom AI Model Development",
    seoDescription: "Custom machine-learning pipelines for problems off-the-shelf AI can't solve, such as detecting AI-generated or synthetic audio.",
    h1: "Custom models when off-the-shelf AI isn't enough",
    intro: "I build models and pipelines for problems standard AI APIs don't handle well, such as detecting AI-generated audio.",
    label: "Custom AI models",
    phrase: "recognise things in audio, video or images",
    tone: "clay",
    blurb: "When off-the-shelf AI isn't accurate enough, a model trained for your problem.",
    aliases: ["machine learning", "deep learning", "classifier", "detection", "computer vision", "deepfake"],
  },
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
  "crm-automation": {
    label: "CRM & Sales Automation",
    aliases: ["crm", "gohighlevel", "ghl", "lead generation", "cold email", "outreach", "pipeline", "follow up", "follow-up", "sales"],
    blurb: "Leads, calls and deals flowing through your CRM automatically, with nothing falling through the cracks.",
  },
  "mobile-apps": {
    label: "Mobile Apps",
    aliases: ["mobile", "ios", "android", "app store", "google play", "react native", "expo", "push notifications"],
    blurb: "iOS and Android apps built, signed and released through both app stores.",
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
  legal: { label: "Legal", aliases: ["law", "contracts", "contract review", "compliance"] },
  events: { label: "Events & Ticketing", aliases: ["event", "ticketing", "tickets", "instagram"] },
  construction: { label: "Construction & Design", aliases: ["design build", "contractor", "renovation", "home services"] },
  "professional-services": { label: "Professional Services", aliases: ["agency", "consulting", "legal"] },
  media: { label: "Media & Security", aliases: ["deepfake", "video", "audio", "trust and safety"] },
  other: { label: "Other" },
};

export type TechGroup = "AI & LLM" | "Automation" | "Backend" | "Frontend" | "Data" | "Apps & APIs" | "Cloud & Tools";

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
  expo: { label: "Expo", group: "Frontend", aliases: ["react native", "eas", "ios", "android", "mobile"] },
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
  shopify: { label: "Shopify API", group: "Apps & APIs", aliases: ["ecommerce"] },
  "amazon-sp-api": { label: "Amazon API", group: "Apps & APIs", aliases: ["amazon", "fba", "fbm"] },
  "ebay-api": { label: "eBay API", group: "Apps & APIs", aliases: ["ebay"] },
  apollo: { label: "Apollo.io", group: "Apps & APIs", aliases: ["lead enrichment", "prospecting"] },
  instantly: { label: "Instantly", group: "Apps & APIs", aliases: ["cold email", "outreach"] },
  "google-sheets": { label: "Google Sheets", group: "Apps & APIs", aliases: ["sheets", "spreadsheet", "gsheets"] },
  "google-apps-script": { label: "Apps Script", group: "Apps & APIs", aliases: ["google apps script", "gas"] },
  "google-drive": { label: "Google Drive", group: "Apps & APIs" },
  gmail: { label: "Gmail", group: "Apps & APIs", aliases: ["email"] },
  outlook: { label: "Outlook", group: "Apps & APIs", aliases: ["microsoft", "email"] },
  "microsoft-teams": { label: "Microsoft Teams", group: "Apps & APIs", aliases: ["teams", "microsoft"] },
  slack: { label: "Slack", group: "Apps & APIs" },
  asana: { label: "Asana", group: "Apps & APIs" },
  monday: { label: "Monday.com", group: "Apps & APIs", aliases: ["monday crm"] },
  smartsuite: { label: "SmartSuite", group: "Apps & APIs" },
  wordpress: { label: "WordPress", group: "Apps & APIs", aliases: ["wp"] },
  "instagram-api": { label: "Instagram API", group: "Apps & APIs", aliases: ["instagram", "meta", "graph api"] },
  "facebook-api": { label: "Facebook API", group: "Apps & APIs", aliases: ["facebook", "meta", "graph api"] },
  "linkedin-api": { label: "LinkedIn API", group: "Apps & APIs", aliases: ["linkedin"] },
  webinarjam: { label: "WebinarJam", group: "Apps & APIs", aliases: ["webinar"] },
  fathom: { label: "Fathom", group: "Apps & APIs", aliases: ["call recording", "transcripts"] },
  apify: { label: "Apify", group: "Data", aliases: ["scraping", "actors", "web scraping"] },
  browserless: { label: "Browserless", group: "Data", aliases: ["headless browser", "scraping", "browser automation"] },
  beautifulsoup: { label: "BeautifulSoup", group: "Data", aliases: ["scraping", "bs4"] },
  spacy: { label: "spaCy", group: "AI & LLM", aliases: ["nlp"] },
  mistral: { label: "Mistral", group: "AI & LLM", aliases: ["llm"] },
  lakera: { label: "Lakera Guard", group: "AI & LLM", aliases: ["guardrails", "safety", "moderation"] },
  vite: { label: "Vite", group: "Frontend" },
  tailwind: { label: "Tailwind CSS", group: "Frontend", aliases: ["tailwindcss"] },
  tiptap: { label: "TipTap", group: "Frontend", aliases: ["rich text editor", "editor"] },
  firebase: { label: "Firebase", group: "Cloud & Tools", aliases: ["analytics", "remote config", "push notifications", "crashlytics"] },
  vercel: { label: "Vercel", group: "Cloud & Tools" },
  hubspot: { label: "HubSpot", group: "Apps & APIs", aliases: ["crm"] },
  gohighlevel: { label: "GoHighLevel", group: "Apps & APIs", aliases: ["ghl", "highlevel", "crm"] },
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
