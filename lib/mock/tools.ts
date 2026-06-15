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
    url: "https://genai.af.mil",
    badge: "DAF Official",
    icon: "🛡️",
  },
  {
    id: "t2",
    name: "NIPRGPT",
    tagline: "Unclassified GPT for AF Personnel",
    description:
      "A government-hosted ChatGPT-style interface approved for NIPR use. Good for drafting documents, summarizing regulations, and answering technical questions without sending data to commercial cloud.",
    accessLevel: "NIPR",
    useCases: ["Writing", "Research"],
    url: "https://niprgpt.mil",
    badge: "Gov Hosted",
    icon: "🤖",
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
  },
  {
    id: "t4",
    name: "Claude (Anthropic)",
    tagline: "Advanced Reasoning & Long Documents",
    description:
      "Excellent for complex analysis, summarizing long documents, and nuanced writing tasks. Claude handles 200K+ token context windows — paste in entire regulations, manuals, or reports for analysis. For unclassified/personal use only.",
    accessLevel: "Commercial",
    useCases: ["Writing", "Research", "Briefings"],
    url: "https://claude.ai",
    icon: "🧠",
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
  },
  {
    id: "t7",
    name: "Adobe Firefly",
    tagline: "Professional AI Image Generation",
    description:
      "Adobe's AI image generator, trained on licensed content — making it safer for official use than some alternatives. Create illustrations, edit photos, and generate graphics for publications and outreach.",
    accessLevel: "Commercial",
    useCases: ["Images"],
    url: "https://firefly.adobe.com",
    icon: "🔥",
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
  },
  {
    id: "t11",
    name: "Grammarly",
    tagline: "AI Writing Assistant",
    description:
      "Goes beyond spellcheck — Grammarly analyzes tone, clarity, and formality. The 'Formal' mode helps ensure emails, memos, and reports meet professional military writing standards.",
    accessLevel: "Commercial",
    useCases: ["Writing"],
    url: "https://grammarly.com",
    icon: "✏️",
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
  },
];

export const USE_CASES: UseCase[] = ["Writing", "Research", "Images", "Code", "Transcription", "Briefings", "Data", "Video"];
export const ACCESS_LEVELS: AccessLevel[] = ["NIPR", "Commercial", "Both"];
