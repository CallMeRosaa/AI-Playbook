// ── Approved tools roster ───────────────────────────────────────────────────
// EXECUTIVE DECISION (1 Jul 2026): commercial tools are out. Everything listed
// here is approved for official use (verify locally). This removes the
// approved-vs-commercial ambiguity entirely: if it is on this page, it is an
// approved tool. Personal-use commercial tools are deliberately not listed.
//
// Plain-language rule: no Impact Level or compliance jargon (IL2/IL4/IL5,
// FedRAMP, CAC-gated) in any Airman-facing string. Say what it means instead.

export type UseCase =
  | "Writing" | "Research" | "Images" | "Briefings" | "Data"
  | "Automation" | "Dashboards" | "Apps" | "Forms";
export type Section = "ai" | "automation" | "data" | "digital" | "soon";

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  section: Section;
  useCases: UseCase[];
  url: string;
  badge?: string;
  icon: string;
  inDevelopment?: boolean;
  // Can an Airman reach this directly from a personal phone browser?
  //   true  → render a direct "Open tool" link on any device.
  //   false → workstation only → openable in workstation mode; otherwise offer
  //           "Save to your dashboard" so the Airman can run it later at a workstation.
  accessibleMobile: boolean;
}

// Ordered — drives section render order and headers on the Tools page.
export const SECTIONS: { id: Section; label: string; blurb: string }[] = [
  { id: "ai",         label: "Approved AI",       blurb: "Frontier AI, approved for official unclassified work." },
  { id: "automation", label: "Automation",        blurb: "Stop doing it by hand. Let workflows run the busywork." },
  { id: "data",       label: "Data & Databases",  blurb: "Turn trackers and spreadsheets into living data." },
  { id: "digital",    label: "Digital Workspace", blurb: "Collect, store, and share, without the paper." },
  { id: "soon",       label: "Coming Soon",       blurb: "Announced and on the way. Verify availability locally." },
];

