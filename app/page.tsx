"use client";

import Link from "next/link";
import { Layers, Wrench, Compass, Shield, ChevronRight, Clock, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useTimeBack, formatTimeBack } from "@/lib/timeBack";

// ─── Front-door surfaces of the app ───────────────────────────────────────────
const entries = [
  {
    href: "/plays",
    icon: Layers,
    title: "Play Shelf",
    description: "Pick your AFSC and get the safe starting move for the tasks that eat your time.",
    cta: "Find your plays",
    color: "bg-primary",
    accent: "text-warm",
    light: false,
  },
  {
    href: "/tools",
    icon: Wrench,
    title: "AI Tools",
    description: "Where to run your plays. GenAI.mil first, with what is commonly approved for official use.",
    cta: "See the tools",
    color: "bg-primary-dark",
    accent: "text-warm",
    light: false,
  },
  {
    href: "/guide",
    icon: Compass,
    title: "How to Use This App",
    description: "What this app does, what it does not, and how the four Playbook surfaces fit together.",
    cta: "Get oriented",
    color: "bg-warm",
    accent: "text-primary",
    light: true,
  },
];

// ─── Local, self-reported time-back tally ──────────────────────────────────────
function TimeReclaimed() {
  const { minutes } = useTimeBack();
  if (minutes <= 0) return null;
  return (
    <ScrollReveal>
      <div className="flex items-center gap-3 p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
        <div className="p-2.5 rounded-inner bg-primary/10 flex-shrink-0">
          <Clock size={18} className="text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-silver">Time reclaimed so far</p>
          <p className="text-base font-bold text-primary-dark leading-tight">{formatTimeBack(minutes)}</p>
          <p className="text-[10px] text-gray-400 leading-tight">Self-reported estimate, on this device only.</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero / front door ── */}
      <div className="relative hero-af text-white px-5 pt-8 pb-8 overflow-hidden">
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

          <div className="flex items-center gap-2 mb-3">
            <Shield size={12} className="text-warm flex-shrink-0" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-warm">
              The Airman&apos;s Playbook · IL2 Front Door
            </span>
          </div>

          <h1 className="font-display text-4xl font-black uppercase tracking-wider leading-tight mb-3">
            Airman&apos;s<br />Playbook
          </h1>
          <p className="text-base text-white font-semibold leading-snug max-w-[19rem]">
            The AI is already in your hands. This shows you how to use it.
          </p>
          <p className="text-sm text-on-dark font-medium mt-3 max-w-[20rem] leading-snug">
            Pick your job, see what AI can do for it, get the safe starting move, and go run it on GenAI.mil.
          </p>

          {/* One clear action into the AFSC tiles */}
          <Link
            href="/plays"
            className="mt-6 inline-flex items-center gap-2 bg-warm text-primary-dark font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-inner shadow-raised active:scale-[0.98] transition-all duration-base ease-smooth"
          >
            Pick your AFSC
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="h-px bg-silver-mid" />

      {/* ── Entry cards ── */}
      <div className="px-4 pt-5 flex flex-col gap-3">
        <ScrollReveal>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-1">Where to start</p>
        </ScrollReveal>

        {entries.map(({ href, icon: Icon, title, description, cta, color, accent, light }) => (
          <ScrollReveal key={href}>
            <Link href={href}>
              <div className={`
                ${color} rounded-card p-5 shadow-resting
                hover:shadow-raised hover:-translate-y-0.5
                active:scale-[0.98] active:shadow-resting
                transition-all duration-base ease-smooth
              `}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-inner bg-white/20">
                    <Icon size={20} className={accent} />
                  </div>
                  <ChevronRight size={18} className={light ? "text-primary/60" : "text-white/60"} />
                </div>
                <h2 className={`font-display text-xl font-bold uppercase tracking-wider ${light ? "text-primary" : "text-white"}`}>
                  {title}
                </h2>
                <p className={`text-sm mt-1 leading-snug ${light ? "text-primary-dark/80" : "text-on-dark"}`}>
                  {description}
                </p>
                <div className={`flex items-center mt-3.5 pt-3 border-t ${light ? "border-primary/15" : "border-white/15"}`}>
                  <span className={`text-xs font-bold ${light ? "text-primary" : "text-white/90"}`}>{cta}</span>
                  <ChevronRight size={14} className={`ml-auto ${light ? "text-primary" : "text-white/70"}`} />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}

        {/* ── Time reclaimed (only shows once something is logged) ── */}
        <TimeReclaimed />

        {/* ── Orientation note ── */}
        <ScrollReveal>
          <div className="mt-1 mb-2 p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              <span className="font-bold text-primary">This app orients and routes.</span>{" "}
              It does not run a model or hold sensitive data. It tells you what AI can do for your job and points you
              to the right surface to do it.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
