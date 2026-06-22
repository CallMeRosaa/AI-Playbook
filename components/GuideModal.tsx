"use client";

import { useEffect, useRef } from "react";
import {
  Bot, BookOpen, FileText, Compass, X, Lightbulb, ExternalLink,
} from "lucide-react";
import { SURFACES, SUGGEST_PLAY_FORM_URL } from "@/lib/links";

const surfaces = [
  { icon: FileText, label: "The signed PDF", role: "Doctrine. The authoritative reference.", status: SURFACES.pdf.status },
  { icon: Bot, label: "The GenAI.mil Agent", role: "Execution. Where you actually run the play.", status: SURFACES.agent.status },
  { icon: BookOpen, label: "The Notebook", role: "Grounded question and answer against the Playbook.", status: SURFACES.notebook.status },
  { icon: Compass, label: "This app", role: "Discovery, orientation, routing.", status: "live" as const },
];

export default function GuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc to dismiss + body scroll-lock while open. Move focus to the close button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="How to use this app"
    >
      {/* Backdrop — click-outside to dismiss */}
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-primary-dark/60 animate-fade-in cursor-default"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-lg max-h-[88vh] overflow-y-auto bg-background rounded-t-card sm:rounded-card shadow-modal animate-fade-up"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 hero-af text-white px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/af-symbol-white.svg" alt="U.S. Air Force" className="h-6 flex-shrink-0" draggable={false} />
                <div className="w-px h-5 bg-silver/40 flex-shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-on-dark-dim">Airman&apos;s Playbook</span>
              </div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider">How to Use This App</h2>
              <p className="text-sm text-on-dark mt-0.5">What it does, what it does not, and where it points you.</p>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="flex-shrink-0 p-2 -mr-1 -mt-1 rounded-inner text-on-dark hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-4 pt-5 flex flex-col gap-5 pb-7">
          {/* What this app is, in one line — the home page carries the full flow */}
          <p className="text-sm text-gray-600 leading-relaxed">
            This app is the <span className="font-semibold text-primary-dark">discovery layer</span> of the Playbook —
            it finds the right play or tool for your task and points you to where to run it. It never runs a model,
            holds your data, or replaces the system of record. It is one of four surfaces that work together.
          </p>

          {/* Four surfaces */}
          <div>
            <p className="text-[10px] font-bold text-silver uppercase tracking-wider mb-2">One product, four surfaces</p>
            <div className="flex flex-col gap-2">
              {surfaces.map(({ icon: Icon, label, role, status }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-card bg-white border border-silver-mid/40 shadow-resting">
                  <div className="w-9 h-9 rounded-inner bg-silver-tint flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-primary-dark leading-tight">{label}</p>
                    <p className="text-xs text-gray-500 leading-snug">{role}</p>
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-badge flex-shrink-0 ${
                      status === "live" ? "bg-success-tint text-success-mid" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {status === "live" ? "Live" : "Coming soon"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggest a play — SME contribution door */}
          <div>
            <p className="text-[10px] font-bold text-silver uppercase tracking-wider mb-2">Help build the Playbook</p>
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
          </div>

          {/* OPSEC line */}
          <div className="p-4 rounded-card bg-warm/10 border border-warm/30">
            <p className="text-xs text-primary-dark leading-relaxed">
              <span className="font-bold">Stay clean at IL2.</span> Never enter classified, CUI, or PII into any AI
              tool. Use generic, unclassified examples, and verify every output before official use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
