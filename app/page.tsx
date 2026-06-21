"use client";

import Link from "next/link";
import {
  Clock, ArrowRight, Layers, Compass, Bot,
  CheckCircle2, XCircle, Lightbulb, ExternalLink,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useTimeBack, formatTimeBack } from "@/lib/timeBack";
import { SUGGEST_PLAY_FORM_URL } from "@/lib/links";

// ─── How it works — the orientation guide, promoted out of the Guide modal ──────
const steps = [
  {
    icon: Layers,
    title: "Pick your AFSC",
    body: "On the Play Shelf, tap your job. The shelf reorders so your plays surface first, then the universal plays everyone uses.",
  },
  {
    icon: Compass,
    title: "Read the play",
    body: "Each play shows the task, a copyable starter prompt, the approved tool, what to never paste, and the verify step. It is a reference, not a generator.",
  },
  {
    icon: Bot,
    title: "Go run it",
    body: "Copy the starter prompt and run it on the right surface. GenAI.mil is the place to start for official, unclassified work.",
  },
];

// ─── Local, self-reported time-back tally (returning user only) ─────────────────
function TimeReclaimed() {
  const { minutes } = useTimeBack();
  if (minutes <= 0) return null;
  return (
    <ScrollReveal>
      <div className="flex items-center gap-3 p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
        <div className="p-2.5 rounded-inner bg-primary/10 flex-shrink-0">
          <Clock size={18} className="text-primary" />
        </div>
        <div className="min-w-0 text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-silver">Time reclaimed so far</p>
          <p className="text-base font-bold text-primary-dark leading-tight">{formatTimeBack(minutes)}</p>
          <p className="text-[10px] text-gray-400 leading-tight">Self-reported estimate, on this device only.</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

function openGuide() {
  window.dispatchEvent(new Event("ap:open-guide"));
}

// Shared eyebrow label for each front-door section.
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold text-silver uppercase tracking-wider mb-2">{children}</p>;
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero / value-prop landing ── */}
      <div className="relative hero-af text-white px-5 pt-8 pb-10 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none select-none">
          <div className="hero-blob-1 absolute -top-20 -right-20 w-72 h-72 rounded-full" />
          <div className="hero-blob-2 absolute top-8 -left-24 w-56 h-56 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* AF Symbol — authorized white version */}
          <div className="mb-5 mt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/af-symbol-white.svg" alt="U.S. Air Force" className="h-16 mx-auto" draggable={false} />
          </div>

          <div className="w-12 h-px bg-silver mb-5" aria-hidden="true" />

          <h1 className="font-display text-4xl font-black uppercase tracking-wider leading-tight mb-4">
            Airman&apos;s<br />Playbook
          </h1>

          <p className="text-base text-white font-semibold leading-snug max-w-[20rem]">
            An app built for Airmen by Airmen to reclaim hours from routine work and refocus on what matters.
          </p>

          {/* One clear action into the plays */}
          <Link
            href="/plays"
            className="mt-7 inline-flex items-center gap-2 bg-warm text-primary-dark font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-inner shadow-raised active:scale-[0.98] transition-all duration-base ease-smooth"
          >
            Find Your Play
            <ArrowRight size={16} />
          </Link>

          {/* Pathway to the deeper Guide modal (the "?" trigger lives here now) */}
          <button
            onClick={openGuide}
            className="mt-4 text-xs font-semibold text-on-dark underline underline-offset-4 decoration-on-dark/40 hover:text-white transition-colors"
          >
            What is this?
          </button>
        </div>
      </div>

      <div className="h-px bg-silver-mid" />

      {/* ── Front-door content — one rhythm for every section ── */}
      <div className="px-4 pt-5 pb-8 flex flex-col gap-7">
        {/* Returning-user tally (only renders once something is logged) */}
        <TimeReclaimed />

        {/* How it works */}
        <section>
          <ScrollReveal>
            <SectionLabel>How it works</SectionLabel>
          </ScrollReveal>
          <div className="flex flex-col gap-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <ScrollReveal key={title}>
                <div className="flex gap-3 p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center relative">
                      <Icon size={18} className="text-primary" />
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-primary-dark">{title}</h2>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* What this app does / does not do */}
        <section>
          <ScrollReveal>
            <SectionLabel>What this is</SectionLabel>
          </ScrollReveal>
          <div className="flex flex-col gap-3">
            <ScrollReveal>
              <div className="p-4 rounded-card bg-success-tint/60 border border-success/30">
                <p className="flex items-center gap-2 text-xs font-bold text-success-mid uppercase tracking-wide mb-2">
                  <CheckCircle2 size={14} /> What this app does
                </p>
                <ul className="text-xs text-gray-700 leading-relaxed list-disc pl-4 space-y-1">
                  <li>Tells you what AI can do for your specific job.</li>
                  <li>Gives you the safe starting move as a copyable prompt.</li>
                  <li>Routes you to the right surface to actually run it.</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="p-4 rounded-card bg-danger-tint/50 border border-danger/30">
                <p className="flex items-center gap-2 text-xs font-bold text-danger-mid uppercase tracking-wide mb-2">
                  <XCircle size={14} /> What it does not do
                </p>
                <ul className="text-xs text-gray-700 leading-relaxed list-disc pl-4 space-y-1">
                  <li>It does not run a model or generate answers for you.</li>
                  <li>It does not run an interview or hold sensitive data.</li>
                  <li>It is not the system of record. Always verify outputs.</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Suggest a play — SME contribution door */}
        <section>
          <ScrollReveal>
            <SectionLabel>Help build the Playbook</SectionLabel>
          </ScrollReveal>
          <ScrollReveal>
            {SUGGEST_PLAY_FORM_URL ? (
              <a
                href={SUGGEST_PLAY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-card bg-primary text-white shadow-resting active:scale-[0.99] transition-transform"
              >
                <div className="w-9 h-9 rounded-inner bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={18} className="text-warm" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight">Suggest a play</p>
                  <p className="text-xs text-on-dark leading-snug">Know a task AI could speed up? Propose it for the shelf.</p>
                </div>
                <ExternalLink size={16} className="flex-shrink-0 text-white/70" />
              </a>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
                <div className="w-9 h-9 rounded-inner bg-silver-tint flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={18} className="text-silver" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-primary-dark leading-tight">Suggest a play</p>
                  <p className="text-xs text-gray-500 leading-snug">Contribution form opening soon.</p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-badge bg-gray-100 text-gray-500 flex-shrink-0">
                  Coming soon
                </span>
              </div>
            )}
          </ScrollReveal>
        </section>

        {/* OPSEC line — always-visible at the front door */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-warm/10 border border-warm/30">
            <p className="text-xs text-primary-dark leading-relaxed">
              <span className="font-bold">Stay clean at IL2.</span> Never enter classified, CUI, or PII into any AI
              tool. Use generic, unclassified examples, and verify every output before official use.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
