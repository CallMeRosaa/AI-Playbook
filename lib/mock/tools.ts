export type AccessLevel = "NIPR" | "Commercial" | "Both";
export type UseCase =
  | "Writing" | "Research" | "Images" | "Code" | "Transcription" | "Briefings" | "Data" | "Video"
  | "Automation" | "Dashboards" | "Apps" | "Forms";
export type Section = "ai" | "automation" | "data" | "digital" | "soon";

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  section: Section;
  accessLevel: AccessLevel;
  useCases: UseCase[];
  url: string;
  badge?: string;
  icon: string;
  inDevelopment?: boolean;
  // Can an Airman reach this directly from a personal phone browser?
  //   true  → render a direct link button.
  //   false → desktop / NIPR only → render a "Send to me" button (Inc 2 relay stub).
  accessibleMobile: boolean;
}

// Ordered — drives section render order and headers on the Tools page.
export const SECTIONS: { id: Section; label: string; blurb: string }[] = [
  { id: "ai",         label: "AI",                blurb: "Frontier AI to draft, research, and decide faster." },
  { id: "automation", label: "Automation",        blurb: "Stop doing it by hand — let workflows run the busywork." },
  { id: "data",       label: "Data & Databases",  blurb: "Turn trackers and spreadsheets into living data." },
  { id: "digital",    label: "Digital Workspace", blurb: "Collect, store, and share — without the paper." },
  { id: "soon",       label: "Coming Soon",       blurb: "Announced — verify availability in your tenant." },
];

