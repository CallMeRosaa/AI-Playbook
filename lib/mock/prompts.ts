export type PromptCategory = "Admin" | "Comms" | "Training" | "Operations" | "Logistics" | "Intel";

export interface Prompt {
  id: string;
  title: string;
  category: PromptCategory;
  afscGroup: string;
  timeSaved: string;
  description: string;
  prompt: string;
  sensitive?: true;
}

export const PROMPTS: Prompt[] = [
  // Admin
  {
    id: "a1",
    title: "EPR Bullet Draft",
    category: "Admin",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 30–60 min",
    description: "Transform raw accomplishment notes into polished EPR bullets.",
    prompt: `You are an Air Force EPR writing expert. Draft 5 EPR bullets for the following Airman accomplishments. Each bullet must follow the Impact-Action-Result format, start with a strong action verb, and be under 140 characters. Bold the most impactful metric or result.\n\nAccomplishments:\n[PASTE YOUR NOTES HERE]\n\nRank and AFSC: [E.G., SSgt, 3D1X1]\nUnit mission: [E.G., cyber ops, aircraft maintenance]`,
  },
  {
    id: "a2",
    title: "Award Package Narrative",
    category: "Admin",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 1.5–3 hrs",
    description: "Draft a compelling quarterly award package narrative.",
    prompt: `Write an Air Force quarterly award package narrative for the following Airman. Use formal military writing style. Structure: opening hook, 3 specific accomplishments with quantifiable impact, closing statement on community involvement and leadership potential. Keep under 300 words.\n\nAirman info:\n- Rank/Name: [NAME]\n- AFSC: [AFSC]\n- Award period: [DATES]\n\nKey accomplishments:\n1. [ACCOMPLISHMENT 1]\n2. [ACCOMPLISHMENT 2]\n3. [ACCOMPLISHMENT 3]`,
  },
  {
    id: "a3",
    title: "Performance Feedback Script",
    category: "Admin",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 20–45 min",
    description: "Prepare structured feedback talking points for your Airman.",
    prompt: `Generate a structured Air Force performance feedback session outline for a supervisor to use. Include: opening (set the tone), strengths observed (2-3 areas), areas for improvement (1-2 areas with specific actionable steps), development goals for next period, and closing motivation. Keep tone professional and constructive.\n\nAirman background:\n- Rank/Name: [NAME]\n- Time in unit: [MONTHS]\n- Primary duties: [DUTIES]\n- Notable strengths: [STRENGTHS]\n- Improvement areas: [AREAS]`,
  },
  {
    id: "a4",
    title: "Meeting Agenda Builder",
    category: "Admin",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 10–20 min",
    description: "Generate a professional meeting agenda with time blocks.",
    prompt: `Create a professional Air Force staff meeting agenda. Include time blocks, objective for each agenda item, and who leads each item. Add a parking lot section and action item tracker at the end.\n\nMeeting details:\n- Purpose: [PURPOSE]\n- Duration: [TIME]\n- Attendees: [WHO]\n- Key topics to cover: [TOPICS]`,
  },
  {
    id: "a5",
    title: "OPR Accomplishment Bullets",
    category: "Admin",
    afscGroup: "Officers",
    timeSaved: "Est. 1–1.5 hrs",
    description: "Convert officer achievement notes into OPR-ready bullets.",
    prompt: `You are an Air Force OPR writing expert. Draft 8 OPR accomplishment bullets for the following officer. Each bullet must demonstrate leadership impact, quantify results, and follow DA PAM formatting. Include bullets that show strategic thinking, subordinate development, and mission outcomes.\n\nOfficer: [Rank, Name, AFSC]\nAchievements:\n[LIST ACHIEVEMENTS]`,
  },
  {
    id: "a6",
    title: "BLUF Email Summary",
    category: "Admin",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 15–30 min",
    description: "Summarize long email chains into a crisp BLUF.",
    prompt: `Summarize the following email chain using Air Force BLUF (Bottom Line Up Front) format. Structure: BLUF statement (1-2 sentences), Key Points (3-5 bullets), Required Actions (with who, what, when), and Background context. Use plain language.\n\n[PASTE EMAIL CHAIN HERE]`,
  },

  // Communications
  {
    id: "c1",
    title: "Professional Military Email",
    category: "Comms",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 15–30 min",
    description: "Draft a formal military email to senior leadership.",
    prompt: `Draft a formal Air Force email on the following topic. Use proper military email format: greeting, BLUF paragraph, supporting detail paragraphs, action request, closing with rank and contact info. Tone: professional, direct, and respectful of the reader's time.\n\nSender: [Your rank/name]\nRecipient: [Their rank/role]\nTopic: [DESCRIBE THE TOPIC]\nKey message: [WHAT YOU NEED THEM TO KNOW OR DO]`,
  },
  {
    id: "c2",
    title: "Executive Summary",
    category: "Comms",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 1–1.5 hrs",
    description: "Condense a report or briefing into a 1-page exec summary.",
    prompt: `Write a 1-page executive summary of the following document for a senior Air Force leader. Format: Title, Purpose (1 sentence), Key Findings (3-5 bullets), Recommendations (numbered), Way Ahead. Use concise language — the reader has 2 minutes.\n\n[PASTE OR DESCRIBE YOUR DOCUMENT HERE]`,
  },
  {
    id: "c3",
    title: "Talking Points for Leadership",
    category: "Comms",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 20–45 min",
    description: "Create crisp talking points for a leadership engagement.",
    prompt: `Generate talking points for a leader preparing to brief or discuss the following topic. Format as 5-7 bullet points with a supporting data point or example under each. Include a "what this means for our Airmen" framing. Keep each bullet speakable in under 30 seconds.\n\nTopic: [TOPIC]\nAudience: [WHO THEY ARE]\nKey message to reinforce: [MESSAGE]`,
  },
  {
    id: "c4",
    title: "Congressional/VIP Visit Brief",
    category: "Comms",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 2–4 hrs",
    description: "Draft a mission brief for a distinguished visitor.",
    prompt: `Draft a 5-minute Distinguished Visitor (DV) mission brief outline. Include: unit mission statement, key statistics and accomplishments, current challenges or capability gaps, and one clear ask or message. Assume a non-technical audience. Use the elevator pitch principle — make them care in the first 30 seconds.\n\nUnit: [UNIT NAME]\nMission: [MISSION DESCRIPTION]\nAudience: [VIP TITLE/BACKGROUND]\nKey ask: [WHAT YOU WANT FROM THE VISIT]`,
    sensitive: true,
  },
  {
    id: "c5",
    title: "Change of Command Speech",
    category: "Comms",
    afscGroup: "Officers",
    timeSaved: "Est. 1.5–3 hrs",
    description: "Draft a 5-minute change of command speech.",
    prompt: `Write a 5-minute Change of Command speech for an Air Force officer. Tone: sincere, inspiring, and personal. Structure: opening story or hook, gratitude to family and mentors, honor the outgoing commander's legacy, vision for the unit going forward, call to action for the team. Avoid clichés — make it human and genuine.\n\nIncoming commander: [RANK/NAME]\nUnit: [UNIT]\nNotable accomplishments of the unit: [ACCOMPLISHMENTS]\nPersonal story or theme: [OPTIONAL THEME]`,
  },

  // Training
  {
    id: "t1",
    title: "Training Plan Generator",
    category: "Training",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 1.5–3 hrs",
    description: "Build a structured unit training plan for any topic.",
    prompt: `Create a structured Air Force unit training plan for the following topic. Include: training objective (TLO), enabling learning objectives (ELOs), method of instruction, resources needed, assessment criteria, and a 4-week schedule. Format for easy use by a flight chief or section NCOIC.\n\nTopic: [TRAINING TOPIC]\nTarget audience: [RANK RANGE / AFSC]\nDesired outcome: [WHAT THEY SHOULD BE ABLE TO DO AFTER]\nAvailable resources: [FACILITIES, TIME, EQUIPMENT]`,
  },
  {
    id: "t2",
    title: "Lesson Plan Builder",
    category: "Training",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 1–2 hrs",
    description: "Convert subject matter expertise into a formal AF lesson plan.",
    prompt: `Convert the following subject matter content into a formal Air Force lesson plan. Include: purpose statement, safety/security notes, introduction, body (with check-on-learning questions), conclusion/summary, and evaluation criteria. Use clear language appropriate for E-4 and below.\n\nSubject: [TOPIC]\nTime available: [DURATION]\nContent/notes: [YOUR KNOWLEDGE OR NOTES]\nKey takeaways: [3 MAIN POINTS]`,
  },
  {
    id: "t3",
    title: "Quiz Question Set",
    category: "Training",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 30–60 min",
    description: "Generate a 10-question knowledge check for any AF topic.",
    prompt: `Create 10 multiple-choice knowledge check questions for the following Air Force topic. Each question should have 4 answer choices (A-D) with one correct answer and a brief explanation of why the answer is correct. Include a mix of recall, application, and analysis questions.\n\nTopic: [TRAINING TOPIC]\nSource material: [PASTE KEY CONTENT OR DESCRIBE WHAT WAS COVERED]\nAudience level: [RANK/EXPERIENCE LEVEL]`,
  },
  {
    id: "t4",
    title: "After Action Report (AAR)",
    category: "Training",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 1–1.5 hrs",
    description: "Draft a structured AAR after an exercise or event.",
    prompt: `Draft an Air Force After Action Report (AAR) for the following event. Structure: Event overview, What went well (3-5 points), Areas for improvement (3-5 points), Root causes of issues, Corrective actions with OPR and suspense date, and Lessons learned for future events.\n\nEvent: [NAME AND DATE]\nObjective of the event: [WHAT IT WAS SUPPOSED TO ACCOMPLISH]\nParticipants: [HOW MANY, UNITS]\nWhat happened: [BRIEF SUMMARY]\nKnown issues: [PROBLEMS THAT OCCURRED]`,
  },
  {
    id: "t5",
    title: "Professional Development Reading List",
    category: "Training",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 20–45 min",
    description: "Build a tailored PD reading list for an Airman or unit.",
    prompt: `Create a professional development reading list for the following Airman profile. Include 8-10 books with a 2-sentence summary of each and why it's relevant to their career stage and goals. Group by theme: leadership, technical/AFSC, strategic thinking, and personal resilience.\n\nAirman profile:\n- Rank: [RANK]\n- AFSC: [AFSC]\n- Career goals: [GOALS]\n- Current development focus: [E.G., NCO transition, deployment prep]`,
  },

  // Operations
  {
    id: "o1",
    title: "Risk Assessment Matrix",
    category: "Operations",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 1–1.5 hrs",
    description: "Build a structured operational risk assessment.",
    prompt: `Create an Air Force Operational Risk Management (ORM) risk assessment for the following activity. Use the standard 5-step ORM process: identify hazards, assess hazards (severity × probability), develop controls, implement controls, supervise and evaluate. Format as a table with columns for Hazard, Risk Level, Controls, Residual Risk.\n\nActivity: [DESCRIBE THE OPERATION OR TASK]\nEnvironment: [LOCATION, WEATHER, TIME]\nPersonnel involved: [RANKS/EXPERIENCE LEVELS]\nKnown hazards: [LIST ANY YOU'VE ALREADY IDENTIFIED]`,
    sensitive: true,
  },
  {
    id: "o2",
    title: "CONOP Summary",
    category: "Operations",
    afscGroup: "Operations AFSCs",
    timeSaved: "Est. 1.5–3 hrs",
    description: "Summarize a concept of operations into a 1-page brief.",
    prompt: `Write a concise Concept of Operations (CONOP) summary for senior leadership. Use this structure: Situation, Mission, Concept of Operations (phases), Tasks to subordinate units, Coordinating instructions, Command and Signal. Keep to one page. Assume the reader knows the theater but not the specific plan.\n\nOperation details: [DESCRIBE THE OPERATION]\nObjective: [END STATE]\nPhases: [LIST PHASES IF KNOWN]\nKey constraints: [TIME, RESOURCES, ROE]`,
    sensitive: true,
  },
  {
    id: "o3",
    title: "Standard Operating Procedure",
    category: "Operations",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 2–4 hrs",
    description: "Draft a unit SOP for a recurring task or process.",
    prompt: `Draft a Standard Operating Procedure (SOP) for the following task. Structure: Purpose, Scope, Responsibilities, Step-by-step procedure (numbered), References, and Record keeping. Write clearly enough that a newly assigned Airman could execute the task independently after reading.\n\nTask: [DESCRIBE THE TASK]\nUnit: [UNIT NAME]\nHow it's currently done: [DESCRIBE CURRENT PROCESS]\nCommon mistakes or risks: [KNOWN PITFALLS]`,
    sensitive: true,
  },
  {
    id: "o4",
    title: "Mission Brief Outline",
    category: "Operations",
    afscGroup: "Operations AFSCs",
    timeSaved: "Est. 1–2 hrs",
    description: "Structure a 5-paragraph OPORD-style mission brief.",
    prompt: `Outline a mission brief using the 5-paragraph OPORD format (SMEAC): Situation, Mission, Execution, Administration and Logistics, Command and Signal. Keep each section concise and focused on what the team needs to execute. Identify any branches or sequels.\n\nMission: [DESCRIBE THE MISSION]\nEnvironment: [LOCATION/CONDITIONS]\nFriendly forces: [ASSETS AVAILABLE]\nEnemy/threat: [ADVERSARY OR RISK FACTORS IF APPLICABLE]\nTime constraints: [TIMELINE]`,
    sensitive: true,
  },

  // Logistics
  {
    id: "l1",
    title: "Equipment Shortfall Memo",
    category: "Logistics",
    afscGroup: "Logistics AFSCs",
    timeSaved: "Est. 30–60 min",
    description: "Draft a formal memo documenting an equipment shortfall.",
    prompt: `Write a formal Air Force memorandum documenting an equipment shortfall and requesting resolution. Include: current status (what we have vs. what we need), mission impact of the shortfall, recommended COAs (at least 2), estimated timeline and cost, and a clear action request for the approving authority.\n\nEquipment: [ITEM NAME AND NSN IF KNOWN]\nCurrent quantity: [#]\nRequired quantity: [#]\nMission impact: [HOW THIS AFFECTS THE MISSION]\nOptions considered: [ANY SOLUTIONS EXPLORED]`,
  },
  {
    id: "l2",
    title: "Supply Request Justification",
    category: "Logistics",
    afscGroup: "All AFSCs",
    timeSaved: "Est. 20–45 min",
    description: "Justify a supply or equipment purchase request.",
    prompt: `Write a supply request justification for the following item. Include: description of the need, current workaround and its limitations, benefits of acquiring the item, cost estimate if known, and a clear recommendation. Tailor the language for a resource advisor or financial manager audience.\n\nItem requested: [ITEM]\nUnit: [UNIT]\nWhy it's needed: [JUSTIFICATION]\nCurrent workaround: [HOW IT'S BEING HANDLED NOW]\nEstimated cost: [$ IF KNOWN]`,
  },
  {
    id: "l3",
    title: "Vehicle Inspection Checklist",
    category: "Logistics",
    afscGroup: "Vehicle/Logistics AFSCs",
    timeSaved: "Est. 1–1.5 hrs",
    description: "Generate a thorough vehicle inspection checklist.",
    prompt: `Create a comprehensive vehicle inspection checklist for the following Air Force vehicle type. Organize by: Pre-operation checks, During operation checks, and Post-operation checks. Include safety-critical items, fluid checks, communication equipment, and documentation requirements. Format as a printable checklist with check boxes.\n\nVehicle type: [E.G., HMMWV, 7-ton, fuel truck]\nOperational environment: [GARRISON/DEPLOYED/EXTREME WEATHER]\nMission type: [WHAT IT WILL BE USED FOR]`,
  },

  // Intel
  {
    id: "i1",
    title: "OPSUM Format",
    category: "Intel",
    afscGroup: "Intel AFSCs",
    timeSaved: "Est. 1–1.5 hrs",
    description: "Structure an operations summary from raw reporting.",
    prompt: `Draft an Operations Summary (OPSUM) using the following raw reporting. Use standard intel format: DTG, Classification header, Summary paragraph (BLUF), Key Events (numbered, most significant first), Assessment, and Information Gaps. Keep language precise and unambiguous.\n\nClassification: [UNCLASS/CUI]\nReporting period: [DATES]\nArea of interest: [REGION/UNIT]\nRaw events to summarize:\n[PASTE REPORTING]`,
    sensitive: true,
  },
  {
    id: "i2",
    title: "Threat Brief Outline",
    category: "Intel",
    afscGroup: "Intel AFSCs",
    timeSaved: "Est. 1–2 hrs",
    description: "Structure a threat environment brief for a deploying unit.",
    prompt: `Outline a threat environment brief for a deploying Air Force unit. Structure: Classification, Overview of the operational environment, Threat actors (capabilities, intent, recent activity), Key terrain and infrastructure risks, Recommended force protection measures, and Intelligence gaps. Format for a 10-minute verbal brief.\n\nDestination: [REGION/COUNTRY — UNCLASS ONLY]\nUnit type deploying: [AFSC/MISSION]\nKnown concerns: [ANY SPECIFIC THREATS OR INCIDENTS]\nClassification level: UNCLASS`,
    sensitive: true,
  },
];

export const CATEGORIES: PromptCategory[] = ["Admin", "Comms", "Training", "Operations", "Logistics", "Intel"];
