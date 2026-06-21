export type AccessLevel = "NIPR" | "Commercial" | "Both";
export type UseCase = "Writing" | "Research" | "Images" | "Code" | "Transcription" | "Briefings" | "Data" | "Video";

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
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

export const TOOLS: Tool[] = [
  {
    id: "t1",
    name: "GenAI.mil",
    tagline: "Official DAF AI Platform",
    description:
      "The Department of the Air Force's official generative AI platform for unclassified use on NIPR. Powered by commercial LLMs, approved for government sensitive work. Start here for all official AI tasks.",
    accessLevel: "NIPR",
    useCases: ["Writing", "Research", "Briefings"],
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
      "A government-focused generative AI platform running in an IL5 environment with a wide range of AI models and the ability to build solid workflows. NIPR-only and CAC-gated. Usage is metered, so it costs money to run — but registering with your .mil address grants a monthly token allotment.",
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
    accessLevel: "Both",
    useCases: ["Research"],
    url: "https://openafi.com/chat",
    badge: "Outbound",
    icon: "📖",
    accessibleMobile: true,
  },
  {
    id: "t3",
    name: "Microsoft Copilot (M365)",
    tagline: "AI Built Into Your Office Suite",
    description:
      "AI assistant integrated directly into Word, Outlook, PowerPoint, and Teams. Draft emails, summarize meetings, generate slide decks, and analyze Excel data without leaving your M365 environment.",
    accessLevel: "NIPR",
    useCases: ["Writing", "Briefings", "Data"],
    url: "https://copilot.microsoft.com",
    badge: "M365 Integrated",
    icon: "💼",
    accessibleMobile: false,
  },
  {
    id: "t5",
    name: "ChatGPT",
    tagline: "General-Purpose AI Assistant",
    description:
      "The most widely known AI chat tool. Strong across writing, coding, brainstorming, and Q&A. Use the free tier for general tasks; GPT-4o adds image understanding. Unclassified/personal use only.",
    accessLevel: "Commercial",
    useCases: ["Writing", "Research", "Code"],
    url: "https://chatgpt.com",
    icon: "💬",
    accessibleMobile: true,
  },
  {
    id: "t6",
    name: "Microsoft Designer",
    tagline: "AI-Powered Graphics in Seconds",
    description:
      "Create professional graphics, posters, social media visuals, and presentation slides using text prompts. Ideal for unit branding, recognition boards, and commander's call materials. Integrated with M365.",
    accessLevel: "NIPR",
    useCases: ["Images", "Briefings"],
    url: "https://designer.microsoft.com",
    icon: "🎨",
    accessibleMobile: false,
  },
  {
    id: "t7",
    name: "Adobe Firefly",
    tagline: "Professional AI Image Generation",
    description:
      "Adobe's AI image generator, trained on licensed content, which makes it safer for official use than some alternatives. Create illustrations, edit photos, and generate graphics for publications and outreach.",
    accessLevel: "Commercial",
    useCases: ["Images"],
    url: "https://firefly.adobe.com",
    icon: "🔥",
    accessibleMobile: true,
  },
  {
    id: "t8",
    name: "GitHub Copilot",
    tagline: "AI Pair Programmer",
    description:
      "AI coding assistant that suggests code completions, generates functions from comments, and helps debug. Available in VS Code and JetBrains. Essential for 1Bx, 1Cx cyber/IT AFSCs and data analysts.",
    accessLevel: "Both",
    useCases: ["Code"],
    url: "https://github.com/features/copilot",
    icon: "⌨️",
    accessibleMobile: false,
  },
  {
    id: "t9",
    name: "Otter.ai",
    tagline: "Automatic Meeting Transcription",
    description:
      "Records and transcribes meetings in real time, then generates summaries and action items. Cuts note-taking time to zero. Works with Teams, Zoom, and in-person meetings. For unclassified meetings only.",
    accessLevel: "Commercial",
    useCases: ["Transcription"],
    url: "https://otter.ai",
    icon: "🎙️",
    accessibleMobile: true,
  },
  {
    id: "t10",
    name: "Perplexity AI",
    tagline: "AI-Powered Research with Citations",
    description:
      "Combines AI reasoning with live web search. Unlike ChatGPT, it cites its sources so you can verify information. Great for quickly researching regulations, policy changes, or technical topics.",
    accessLevel: "Commercial",
    useCases: ["Research"],
    url: "https://perplexity.ai",
    icon: "🔍",
    accessibleMobile: true,
  },
  {
    id: "t11",
    name: "Grammarly",
    tagline: "AI Writing Assistant",
    description:
      "Goes beyond spellcheck. Grammarly analyzes tone, clarity, and formality. The 'Formal' mode helps ensure emails, memos, and reports meet professional military writing standards.",
    accessLevel: "Commercial",
    useCases: ["Writing"],
    url: "https://grammarly.com",
    icon: "✏️",
    accessibleMobile: true,
  },
  {
    id: "t13",
    name: "AF e-Publishing (EPUBS)",
    tagline: "Official AF Publication Library",
    description:
      "The authoritative source for all Air Force Instructions (AFIs), Air Force Manuals (AFMANs), Technical Orders (TOs), and pamphlets. Search by publication number or keyword. Always verify you're on the current certified version before citing in official documents.",
    accessLevel: "Both",
    useCases: ["Research"],
    url: "https://www.e-publishing.af.mil",
    badge: "Official AF",
    icon: "📋",
    accessibleMobile: true,
  },
  {
    id: "t12",
    name: "Runway ML",
    tagline: "AI Video Generation & Editing",
    description:
      "Create short video clips, remove backgrounds, edit footage with text commands, and generate b-roll using AI. Useful for PAO, recruiting, and training video production with limited resources.",
    accessLevel: "Commercial",
    useCases: ["Video", "Images"],
    url: "https://runwayml.com",
    icon: "🎬",
    accessibleMobile: true,
  },
  {
    id: "t14",
    name: "Envision",
    tagline: "Advanced DAF Data & AI Platform",
    description:
      "An advanced Department of the Air Force data and AI platform for deeper analytics and model-driven work. It is still rolling out, so access is limited and onboarding is by unit. Treat it as an advanced step beyond GenAI.mil once it is available to you.",
    accessLevel: "NIPR",
    useCases: ["Data", "Research"],
    url: "",
    badge: "In Development",
    icon: "🔭",
    inDevelopment: true,
    accessibleMobile: false,
  },
];

export const USE_CASES: UseCase[] = ["Writing", "Research", "Images", "Code", "Transcription", "Briefings", "Data", "Video"];
export const ACCESS_LEVELS: AccessLevel[] = ["NIPR", "Commercial", "Both"];
