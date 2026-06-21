"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useTimeBack, formatTimeBack } from "@/lib/timeBack";

// ─── Local, self-reported time-back tally ──────────────────────────────────────
function TimeReclaimed() {
  const { minutes } = useTimeBack();
  if (minutes <= 0) return null;
  return (
    <div className="px-4 pt-5 pb-2">
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
    </div>
  );
}

function openGuide() {
  window.dispatchEvent(new Event("ap:open-guide"));
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

          <button
            onClick={openGuide}
            className="mt-4 text-xs font-semibold text-on-dark underline underline-offset-4 decoration-on-dark/40 hover:text-white transition-colors"
          >
            What is this?
          </button>
        </div>
      </div>

      <div className="h-px bg-silver-mid" />

      {/* ── Returning-user tally (only shows once something is logged) ── */}
      <TimeReclaimed />
    </div>
  );
}
