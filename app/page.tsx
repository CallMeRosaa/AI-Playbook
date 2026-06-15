"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Wrench, User, Clock, Zap, Shield, ChevronRight } from "lucide-react";
import { PROMPTS } from "@/lib/mock/prompts";
import { TOOLS } from "@/lib/mock/tools";
import ScrollReveal from "@/components/ScrollReveal";

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 900) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return count;
}

// ─── Stat display ─────────────────────────────────────────────────────────────
const NIPR_COUNT = TOOLS.filter((t) => t.accessLevel !== "Commercial").length;

function StatBar() {
  const hrsCount     = useCountUp(6, 800);
  const promptsCount = useCountUp(PROMPTS.length, 900);
  const toolsCount   = useCountUp(NIPR_COUNT, 700);

  const statItems = [
    { icon: Clock,  label: "Est. hrs saved/week",  value: hrsCount >= 6 ? "4–6 hrs" : `${hrsCount} hrs` },
    { icon: Zap,    label: "Prompts ready to use",  value: `${promptsCount}` },
    { icon: Shield, label: "NIPR-approved tools",   value: `${toolsCount}` },
  ];

  return (
    <div className="bg-primary-dark text-white px-4 py-3 flex justify-around border-b border-silver-mid/30">
      {statItems.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex flex-col items-center text-center">
          <Icon size={13} className="text-warm mb-0.5" />
          <span className="text-base font-bold leading-tight tabular-nums">{value}</span>
          <span className="text-[9px] text-on-dark-dim leading-tight max-w-[72px] mt-0.5">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Feature cards ────────────────────────────────────────────────────────────
const features = [
  {
    href: "/prompts",
    icon: BookOpen,
    title: "Prompt Library",
    description: "Ready-to-use AI prompts for EPRs, emails, briefs, and more — tailored for Airmen.",
    stat: `${PROMPTS.length} prompts`,
    cta: "Browse prompts",
    color: "bg-primary",
    accent: "text-warm",
    light: false,
  },
  {
    href: "/tools",
    icon: Wrench,
    title: "AI Tool Catalog",
    description: "Know what's approved for official NIPR use and what's personal-only before you start.",
    stat: `${TOOLS.length} tools`,
    cta: "View catalog",
    color: "bg-primary-dark",
    accent: "text-warm",
    light: false,
  },
  {
    href: "/persona",
    icon: User,
    title: "Airman Persona Builder",
    description: "Build your personal AI context file. Paste it into any AI tool and instantly get better outputs.",
    stat: "2 min setup",
    cta: "Build mine",
    color: "bg-warm",
    accent: "text-primary",
    light: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <div className="relative hero-af text-white px-5 pt-8 pb-8 overflow-hidden">
        {/* Ambient blobs — decorative, pointer-events disabled */}
        <div aria-hidden="true" className="pointer-events-none select-none">
          <div className="hero-blob-1 absolute -top-20 -right-20 w-72 h-72 rounded-full" />
          <div className="hero-blob-2 absolute top-8 -left-24 w-56 h-56 rounded-full" />
        </div>

        {/* Content — centered identity layout */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* AF Symbol — authorized white version, clear space, no effects applied to the mark */}
          <div className="mb-5 mt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/af-symbol-white.svg"
              alt="U.S. Air Force"
              className="h-16 mx-auto"
              draggable={false}
            />
          </div>

          {/* Silver rule — visual separator between Symbol and app wordmark */}
          <div className="w-12 h-px bg-silver mb-5" aria-hidden="true" />

          {/* Badge row */}
          <div className="flex items-center gap-2 mb-3">
            <Shield size={12} className="text-warm flex-shrink-0" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-warm">
              PFTU 26-3 · AI Workforce Efficiencies
            </span>
          </div>

          {/* App wordmark — separated from the Symbol above by the rule and badge row */}
          <h1 className="font-display text-4xl font-black uppercase tracking-wider leading-tight mb-2">
            Airman&apos;s<br />Playbook
          </h1>
          <p className="text-sm text-on-dark font-medium">
            Reclaim your time. Expand your mission capacity.
          </p>
        </div>
      </div>

      {/* ── Stats bar (client-side count-up) ── */}
      <StatBar />

      {/* ── Feature cards ── */}
      <div className="px-4 pt-5 flex flex-col gap-3">
        <ScrollReveal>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-1">
            Choose where to start
          </p>
        </ScrollReveal>

        {features.map(({ href, icon: Icon, title, description, stat, cta, color, accent, light }) => (
          <ScrollReveal key={href}>
            <Link href={href}>
              <div className={`
                ${color} rounded-card p-5 shadow-resting
                hover:shadow-raised hover:-translate-y-0.5
                active:scale-[0.98] active:shadow-resting
                transition-all duration-base ease-smooth
              `}>
                {/* Icon + stat count */}
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-inner bg-white/20">
                    <Icon size={20} className={accent} />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-badge bg-white/20 ${accent}`}>
                    {stat}
                  </span>
                </div>

                {/* Title + description */}
                <h2 className={`font-display text-xl font-bold uppercase tracking-wider ${light ? "text-primary" : "text-white"}`}>
                  {title}
                </h2>
                <p className={`text-sm mt-1 leading-snug ${light ? "text-primary-dark/80" : "text-on-dark"}`}>
                  {description}
                </p>

                {/* CTA row */}
                <div className={`flex items-center mt-3.5 pt-3 border-t ${light ? "border-primary/15" : "border-white/15"}`}>
                  <span className={`text-xs font-bold ${light ? "text-primary" : "text-white/90"}`}>{cta}</span>
                  <ChevronRight size={14} className={`ml-auto ${light ? "text-primary" : "text-white/70"}`} />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}

        {/* ── Mission statement ── */}
        <ScrollReveal>
          <div className="mt-1 mb-2 p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              <span className="font-bold text-primary">This is not about manpower reduction.</span>{" "}
              It&apos;s about returning capacity to the mission — so Airmen can focus on what matters most.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