export const TOOLS: Tool[] = [
  // ── AI · official (NIPR / CAC) ──────────────────────────────────────────
  {
    id: "t1",
    name: "GenAI.mil",
    tagline: "DoD Enterprise AI Platform (CDAO)",
    description:
      "The Department of War's enterprise generative AI platform, run by the CDAO and adopted across the DAF, giving roughly 3 million personnel frontier AI for unclassified (CUI) work in a FedRAMP High / IL5 environment. Choose from multiple models — Google Gemini for Government (launch model), xAI's Grok, and OpenAI's ChatGPT — to draft and summarize documents, generate images with Gemini's Nano Banana, run enterprise search, and build no-code AI agents with Agent Builder, then export your work to PDF, DOCX, Markdown, or JSON. Your data stays in the government environment and is never used to train vendors' public models. The easiest on-ramp — start here for official, unclassified work.",
    section: "ai",
    accessLevel: "NIPR",
    useCases: ["Writing", "Research", "Images", "Briefings", "Data"],
    url: "https://genai.mil",
    badge: "DAF Official",
    icon: "🛡️",
    accessibleMobile: false,
  },
  // TODO(user): confirm the exact CAC-gated Ask Sage URL for the Inc 2 relay.
  {
    id: "t15",
    name: "Ask Sage",
    tagline: "Multi-Model AI in an IL5 Environment",
    description:
      "A government-focused generative AI platform running in an IL5 environment with 150+ AI models and a robust no-code Agent Builder for multi-step workflows. More powerful and technical than GenAI.mil, but usage is metered — token allotments vary by org, so check your access — and onboarding has more barriers. NIPR-only and CAC-gated.",
    section: "ai",
    accessLevel: "NIPR",
    useCases: ["Writing", "Research", "Data"],
    url: "https://chat.asksage.ai",
    badge: "NIPR · CAC",
    icon: "🧭",
    accessibleMobile: false,
  },
  // TODO(user): confirm OpenAFI access level (outbound link card).
  {
    id: "t16",
    name: "OpenAFI",
    tagline: "AI Help for Air Force Instructions",
    description:
      "An outbound resource for navigating and understanding Air Force Instructions with AI assistance. Always verify against the current certified publication on AF e-Publishing before citing in official work.",
    section: "ai",
    accessLevel: "Both",
    useCases: ["Research"],
    url: "https://openafi.com/chat",
    badge: "Outbound",
    icon: "📖",
    accessibleMobile: true,
  },

  // ── AI · personal (Commercial — personal devices only) ──────────────────
  {
    id: "t5",
    name: "ChatGPT",
    tagline: "General-Purpose AI Assistant",
    description:
      "OpenAI's widely known AI chat tool and a strong all-rounder — writing, coding, brainstorming, and Q&A. A great place to start building everyday AI habits. Personal use only; never enter CUI, PII, or classified information.",
    section: "ai",
    accessLevel: "Commercial",
    useCases: ["Writing", "Research", "Code"],
    url: "https://chatgpt.com",
    icon: "💬",
    accessibleMobile: true,
  },
  {
    id: "t17",
    name: "Claude",
    tagline: "AI for Writing, Analysis & Building",
    description:
      "Anthropic's AI assistant — strong at writing, analysis, and coding. Use Artifacts and Claude's design features to build documents, visuals, and small interactive apps right in the chat. Excellent for learning more advanced AI workflows. Personal use only; never enter CUI, PII, or classified information.",
    section: "ai",
    accessLevel: "Commercial",
    useCases: ["Writing", "Research", "Code"],
    url: "https://claude.ai",
    icon: "✳️",
    accessibleMobile: true,
  },
  {
    id: "t18",
    name: "Gemini",
    tagline: "Google's Multimodal AI",
    description:
      "Google's multimodal assistant — text, image generation, and research grounded in Google Search. Tight integration with Google's tools makes it handy for everyday tasks. Personal use only; never enter CUI, PII, or classified information.",
    section: "ai",
    accessLevel: "Commercial",
    useCases: ["Writing", "Research", "Images"],
    url: "https://gemini.google.com",
    icon: "✨",
    accessibleMobile: true,
  },
  {
    id: "t19",
    name: "Grok",
    tagline: "Real-Time AI from xAI",
    description:
      "xAI's assistant with real-time web and X knowledge, image generation (Grok Imagine), and coding help. Good for current-events questions and quick creative work. Personal use only; never enter CUI, PII, or classified information.",
    section: "ai",
    accessLevel: "Commercial",
    useCases: ["Writing", "Research", "Images"],
    url: "https://grok.com",
    icon: "🤖",
    accessibleMobile: true,
  },
  {
    id: "t20",
    name: "NotebookLM",
    tagline: "Source-Grounded Research Assistant",
    description:
      "Upload your own sources and get answers grounded only in them, with inline citations — plus Audio and Video Overviews, mind maps, and study aids. Excellent for digesting long documents and learning. Personal use only; never upload CUI, PII, or classified information.",
    section: "ai",
    accessLevel: "Commercial",
    useCases: ["Research", "Briefings"],
    url: "https://notebooklm.google.com",
    icon: "📓",
    accessibleMobile: true,
  },

  // ── Automation (M365 Power Platform · NIPR) ─────────────────────────────
  // TODO(user): confirm DoD365 maker URLs for your tenant.
  {
    id: "t22",
    name: "Power Automate",
    tagline: "Automate the busywork",
    description:
      "Build no-code \"flows\" that route approvals (leave, awards, travel), move files, and send reminders automatically — kill the manual chasing and status-tracking. Copilot can draft a flow from a plain-English description. (Premium connectors and Dataverse flows need extra licensing.)",
    section: "automation",
    accessLevel: "NIPR",
    useCases: ["Automation"],
    url: "https://make.gov.powerautomate.us",
    badge: "M365",
    icon: "⚙️",
    accessibleMobile: false,
  },
  {
    id: "t23",
    name: "Power Apps",
    tagline: "Build apps without code",
    description:
      "Turn a spreadsheet or SharePoint List into a real phone/desktop app with forms and logic — replace a paper in-processing checklist or an Excel equipment tracker. Copilot can generate a starter app from a description. (Dataverse/premium-connector apps need extra licensing.)",
    section: "automation",
    accessLevel: "NIPR",
    useCases: ["Apps", "Automation"],
    url: "https://make.gov.powerapps.us",
    badge: "M365",
    icon: "🧩",
    accessibleMobile: false,
  },

  // ── Data & Databases (NIPR) ─────────────────────────────────────────────
  // TODO(user): confirm the Envision login URL.
  {
    id: "t14",
    name: "Envision",
    tagline: "Enterprise DAF Data & AI Platform",
    description:
      "An enterprise DAF-level platform powered by Palantir (Foundry / AIP), open to anyone with a CAC just by logging in. Unlike chat tools, Envision is an integration platform: it connects DAF data sources so you can build your own AI apps and chatbots grounded on that data. Example: an HR-publications bot — an AI model wired to all e-pubs and regs — that answers straight from the source. The most powerful platform here for data-driven AI.",
    section: "data",
    accessLevel: "NIPR",
    useCases: ["Data", "Research"],
    url: "",
    badge: "Palantir AIP",
    icon: "🔭",
    accessibleMobile: false,
  },
  {
    id: "t24",
    name: "Power BI",
    tagline: "Live dashboards from data",
    description:
      "Point it at a tracker and get an auto-refreshing, interactive leadership dashboard instead of rebuilding weekly slides by hand. (Power BI is available on NIPR; Copilot-in-Power-BI at DoD is not yet confirmed — verify locally.)",
    section: "data",
    accessLevel: "NIPR",
    useCases: ["Dashboards", "Data"],
    url: "https://app.powerbigov.us",
    badge: "M365",
    icon: "📊",
    accessibleMobile: false,
  },
  {
    id: "t25",
    name: "Microsoft Lists / SharePoint Lists",
    tagline: "Smart trackers, shared",
    description:
      "One structured, shared tracker for tasks, assets, and statuses — with views, rules, and reminders — instead of an emailed Excel file. (Lists and SharePoint lists are the same underlying data.) It's the free data layer that Power Apps, Power Automate, and Power BI build on.",
    section: "data",
    accessLevel: "NIPR",
    useCases: ["Data"],
    url: "https://www.microsoft365.us",
    badge: "M365",
    icon: "📋",
    accessibleMobile: false,
  },
  {
    id: "t26",
    name: "Dataverse",
    tagline: "Power Platform's real database",
    description:
      "The secure relational database behind advanced Power Platform apps — for complex related data, roles, and business rules well beyond what a List handles. Advanced: it's premium-licensed (not free like Lists), so confirm your entitlement before building on it.",
    section: "data",
    accessLevel: "NIPR",
    useCases: ["Data"],
    url: "https://make.gov.powerapps.us",
    badge: "Advanced",
    icon: "🗄️",
    accessibleMobile: false,
  },

  // ── Digital Workspace (NIPR) ────────────────────────────────────────────
  // TODO(user): SharePoint/Forms URLs are tenant-specific — confirm for your unit.
  {
    id: "t27",
    name: "SharePoint",
    tagline: "Your team's home base",
    description:
      "Team sites and versioned document libraries — one source of truth for SOPs, docs, and trackers instead of scattered shared drives. It's the backbone behind Teams, Lists, Power Apps, and Power Automate.",
    section: "digital",
    accessLevel: "NIPR",
    useCases: ["Data"],
    url: "https://www.microsoft365.us",
    badge: "M365",
    icon: "🗂️",
    accessibleMobile: false,
  },
  {
    id: "t28",
    name: "Microsoft Forms",
    tagline: "Surveys and intake forms",
    description:
      "Stand up a survey or intake form in minutes; responses land in Excel/Lists automatically and can trigger a Power Automate flow to route and log them — goodbye paper. (Gov clouds disable a few extras like email notifications and external sharing.)",
    section: "digital",
    accessLevel: "NIPR",
    useCases: ["Forms", "Data"],
    url: "https://forms.office.com",
    badge: "M365",
    icon: "📝",
    accessibleMobile: false,
  },

  // ── Coming Soon ─────────────────────────────────────────────────────────
  {
    id: "t21",
    name: "NotebookLM on GenAI.mil",
    tagline: "Source-Grounded Research, on NIPR",
    description:
      "Reportedly arriving in the GenAI.mil enterprise suite via CDAO — a NIPR, source-grounded research tool that answers from your provided sources with citations. Listed here pending official confirmation; verify availability locally.",
    section: "soon",
    accessLevel: "NIPR",
    useCases: ["Research", "Briefings"],
    url: "",
    badge: "Coming Soon",
    icon: "📓",
    inDevelopment: true,
    accessibleMobile: false,
  },
  {
    id: "t29",
    name: "Copilot Studio",
    tagline: "Build your own chatbot",
    description:
      "A no-code builder for custom AI agents that answer from your unit's docs and policies and take action via flows — for example, a help-desk bot for routine member questions. Available in GCC High today; DoD (IL5) availability isn't confirmed yet — verify in your tenant.",
    section: "soon",
    accessLevel: "NIPR",
    useCases: ["Automation", "Apps"],
    url: "",
    badge: "Coming Soon",
    icon: "🛠️",
    inDevelopment: true,
    accessibleMobile: false,
  },
];

export const USE_CASES: UseCase[] = ["Writing", "Research", "Images", "Code", "Transcription", "Briefings", "Data", "Video", "Automation", "Dashboards", "Apps", "Forms"];
export const ACCESS_LEVELS: AccessLevel[] = ["NIPR", "Commercial", "Both"];
