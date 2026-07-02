// ─── Play shelf data ──────────────────────────────────────────────────────────
// The app renders each play as a REFERENCE CARD. It does not run the interview.
// The promptTemplate is a static, copyable starter: each {{var}} is replaced with
// an uppercase bracket placeholder taken from that question's label
// (e.g. {{finding}} -> [WHAT YOU FOUND]) via renderStarter().
//
// SME-VALIDATION ITEMS: the AFSC codes, nicknames, form numbers, system names, and
// task framing below are illustrative examples for a concept demonstration. They
// must be validated by a subject-matter expert before any official use. This
// content was authored from the existing prompt library because the referenced
// AFSC-PLAYS-CONTENT.md was not present in the repo — see NEXT.md.

export type PlayGroup = "afsc" | "taxer" | "team" | "everyday";

export interface PlayVar {
  key: string;   // matches {{key}} in promptTemplate
  label: string; // rendered as an [UPPERCASE] placeholder in the starter prompt
}

export interface Play {
  id: string;
  title: string;
  task: string;          // one-line task
  group: PlayGroup;
  afsc?: string;         // AFSC tile code this play belongs to (group === "afsc")
  promptTemplate: string;
  vars: PlayVar[];
  approvedTool: string;  // GenAI.mil first
  neverPaste: string;    // safety bar
  verify: string;        // required-looking verify step
  timeBack: string;      // self-reported estimate, always labeled an estimate
}

// ─── AFSC tiles ─────────────────────────────────────────────────────────────
// SME-VALIDATION: codes and nicknames below are examples and need SME confirmation.
export interface AfscTile {
  code: string;
  nickname: string;
}

export const AFSC_TILES: AfscTile[] = [
  { code: "2W0X1", nickname: "AMMO" },
  { code: "2A3X1", nickname: "Crew Chief" },
  { code: "3P0X1", nickname: "Defender" },
  { code: "3F0X1", nickname: "Personnel" },
  { code: "6C0X1", nickname: "Contracting" },
];

// Shared safety + tool lines — kept consistent so the safety message is unmistakable.
const GENAIMIL_FIRST =
  "Start in GenAI.mil. Commonly approved for unclassified official use, verify against your local guidance.";
const NEVER_PASTE_DEFAULT =
  "Never paste classified, CUI, PII, rosters, or mission-specific detail. Use generic, unclassified examples only.";

