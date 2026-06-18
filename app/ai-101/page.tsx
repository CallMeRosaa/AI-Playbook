"use client";

import { Brain, Scale, AlertTriangle, MessageSquare, ShieldAlert, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function AI101Page() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="hero-af text-white px-5 pt-5 pb-5">
        <div className="flex items-center gap-3 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/af-symbol-white.svg" alt="U.S. Air Force" className="h-6 flex-shrink-0" draggable={false} />
          <div className="w-px h-5 bg-silver/40 flex-shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-on-dark-dim">Airman&apos;s Playbook</span>
        </div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider mb-1">AI 101</h1>
        <p className="text-sm text-on-dark leading-relaxed">
          The fastest way to learn this is to use it. Start here, then go run your first play. You can&apos;t break anything at IL2.
        </p>
      </div>

      <div className="h-px bg-silver-mid" />

      <div className="px-4 pt-5 flex flex-col gap-5 pb-6">
        {/* Rationale */}
        {/* CONFIRM exact survey name with Mike before coordination; keep generic for now */}
        <p className="text-xs text-gray-500">51% of surveyed Airmen asked for short tutorial videos.</p>

        {/* 1. What this actually is */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <Brain size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-primary-dark">What this actually is</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  It predicts text from patterns it learned. It is not a search engine, it is not always right, and it is not sentient. Treat it like a fast, confident drafting partner that still needs a check.
                </p>
              </div>
            </div>
            {/* Video 1 — IBM Technology explainer, privacy domain only */}
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

        {/* 2. What it's good at, what it's not */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <Scale size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-primary-dark">What it&apos;s good at, what it&apos;s not</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Good at drafting, summarizing, reformatting, and brainstorming. Always verify facts, numbers, citations, and anything current. Never feed it classified, CUI, or PII.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Hallucination — keystone */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-warm/10 border border-warm/30">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-warm/20 flex items-center justify-center">
                  <AlertTriangle size={18} className="text-warm-dark" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-primary-dark">Hallucination</h2>
                <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">
                  It can state wrong things with total confidence. That is why every output gets verified before you use it. This is the keystone concept. Internalize it and the rest follows.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4. How to talk to it */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-primary-dark">How to talk to it</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Give it a role, the context, the task, and the format you want, then iterate. Be specific about what good looks like. The clearer your ask, the better the draft.
                </p>
              </div>
            </div>
            {/* VIDEO 2 TBD: IBM Technology prompting explainer, link confirmed at build. Do NOT invent a YouTube ID. */}
            <div className="aspect-video w-full rounded-inner border border-dashed border-silver-mid bg-silver-tint flex items-center justify-center mt-3">
              <p className="text-xs text-silver font-medium">Video coming soon</p>
            </div>
          </div>
        </ScrollReveal>

        {/* 5. The non-negotiables */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-danger-tint/50 border border-danger/30">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-danger/10 flex items-center justify-center">
                  <ShieldAlert size={18} className="text-danger-mid" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-primary-dark">The non-negotiables</h2>
                <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">
                  Use approved tools only. Never put PII, CUI, or classified into an unapproved tool. You own and verify every output that leaves your hands.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 6. It's a tool, not your replacement */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center">
                  <Clock size={18} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-primary-dark">It&apos;s a tool, not your replacement</h2>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  It reclaims hours on routine work so you spend more time on judgment. It does not do your job and it does not make your decisions. You stay in command of the call.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
