import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    rank,
    afsc,
    jobTitle,
    dailyTasks,
    biggestGrind,
    publications,
    additionalDutyLabels,
    aiStyle,
  } = body;

  const dutiesSection =
    additionalDutyLabels?.length > 0
      ? `ADDITIONAL PROGRAMS THEY MANAGE:\n${(additionalDutyLabels as string[]).map((d: string) => `- ${d}`).join("\n")}`
      : "ADDITIONAL PROGRAMS: None specified";

  const pubsSection = publications?.trim()
    ? `KEY PUBLICATIONS THEY REFERENCE:\n${publications.trim()}`
    : "KEY PUBLICATIONS: None specified";

  const userMessage = `
Create a personal AI context file for an Airman based on their interview below. Use their actual words and phrasing where possible — this should sound like them, not HR.

RANK & AFSC: ${rank} / ${afsc}
JOB TITLE: ${jobTitle}

THEIR DAILY TASKS (in their words):
"${dailyTasks}"

THEIR BIGGEST TIME DRAIN:
"${biggestGrind}"

${pubsSection}

${dutiesSection}

PREFERRED AI RESPONSE STYLE:
${aiStyle}

Generate a focused, practical AI context file in markdown format. Under 400 words total.
`.trim();

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: `You are building a personal AI context file for an Air Force Airman. This file gets pasted at the start of AI chat sessions so the AI immediately understands who they are and how to support them on the job.

Generate a markdown-formatted context file with exactly these sections:

1. A header line: # [Rank] [AFSC] — [Job Title]
2. ## My Role — 1-2 sentences max, first person, describing what they do
3. ## What I Do Every Day — 3-5 tight bullets from their daily tasks, using their own words and phrasing
4. ## Where I Need Help Most — their biggest time drain reframed as a direct ask to the AI
5. ## Publications I Work From — bullet list of AFIs/TOs with a one-line note on what each covers (omit this section entirely if none were provided)
6. ## Additional Programs I Manage — bullet list of their additional duties with a one-line note on what that responsibility entails (omit this section entirely if none were provided)
7. ## How I Want You to Respond — their preferred style written as a direct command to any AI reading this file

Rules:
- First person throughout
- Task-focused and practical — no fluff, no corporate-speak
- Use their actual words when describing daily tasks and pain points
- "How I Want You to Respond" must read as a direct instruction, not a description (e.g. "Lead with the bottom line. Use bullets. Skip the intro paragraph.")
- Do not add sections beyond what is listed above`,
    messages: [{ role: "user", content: userMessage }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "Unexpected response from AI" }, { status: 500 });
  }

  return NextResponse.json({ persona: content.text });
}
