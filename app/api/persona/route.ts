import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { rank, name, afsc, yearsOfService, installation, unit, billet, tasks, tools, aiGoals, tone, outputFormat } = body;

  const userMessage = `
Please create a personal AI context file for the following Airman. This file will be pasted at the start of any AI chat session to give the AI full context about who they are, improving the quality and relevance of responses.

AIRMAN DETAILS:
- Rank: ${rank}
- Name: ${name}
- AFSC: ${afsc}
- Years of Service: ${yearsOfService}
- Installation: ${installation}
- Unit/Organization: ${unit}
- Current Billet/Role: ${billet}
- Top recurring tasks: ${tasks.filter(Boolean).join(", ")}
- Daily tools used: ${tools.join(", ")}
- AI assistance goals: ${aiGoals.join(", ")}
- Preferred tone: ${tone}
- Preferred output format: ${outputFormat}

Generate a well-written, professional AI context file in markdown format. It should feel personal and specific — not generic. Use natural language that the Airman can be proud to show. The file should help any AI tool immediately understand who they are and how to best support them.
`.trim();

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: `You are an Air Force AI adoption expert helping Airmen create personal AI context files — like a professional bio meets a system prompt.

Generate a markdown-formatted context file with these sections:
1. A header with their name, rank, and AFSC
2. ## Who I Am — 2-3 sentences about their background and role
3. ## My Current Assignment — unit, installation, billet
4. ## My Most Important Tasks — 3-5 bullets of their primary responsibilities
5. ## How I Want AI to Help — what they're trying to accomplish with AI, in their own voice
6. ## My Communication Preferences — their preferred tone and output format
7. ## A Note for the AI — a direct instruction to any AI reading this file about how to best support this Airman

Keep it personal, professional, and concise. Under 400 words total. This is their voice, not corporate speak.`,
    messages: [{ role: "user", content: userMessage }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "Unexpected response from AI" }, { status: 500 });
  }

  return NextResponse.json({ persona: content.text });
}
