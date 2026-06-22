"use client";

import Link from "next/link";
import {
  Clock, ArrowRight, Layers, Wrench, GraduationCap,
  Compass, Bot, CheckCircle2, ShieldCheck, Lightbulb, ExternalLink,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useTimeBack, formatTimeBack } from "@/lib/timeBack";
import { SUGGEST_PLAY_FORM_URL } from "@/lib/links";

// ─── Where do you want to start? — the multi-path router into the app ───────────
const paths = [
  {
    href: "/plays",
    icon: Layers,
    title: "I have a task to speed up",
    body: "Plays for your AFSC and the everyday admin everyone does. Copy a vetted starter prompt and go.",
    primary: true,
  },
  {
    href: "/tools",
    icon: Wrench,
    title: "I need the right tool",
    body: "Browse 18 vetted AI and automation tools — from GenAI.mil to Power Automate — with what's NIPR-approved.",
    primary: false,
  },
  {
    href: "/ai-101",
    icon: GraduationCap,
    title: "I'm new to all this",
    body: "Six quick reads on what AI is, what it's not, and how to stay safe. You can't break anything at IL2.",
    primary: false,
  },
];

// ─── How it works — the universal loop, not just the play flow ──────────────────
const steps = [
  {
    icon: Compass,
    title: "Find your move",
    body: "Pick a play for your job or a tool for the task.",
  },
  {
    icon: Bot,
    title: "Run it on the right surface",
    body: "Copy the starter prompt and run it where it belongs. GenAI.mil is the place to start for official, unclassified work.",
  },
  {
    icon: CheckCircle2,
    title: "Verify before it's official",
    body: "The app never generates or stores anything for you. You own and check every output.",
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

          <h1 className="font-display text-4xl font-black uppercase tracking-wider leading-tight mb-2">
            Airman&apos;s<br />Playbook
          </h1>

          <p className="text-caption font-bold uppercase tracking-widest text-warm mb-4">
            Built for Airmen, by Airmen
          </p>

          <p className="text-base text-white font-semibold leading-snug max-w-[20rem]">
            Your starting point for AI at work. Find the play for your job, the right tool for the task,
            and the safe way to run it.
          </p>

          {/* Pathway to the deeper Guide modal (the "?" trigger lives here now) */}
          <button
            onClick={openGuide}
            className="mt-6 text-xs font-semibold text-on-dark underline underline-offset-4 decoration-on-dark/40 hover:text-white transition-colors"
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

        {/* Where do you want to start? — the multi-path router */}
        <section>
          <ScrollReveal>
            <SectionLabel>Where do you want to start?</SectionLabel>
          </ScrollReveal>
          <div className="flex flex-col gap-3">
            {paths.map(({ href, icon: Icon, title, body, primary }) => (
              <ScrollReveal key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 p-4 rounded-card shadow-resting active:scale-[0.99] transition-transform ${
                    primary
                      ? "bg-primary text-white"
                      : "bg-white border border-silver-mid/40"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-inner flex items-center justify-center flex-shrink-0 ${
                      primary ? "bg-white/20" : "bg-primary/10"
                    }`}
                  >
                    <Icon size={18} className={primary ? "text-warm" : "text-primary"} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-bold leading-tight ${primary ? "text-white" : "text-primary-dark"}`}>
                      {title}
                    </p>
                    <p className={`text-xs leading-snug mt-0.5 ${primary ? "text-on-dark" : "text-gray-500"}`}>
                      {body}
                    </p>
                  </div>
                  <ArrowRight size={16} className={`flex-shrink-0 ${primary ? "text-white/70" : "text-silver"}`} />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* How it works — the universal loop */}
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

        {/* Built to be safe at IL2 — security reframed as a trust signal */}
        <section>
          <ScrollReveal>
            <SectionLabel>Built to be safe at IL2</SectionLabel>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex gap-3 p-4 rounded-card bg-warm/10 border border-warm/30">
              <div className="w-9 h-9 rounded-inner bg-warm/20 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={18} className="text-caution" />
              </div>
              <p className="text-xs text-primary-dark leading-relaxed">
                Nothing you type is sent, stored, or generated here. The app points you to approved tools and
                reminds you never to paste classified, CUI, or PII — and to verify every output before official use.
              </p>
            </div>
          </ScrollReveal>
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
      </div>
    </div>
  );
}
