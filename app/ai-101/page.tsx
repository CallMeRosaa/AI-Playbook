"use client";

import { Brain, BrainCircuit, Coins, Layers, Database, MessageSquare, Bot, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function AI101Page() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="hero-af text-white px-5 pt-5 pb-5 overflow-hidden rounded-b-[24px]">
        <div className="flex items-center gap-3 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/af-symbol-white.svg" alt="U.S. Air Force" className="h-6 flex-shrink-0" draggable={false} />
          <div className="w-px h-5 bg-silver/40 flex-shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-on-dark-dim">Airman&apos;s Playbook</span>
        </div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider mb-1">AI 101</h1>
        <p className="text-sm text-on-dark leading-relaxed">
          Start at the top and work down — each idea builds on the one before it. By the end you&apos;ll know enough to go run your first play. You can&apos;t break anything here.
        </p>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-5 pb-6">
        {/* Rationale */}
        {/* CONFIRM exact survey name with Mike before coordination; keep generic for now */}
        <p className="text-xs text-gray-500">51% of surveyed Airmen asked for short tutorial videos. Here&apos;s the ladder, start to finish.</p>

        {/* 1. AI — what it actually is */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <Brain size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Step 1</span>
                <h2 className="text-sm font-bold text-primary-dark">AI — what it actually is</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  It predicts text from patterns it learned. It is not a search engine, it is not always right, and it is not sentient. Treat it like a fast, confident drafting partner that still needs a check.
                </p>
              </div>
            </div>
            {/* Video — IBM Technology explainer */}
            <div className="aspect-video w-full rounded-inner overflow-hidden border border-silver-mid/40 mt-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/qYNweeDHiyU"
                title="AI, Machine Learning, Deep Learning and Generative AI Explained (IBM Technology)"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 2. LLMs — the engine */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <BrainCircuit size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Step 2</span>
                <h2 className="text-sm font-bold text-primary-dark">LLMs — the engine behind it</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  A large language model is trained on huge amounts of text and works by predicting the next word, over and over. ChatGPT, Copilot, and GenAI.mil all run on LLMs — same core idea under the hood.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Tokens */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <Coins size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Step 3</span>
                <h2 className="text-sm font-bold text-primary-dark">Tokens — how it reads and counts</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Models read and write in tokens — chunks of words, not whole sentences. Tokens cost money and take up the model&apos;s limited memory, so tighter prompts and trimmed context go further.
                </p>
              </div>
            </div>
            {/* Video — Token management */}
            <div className="aspect-video w-full rounded-inner overflow-hidden border border-silver-mid/40 mt-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/49V-5Ock8LU"
                title="Tokens and token management explained"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 4. Context windows */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <Layers size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Step 4</span>
                <h2 className="text-sm font-bold text-primary-dark">Context — what it can hold at once</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  The context window is everything the model can see at once — your prompt plus the conversation so far. Once it fills up, the oldest content drops off, so keep what matters in view.
                </p>
              </div>
            </div>
            {/* Video — Context windows */}
            <div className="aspect-video w-full rounded-inner overflow-hidden border border-silver-mid/40 mt-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/-QVoIxEpFkM"
                title="Context windows in LLMs explained"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 5. RAG */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <Database size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Step 5</span>
                <h2 className="text-sm font-bold text-primary-dark">RAG — giving it your sources</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Retrieval-augmented generation lets a model pull in trusted documents at answer time instead of relying only on what it memorized. It&apos;s how you ground answers in your own sources and cut down on hallucination.
                </p>
              </div>
            </div>
            {/* Video — RAG explained */}
            <div className="aspect-video w-full rounded-inner overflow-hidden border border-silver-mid/40 mt-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/UabBYexBD4k"
                title="Retrieval-Augmented Generation (RAG) explained"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 6. Chatbots — how you talk to it */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Step 6</span>
                <h2 className="text-sm font-bold text-primary-dark">Chatbots — how you talk to it</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  A chatbot is the conversational front door to an LLM. Give it a role, the context, the task, and the format you want, then iterate. The clearer your ask, the better the draft.
                </p>
              </div>
            </div>
            {/* Video — Prompt engineering */}
            <div className="aspect-video w-full rounded-inner overflow-hidden border border-silver-mid/40 mt-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/jC4v5AS4RIM"
                title="Prompt Engineering explained"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 7. Agents — AI that takes action */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Step 7</span>
                <h2 className="text-sm font-bold text-primary-dark">Agents — AI that takes action</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Agents go a step past chat: they can use tools, take several steps, and work toward a goal instead of just replying. Powerful — but you still own and verify everything they produce.
                </p>
              </div>
            </div>
            {/* Video — AI agents explained */}
            <div className="aspect-video w-full rounded-inner overflow-hidden border border-silver-mid/40 mt-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/FwOTs4UxQS4"
                title="AI agents explained"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 8. Go deeper — the baton pass to AAA (the enterprise AI schoolhouse) */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-primary/5 border border-primary/25 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Go deeper</span>
                <h2 className="text-sm font-bold text-primary-dark">AI for All Airmen (AAA)</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  This page got you oriented. When you&apos;re ready for real depth, AAA is the Air Force&apos;s AI schoolhouse arriving on GenAI.mil: a personal tutor that learns your job and builds a learning roadmap from Air Force approved sources. The Playbook gets you in the door; AAA takes you the rest of the way. Coming soon, so verify availability locally.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