export const TOOLS: Tool[] = [
  // ── Approved AI ──────────────────────────────────────────────────────────
  {
    id: "t1",
    name: "GenAI.mil",
    tagline: "DoD Enterprise AI Platform (CDAO)",
    description:
      "The Department's enterprise generative AI platform, run by the CDAO and adopted across the DAF, giving roughly 3 million personnel frontier AI for official unclassified work in a secure government environment. Choose from multiple frontier models to draft and summarize documents, generate images, run enterprise search, and build no-code AI agents, then export your work to PDF, DOCX, Markdown, or JSON. Your data stays in the government environment and is never used to train public models. The easiest on-ramp. Start here for official, unclassified work.",
    section: "ai",
    useCases: ["Writing", "Research", "Images", "Briefings", "Data"],
    url: "https://genai.mil",
    badge: "Start Here",
    icon: "🛡️",
    accessibleMobile: false,
  },
  // TODO(user): confirm the exact Ask Sage URL from a government workstation.
  {
    id: "t15",
    name: "Ask Sage",
    tagline: "Multi-Model AI for Government Work",
    description:
      "A government-focused generative AI platform approved for official unclassified work, with 150+ AI models and a robust no-code Agent Builder for multi-step workflows. More powerful and technical than GenAI.mil, but usage is metered and onboarding has more steps, so check your unit's access first. Government workstation only.",
    section: "ai",
    useCases: ["Writing", "Research", "Data"],
    url: "https://chat.asksage.ai",
    badge: "Advanced",
    icon: "🧭",
    accessibleMobile: false,
  },

  // ── Automation (M365 Power Platform) ─────────────────────────────────────
  // TODO(user): confirm DoD365 maker URLs for your tenant.
  {
    id: "t22",
    name: "Power Automate",
    tagline: "Automate the busywork",
    description:
      "Build no-code flows that route approvals (leave, awards, travel), move files, and send reminders automatically. Kill the manual chasing and status-tracking. Copilot can draft a flow from a plain-English description. (Premium connectors and Dataverse flows need extra licensing.)",
    section: "automation",
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
      "Turn a spreadsheet or SharePoint List into a real phone/desktop app with forms and logic. Replace a paper in-processing checklist or an Excel equipment tracker. Copilot can generate a starter app from a description. (Dataverse/premium-connector apps need extra licensing.)",
    section: "automation",
    useCases: ["Apps", "Automation"],
    url: "https://make.gov.powerapps.us",
    badge: "M365",
    icon: "🧩",
    accessibleMobile: false,
  },

  // ── Data & Databases ─────────────────────────────────────────────────────
  // TODO(user): verify the Envision URL from a CAC-enabled workstation before
  // publishing. It cannot be verified from a commercial network, so the card is
  // kept link-less (Coming soon) until confirmed.
  {
    id: "t14",
    name: "Envision",
    tagline: "Enterprise DAF Data & AI Platform",
    description:
      "The DAF's enterprise data platform, open to Airmen just by logging in from a government workstation. Unlike chat tools, Envision is an integration platform: it connects DAF data sources so you can build apps, analysis, and AI grounded on that data. Example: a publications assistant wired to e-pubs and regs that answers straight from the source. The most powerful platform here for data-driven work.",
    section: "data",
    useCases: ["Data", "Research"],
    url: "",
    badge: "DAF Enterprise",
    icon: "🔭",
    accessibleMobile: false,
  },
  {
    id: "t24",
    name: "Power BI",
    tagline: "Live dashboards from data",
    description:
      "Point it at a tracker and get an auto-refreshing, interactive leadership dashboard instead of rebuilding weekly slides by hand. (Copilot inside Power BI is not confirmed everywhere; verify locally.)",
    section: "data",
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
      "One structured, shared tracker for tasks, assets, and statuses, with views, rules, and reminders, instead of an emailed Excel file. (Lists and SharePoint lists are the same underlying data.) It's the free data layer that Power Apps, Power Automate, and Power BI build on.",
    section: "data",
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
      "The secure relational database behind advanced Power Platform apps, for complex related data, roles, and business rules well beyond what a List handles. Advanced: it's premium-licensed (not free like Lists), so confirm your entitlement before building on it.",
    section: "data",
    useCases: ["Data"],
    url: "https://make.gov.powerapps.us",
    badge: "Advanced",
    icon: "🗄️",
    accessibleMobile: false,
  },

  // ── Digital Workspace ────────────────────────────────────────────────────
  // TODO(user): SharePoint/Forms URLs are tenant-specific — confirm for your unit.
  {
    id: "t27",
    name: "SharePoint",
    tagline: "Your team's home base",
    description:
      "Team sites and versioned document libraries. One source of truth for SOPs, docs, and trackers instead of scattered shared drives. It's the backbone behind Teams, Lists, Power Apps, and Power Automate.",
    section: "digital",
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
      "Stand up a survey or intake form in minutes; responses land in Excel/Lists automatically and can trigger a Power Automate flow to route and log them. Goodbye paper. (Gov clouds disable a few extras like email notifications and external sharing.)",
    section: "digital",
    useCases: ["Forms", "Data"],
    url: "https://forms.office.com",
    badge: "M365",
    icon: "📝",
    accessibleMobile: false,
  },

  // ── Coming Soon ──────────────────────────────────────────────────────────
  // AAA is the enterprise AI schoolhouse arriving on GenAI.mil. The Playbook is
  // the front door and routing layer; AAA is where an Airman goes to actually
  // learn in depth. This card is the baton pass. No live URL yet: honesty over
  // dead links. Flip to live and move into "ai" the day it ships.
  {
    id: "t21",
    name: "AI for All Airmen (AAA)",
    tagline: "Your personal AI tutor, on GenAI.mil",
    description:
      "An Air Force AI schoolhouse arriving on GenAI.mil. It interviews you about your job and experience, then builds a personalized learning roadmap grounded only in Air Force approved sources, with study aids like quizzes, audio overviews, and mind maps. When you're ready to go past a single play and actually build AI fluency, this is the destination. Enterprise release expected this summer; verify availability locally.",
    section: "soon",
    useCases: ["Research", "Briefings"],
    url: "",
    badge: "Coming Soon",
    icon: "🎓",
    inDevelopment: true,
    accessibleMobile: false,
  },
  {
    id: "t29",
    name: "Copilot Studio",
    tagline: "Build your own chatbot",
    description:
      "A no-code builder for custom AI agents that answer from your unit's docs and policies and take action via flows. For example, a help-desk bot for routine member questions. Availability varies by environment; verify in your tenant.",
    section: "soon",
    useCases: ["Automation", "Apps"],
    url: "",
    badge: "Coming Soon",
    icon: "🛠️",
    inDevelopment: true,
    accessibleMobile: false,
  },
];

export const USE_CASES: UseCase[] = ["Writing", "Research", "Images", "Briefings", "Data", "Automation", "Dashboards", "Apps", "Forms"];
