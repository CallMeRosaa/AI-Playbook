"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useMode, writeMode, type Mode } from "@/lib/mode";

// ADR-R08 context question — plain language, no impact-level jargon. Sets the
// device-local mode that decides whether surfaces lead with "execute now" links
// (workstation) or "save and plan" actions (mobile). Changeable anytime; tapping
// the active choice clears it, mirroring the AFSC tile behavior on the Plays page.
const OPTIONS: { mode: Mode; icon: typeof Monitor; label: string; hint: string }[] = [
  { mode: "workstation", icon: Monitor,    label: "At a workstation", hint: "Ready to execute" },
  { mode: "mobile",      icon: Smartphone, label: "On my phone",      hint: "Planning & saving" },
];

export default function ContextModeToggle({ className = "" }: { className?: string }) {
  const mode = useMode();

  return (
    <div className={`rounded-card bg-white border border-silver-mid/40 shadow-resting p-4 ${className}`}>
      <p className="text-sm font-bold text-primary-dark leading-snug">Where are you right now?</p>
      <p className="text-xs text-gray-500 mt-0.5 leading-snug">
        {mode
          ? "Tap to switch anytime — this stays on your device."
          : "At a workstation ready to execute, or on your phone planning and discovering?"}
      </p>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {OPTIONS.map(({ mode: m, icon: Icon, label, hint }) => {
          const active = mode === m;
          return (
            <button
              key={m}
              onClick={() => writeMode(active ? null : m)}
              aria-pressed={active}
              className={`flex flex-col items-start gap-1 rounded-inner border px-3 py-2.5 text-left transition-all duration-base ease-smooth ${
                active
                  ? "bg-primary border-primary text-white shadow-resting"
                  : "bg-white border-silver-mid/60 text-primary-dark active:bg-primary/5"
              }`}
            >
              <Icon size={18} className={active ? "text-warm" : "text-primary"} />
              <span className="text-xs font-bold leading-tight">{label}</span>
              <span className={`text-[10px] leading-tight ${active ? "text-on-dark" : "text-gray-500"}`}>{hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