export const PLAYS: Play[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // AFSC plays
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ammo-1",
    title: "Inventory Discrepancy Memo",
    task: "Turn a count discrepancy into a clean, routed memo.",
    group: "afsc",
    afsc: "2W0X1",
    promptTemplate:
      "Draft a professional Air Force memorandum for record documenting a munitions inventory discrepancy. Use a clear BLUF, then: what was expected vs. what was counted, the suspected cause, immediate corrective action taken, and a recommended way ahead. Keep it factual and unclassified.\n\nWhat the discrepancy was: {{finding}}\nWhen and where it was noticed: {{context}}\nAction already taken: {{action}}",
    vars: [
      { key: "finding", label: "what you found" },
      { key: "context", label: "when and where" },
      { key: "action", label: "action already taken" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Never paste real stock numbers, quantities on hand, storage locations, or account data. Use placeholders.",
    verify: "Confirm every figure and corrective action against your account records before it leaves your hands.",
    timeBack: "Est. about 30 min back",
  },
  {
    id: "crewchief-1",
    title: "Write-Up to Plain-Language Summary",
    task: "Translate a maintenance write-up into a status the whole shift understands.",
    group: "afsc",
    afsc: "2A3X1",
    promptTemplate:
      "Rewrite the following aircraft maintenance note into a short, plain-language status update for a shift change brief. Lead with current aircraft status, then the open discrepancy, what has been done, what is still needed, and the estimated impact to the schedule. Keep it tight enough to read aloud in under a minute.\n\nThe write-up / note: {{note}}\nWhat has been done so far: {{progress}}",
    vars: [
      { key: "note", label: "the write-up" },
      { key: "progress", label: "what has been done" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Never paste tail numbers, unit identifiers, locations, or anything that ties to a specific airframe or mission.",
    verify: "Check the rewritten status against the official forms. The forms are the record, not the summary.",
    timeBack: "Est. about 20 min back",
  },
  {
    id: "defender-1",
    title: "Incident Report Draft",
    task: "Turn rough shift notes into a structured, factual report draft.",
    group: "afsc",
    afsc: "3P0X1",
    promptTemplate:
      "Organize the following rough shift notes into a clear, chronological incident report draft. Use neutral, factual language with no speculation. Structure: summary, timeline of events (time-stamped), persons and assets involved (use generic labels), actions taken, and current status. Flag anything that reads as an assumption rather than an observation.\n\nRough notes: {{notes}}",
    vars: [{ key: "notes", label: "your rough notes" }],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Never paste names, ranks, badge numbers, plate numbers, or any PII. Use generic labels like Subject 1, Vehicle A.",
    verify: "Verify the timeline and every fact against your own notes before entering it into the system of record.",
    timeBack: "Est. about 45 min back",
  },
  {
    id: "personnel-1",
    title: "Customer Inquiry Response",
    task: "Draft a clear, correct answer to a common MPF question.",
    group: "afsc",
    afsc: "3F0X1",
    promptTemplate:
      "Draft a professional, friendly response to an Airman's personnel question. Explain the process in plain steps, note what the member needs to provide, and point them to the right office or system. Keep the tone helpful and the steps numbered. Add a line reminding them to confirm current requirements, since policy changes.\n\nThe question being asked: {{question}}\nWhat you know about the process: {{process}}",
    vars: [
      { key: "question", label: "the question" },
      { key: "process", label: "what you know" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: "Never paste the member's SSN, DoD ID, record details, or any PII. Describe the process generically.",
    verify: "Confirm every step and reference against current policy and the authoritative system before you send it.",
    timeBack: "Est. about 20 min back",
  },
  {
    id: "contracting-1",
    title: "Market Research Summary",
    task: "Shape scattered research notes into a structured summary.",
    group: "afsc",
    afsc: "6C0X1",
    promptTemplate:
      "Summarize the following market research notes into a clean, decision-ready summary. Structure: the requirement in one line, vendors or sources reviewed, price and availability ranges, key findings, and a recommended next step. Keep it neutral and factual, with no commitment language.\n\nThe requirement: {{requirement}}\nWhat your research found: {{research}}",
    vars: [
      { key: "requirement", label: "the requirement" },
      { key: "research", label: "what your research found" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Never paste source-selection sensitive information, proprietary vendor data, or pre-decisional pricing. Generalize.",
    verify: "Validate every figure and source against your file before the summary informs any decision.",
    timeBack: "Est. about 1 hr back",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Universal taxer plays — the admin that taxes everyone, every AFSC
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "taxer-eprs",
    title: "Performance Statement Bullets",
    task: "Turn raw accomplishment notes into tight, formatted bullets.",
    group: "taxer",
    promptTemplate:
      "You are an Air Force writing coach. Draft 5 performance statement bullets from the accomplishments below. Each bullet should follow an action-impact-result shape, start with a strong verb, and stay concise. Keep the language factual and verifiable.\n\nAccomplishments: {{accomplishments}}\nRole and level: {{role}}",
    vars: [
      { key: "accomplishments", label: "your accomplishment notes" },
      { key: "role", label: "your role and level" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Confirm every metric and claim is accurate and supportable before it goes into an official record.",
    timeBack: "Est. about 45 min back",
  },
  {
    id: "taxer-award",
    title: "Award Package Narrative",
    task: "Draft a focused quarterly award narrative.",
    group: "taxer",
    promptTemplate:
      "Write an Air Force award package narrative in formal style. Structure: an opening hook, three specific accomplishments with quantifiable impact, and a closing on leadership and community. Keep it concise and credible.\n\nWho it is for and the period: {{nominee}}\nKey accomplishments: {{accomplishments}}",
    vars: [
      { key: "nominee", label: "nominee and period" },
      { key: "accomplishments", label: "key accomplishments" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Check every figure and accomplishment against the record before submitting the package.",
    timeBack: "Est. about 1.5 hrs back",
  },
  {
    id: "taxer-feedback",
    title: "Feedback Session Prep",
    task: "Build structured talking points for a feedback session.",
    group: "taxer",
    promptTemplate:
      "Generate a structured feedback session outline for a supervisor. Include: an opening to set the tone, two or three observed strengths, one or two improvement areas with concrete next steps, development goals, and a motivating close. Keep the tone professional and constructive.\n\nBackground on the Airman: {{background}}\nStrengths and improvement areas: {{notes}}",
    vars: [
      { key: "background", label: "background on the airman" },
      { key: "notes", label: "strengths and areas" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Review the outline against your own observations. Keep the feedback yours, not the tool's.",
    timeBack: "Est. about 30 min back",
  },
  {
    id: "taxer-extraduty",
    title: "Additional Duty Kickstart",
    task: "Turn a newly assigned extra duty into a 30-day plan you can execute.",
    group: "taxer",
    promptTemplate:
      "I was just assigned an additional duty on top of my primary job. Build me a 30-day kickstart plan. Structure: what this duty typically requires and who typically inspects or checks it, a week-by-week plan for the first 30 days, a running checklist of recurring tasks with suggested frequency, the five questions I should ask the outgoing member or my leadership, and the two or three things people most commonly get wrong in this duty. Keep it practical and unclassified.\n\nThe additional duty: {{duty}}\nWhat I already know or was handed: {{context}}",
    vars: [
      { key: "duty", label: "the additional duty" },
      { key: "context", label: "what you were handed" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Never paste unit-specific inspection results, member names, or program data. Describe the duty generically.",
    verify: "Check the plan against your unit's actual program requirements and your predecessor's continuity binder.",
    timeBack: "Est. about 2 hrs back",
  },
  {
    id: "taxer-bluf",
    title: "BLUF Email Summary",
    task: "Compress a long email chain into a crisp BLUF.",
    group: "taxer",
    promptTemplate:
      "Summarize the email chain below in BLUF format. Structure: a one or two sentence bottom line, key points as bullets, required actions with who and by when, and brief background. Use plain language.\n\nThe email chain (sanitized): {{chain}}",
    vars: [{ key: "chain", label: "the sanitized chain" }],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Strip names, contact info, and any sensitive content before pasting. Summarize the substance, not the people.",
    verify: "Confirm the actions and owners are right before you forward the summary.",
    timeBack: "Est. about 20 min back",
  },
  {
    id: "taxer-agenda",
    title: "Meeting Agenda Builder",
    task: "Generate a clean agenda with time blocks and owners.",
    group: "taxer",
    promptTemplate:
      "Create a professional staff meeting agenda. Include time blocks, an objective for each item, who leads it, and a parking-lot plus action-item tracker at the end.\n\nPurpose and duration: {{purpose}}\nTopics to cover: {{topics}}",
    vars: [
      { key: "purpose", label: "purpose and duration" },
      { key: "topics", label: "topics to cover" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Sanity-check the time blocks and owners against reality before you send the invite.",
    timeBack: "Est. about 15 min back",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Team Execution plays — alignment, decisions, and follow-through
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "team-ambiguous",
    title: "Turn Ambiguous Guidance into an Action Plan",
    task: "Move out on unclear guidance without waiting for perfect clarity.",
    group: "team",
    promptTemplate:
      "Help me turn ambiguous guidance into a practical action plan. Build it with: commander's intent as understood, key assumptions, the decision needed now, actions we can take without additional permission, questions that require clarification, risks and mitigations, a recommended next 24 to 72 hour move, and a short update I can send to leadership.\n\nMission or task: {{task}}\nGuidance received (summarized): {{guidance}}\nKnown facts and unknowns: {{facts}}\nConstraints: {{constraints}}\nRisk if we wait vs. risk if we move: {{risk}}",
    vars: [
      { key: "task", label: "the mission or task" },
      { key: "guidance", label: "guidance received" },
      { key: "facts", label: "knowns and unknowns" },
      { key: "constraints", label: "constraints" },
      { key: "risk", label: "risk of waiting vs. moving" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Never paste operational details, unit identifiers, timelines tied to real missions, or the actual guidance verbatim if it is sensitive. Summarize generically.",
    verify: "Confirm the intent and assumptions with your leadership before anyone executes. The plan is a draft, not an order.",
    timeBack: "Est. about 1 hr back",
  },
  {
    id: "team-commitments",
    title: "Convert a Meeting into Commitments",
    task: "Turn meeting notes into owners, deadlines, and follow-through.",
    group: "team",
    promptTemplate:
      "Turn these meeting notes into a clear commitment tracker. Produce: key decisions made, open issues, action items with owner, due date, and deliverable, dependencies, risks to follow-through, a suggested follow-up message, and a recommended agenda for the next check-in.\n\nObjective of the meeting: {{objective}}\nMeeting notes (sanitized): {{notes}}\nBattle rhythm or deadline, if known: {{rhythm}}",
    vars: [
      { key: "objective", label: "meeting objective" },
      { key: "notes", label: "the sanitized notes" },
      { key: "rhythm", label: "deadline or battle rhythm" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Strip names and contact info; use roles or offices as owners. Never paste sensitive program detail from the notes.",
    verify: "Confirm each owner actually agreed to the action before the tracker goes out under your name.",
    timeBack: "Est. about 30 min back",
  },
  {
    id: "team-conversation",
    title: "Prep a High-Stakes Conversation",
    task: "Plan a difficult professional conversation: clear, calm, mission-focused.",
    group: "team",
    promptTemplate:
      "I need to prepare for a high-stakes professional conversation. Help me build a concise conversation plan that is direct, respectful, and mission-focused. Build it with: the purpose in one sentence, facts I should state (separating observed facts from assumptions), open-ended questions I should ask, the message I need to deliver in direct but professional language, likely reactions and how to handle each, the decision or commitment to ask for before it ends, and a short follow-up note I can send afterward. Keep it candid, calm, and aligned to mission and standards, not emotional.\n\nThe situation (generic, no names): {{situation}}\nThe other party's role: {{role}}\nDesired outcome: {{outcome}}\nConstraints and what makes it difficult: {{concern}}",
    vars: [
      { key: "situation", label: "the situation, generically" },
      { key: "role", label: "their role" },
      { key: "outcome", label: "desired outcome" },
      { key: "concern", label: "constraints and concerns" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Never paste names, ranks with identifying context, personnel actions, medical or family details, or anything from a protected process. Describe people only by generic role.",
    verify: "The plan preps you; the conversation is yours. If it touches discipline, EO, or IG territory, talk to the right office first.",
    timeBack: "Est. about 45 min back",
  },
  {
    id: "team-disagreement",
    title: "Turn Team Disagreement into Decision Options",
    task: "Depersonalize a stuck debate into courses of action.",
    group: "team",
    promptTemplate:
      "Help me turn a team disagreement into clear decision options. Build it with: a neutral problem statement, what each side is optimizing for, valid concerns on each side, hidden assumptions to test, decision criteria, possible courses of action, a recommended path forward, and one paragraph I can use to reset the team conversation.\n\nThe issue: {{issue}}\nPosition A (summarized fairly): {{positionA}}\nPosition B and other views: {{positionB}}\nMission impact and constraints: {{impact}}\nWho decides, if known: {{owner}}",
    vars: [
      { key: "issue", label: "the issue" },
      { key: "positionA", label: "position a" },
      { key: "positionB", label: "position b and others" },
      { key: "impact", label: "impact and constraints" },
      { key: "owner", label: "decision owner" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste:
      "Summarize positions without names. Never paste sensitive program data or anything said in confidence.",
    verify: "Pressure-test the recommended course with the actual decision owner before presenting it as the way forward.",
    timeBack: "Est. about 45 min back",
  },
  {
    id: "team-charter",
    title: "Build a Team Charter for a Short-Fuse Effort",
    task: "Get a tiger team or working group aligned on one page, fast.",
    group: "team",
    promptTemplate:
      "Help me build a one-page team charter for a short-fuse effort. Create it with: purpose, problem statement, desired outcome, roles and responsibilities, decision rights, operating rhythm, communication norms, measures of success, top risks, and the first three actions.\n\nThe effort and deadline: {{effort}}\nMission or problem: {{problem}}\nTeam roles and stakeholders (roles, not names): {{team}}\nConstraints and desired end product: {{constraints}}",
    vars: [
      { key: "effort", label: "effort and deadline" },
      { key: "problem", label: "the problem" },
      { key: "team", label: "roles and stakeholders" },
      { key: "constraints", label: "constraints and product" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Walk the charter with the team and the decision owner; it only counts once they agree to it.",
    timeBack: "Est. about 1 hr back",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Everyday plays — the writing tasks that come up across the week
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "everyday-email",
    title: "Professional Military Email",
    task: "Draft a clear, respectful email to leadership.",
    group: "everyday",
    promptTemplate:
      "Draft a formal Air Force email. Use a greeting, a BLUF paragraph, supporting detail, a clear action request, and a professional close. Tone: direct and respectful of the reader's time.\n\nWho it is to and the topic: {{topic}}\nWhat you need them to know or do: {{message}}",
    vars: [
      { key: "topic", label: "recipient and topic" },
      { key: "message", label: "what you need" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Read it once for tone and accuracy before you hit send. Your name is on it.",
    timeBack: "Est. about 15 min back",
  },
  {
    id: "everyday-execsum",
    title: "One-Page Executive Summary",
    task: "Condense a report into a one-page summary a leader can read in two minutes.",
    group: "everyday",
    promptTemplate:
      "Write a one-page executive summary for a senior leader. Format: title, a one-sentence purpose, three to five key findings, numbered recommendations, and a way ahead. Concise language only.\n\nThe document or topic (sanitized): {{document}}",
    vars: [{ key: "document", label: "the sanitized document" }],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Check the findings and recommendations against the source before the summary stands on its own.",
    timeBack: "Est. about 1 hr back",
  },
  {
    id: "everyday-talkingpoints",
    title: "Talking Points for Leadership",
    task: "Build crisp, speakable talking points for an engagement.",
    group: "everyday",
    promptTemplate:
      "Generate five to seven talking points for a leader on the topic below. Give each a supporting data point or example, include a what-this-means-for-our-Airmen framing, and keep each point speakable in under 30 seconds.\n\nThe topic and audience: {{topic}}\nThe key message to reinforce: {{message}}",
    vars: [
      { key: "topic", label: "topic and audience" },
      { key: "message", label: "key message" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Confirm each data point is accurate before anyone speaks from these.",
    timeBack: "Est. about 30 min back",
  },
  {
    id: "everyday-decisionmemo",
    title: "Decision Memo Draft",
    task: "Shape a recommendation into a clean decision memo.",
    group: "everyday",
    promptTemplate:
      "Draft a decision memo for an approving authority. Structure: the issue in one line, background, two or more courses of action with pros and cons, a recommendation, and a clear approve/disapprove line. Keep it to one page.\n\nThe issue: {{issue}}\nThe options you are weighing: {{options}}",
    vars: [
      { key: "issue", label: "the issue" },
      { key: "options", label: "the options" },
    ],
    approvedTool: GENAIMIL_FIRST,
    neverPaste: NEVER_PASTE_DEFAULT,
    verify: "Validate the facts behind each option before the memo goes up the chain.",
    timeBack: "Est. about 45 min back",
  },
];

// Replace each {{var}} with an uppercase bracket placeholder from the var's label.
export function renderStarter(play: Play): string {
  let out = play.promptTemplate;
  for (const v of play.vars) {
    const placeholder = `[${v.label.toUpperCase()}]`;
    out = out.split(`{{${v.key}}}`).join(placeholder);
  }
  return out;
}

// Order the shelf for a selected AFSC: that AFSC's plays first, then universal
// taxer plays, then everyday plays. With no selection, show taxers first.
export function orderPlays(selectedAfsc: string | null): Play[] {
  const rank = (p: Play): number => {
    if (selectedAfsc && p.group === "afsc" && p.afsc === selectedAfsc) return 0;
    if (p.group === "taxer") return 1;
    if (p.group === "team") return 2;
    if (p.group === "everyday") return 3;
    return 4; // other AFSCs' plays sink to the bottom
  };
  return [...PLAYS].sort((a, b) => rank(a) - rank(b));
}

// Time-back options for the one-tap self-reported capture.
export const TIME_BACK_OPTIONS = [
  { label: "30 min", minutes: 30 },
  { label: "1 hr", minutes: 60 },
  { label: "2+ hrs", minutes: 120 },
];
