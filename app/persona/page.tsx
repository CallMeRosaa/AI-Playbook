"use client";

import { Fragment, useState } from "react";
import {
  ChevronRight, ChevronLeft, Copy, Check, Download,
  Sparkles, ExternalLink, CheckCircle2,
} from "lucide-react";
import { getAfscProfile, COMMON_ADDITIONAL_DUTIES } from "@/lib/data/afsc-data";

const ENLISTED_RANKS = ["AB", "Amn", "A1C", "SrA", "SSgt", "TSgt", "MSgt", "SMSgt", "CMSgt"];
const OFFICER_RANKS = ["2Lt", "1Lt", "Capt", "Maj", "Lt Col", "Col", "Brig Gen", "Maj Gen", "Lt Gen", "Gen"];

const AI_STYLE_OPTIONS = [
  { label: "Short bullets — give me the bottom line", value: "Concise bullet points, no filler text" },
  { label: "BLUF first, then the detail", value: "Military BLUF format — bottom line up front, supporting detail after" },
  { label: "Step-by-step — walk me through it", value: "Numbered step-by-step instructions" },
  { label: "Full explanation with context", value: "Complete explanations with background and reasoning" },
];

interface FormData {
  rank: string;
  afsc: string;
  jobTitle: string;
  dailyTasks: string;
  biggestGrind: string;
  publications: string;
  additionalDuties: string[];
  aiStyle: string;
}

const initial: FormData = {
  rank: "",
  afsc: "",
  jobTitle: "",
  dailyTasks: "",
  biggestGrind: "",
  publications: "",
  additionalDuties: [],
  aiStyle: "",
};

const STEPS = [
  { label: "Identity",    sublabel: "Who are you?" },
  { label: "Your Day",    sublabel: "What do you do?" },
  { label: "The Grind",   sublabel: "Where does your time go?" },
  { label: "Duties & Refs", sublabel: "What else do you manage?" },
  { label: "Your Style",  sublabel: "How should AI talk to you?" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stepper({ current }: { current: number }) {
  return (
    <div className="px-5 pt-4 pb-3 bg-white border-b border-silver-mid/40">
      <div className="flex items-center">
        {STEPS.map((_, i) => (
          <Fragment key={i}>
            <div
              className={`
                w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                text-xs font-bold transition-all duration-250
                ${i < current  ? "bg-primary text-white"
                : i === current ? "bg-warm text-primary-dark"
                :                 "bg-gray-100 text-gray-400"}
              `}
            >
              {i < current ? <Check size={13} strokeWidth={2.5} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-1 transition-colors duration-400 ${
                  i < current ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>
      <div className="mt-2.5 flex items-baseline justify-between">
        <span className="text-xs font-bold text-primary-dark">
          {STEPS[current].label}
          <span className="font-normal text-gray-400"> — {STEPS[current].sublabel}</span>
        </span>
        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
          {current + 1} / {STEPS.length}
        </span>
      </div>
    </div>
  );
}

function RankSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const Group = ({ label, ranks }: { label: string; ranks: string[] }) => (
    <div className="mb-3 last:mb-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {ranks.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onChange(r)}
            className={`text-xs font-bold px-3 py-1.5 rounded-badge border transition-all duration-150 ${
              value === r
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-silver-tint rounded-inner p-3 border border-silver-mid/40">
      <Group label="Enlisted" ranks={ENLISTED_RANKS} />
      <Group label="Officer"  ranks={OFFICER_RANKS}  />
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-bold uppercase tracking-wider text-silver mb-1.5 block">
      {children}
    </label>
  );
}

function Hint({ show, text }: { show: boolean; text: string }) {
  if (!show) return null;
  return (
    <p className="text-[11px] text-caution font-semibold mt-1.5 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-caution flex-shrink-0" />
      {text}
    </p>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PersonaPage() {
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState<"fwd" | "back">("fwd");
  const [form, setForm]           = useState<FormData>(initial);
  const [loading, setLoading]     = useState(false);
  const [persona, setPersona]     = useState<string | null>(null);
  const [copied, setCopied]       = useState(false);
  const [attempted, setAttempted] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const toggleDuty = (id: string) =>
    setForm((p) => ({
      ...p,
      additionalDuties: p.additionalDuties.includes(id)
        ? p.additionalDuties.filter((d) => d !== id)
        : [...p.additionalDuties, id],
    }));

  const appendTask = (task: string) =>
    setForm((p) => {
      const cur = p.dailyTasks.trim();
      return { ...p, dailyTasks: cur ? `${cur}\n${task}` : task };
    });

  const canAdvance = () => {
    if (step === 0) return !!(form.rank && form.afsc.trim() && form.jobTitle.trim());
    if (step === 1) return form.dailyTasks.trim().length > 20;
    if (step === 2) return form.biggestGrind.trim().length > 10;
    if (step === 3) return true;
    if (step === 4) return !!form.aiStyle;
    return true;
  };

  const goNext = () => {
    if (!canAdvance()) { setAttempted(true); return; }
    setAttempted(false);
    setDirection("fwd");
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setAttempted(false);
    setDirection("back");
    setStep((s) => s - 1);
  };

  const handleGenerate = async () => {
    if (!canAdvance()) { setAttempted(true); return; }
    setLoading(true);
    try {
      const dutyLabels = form.additionalDuties.map(
        (id) => COMMON_ADDITIONAL_DUTIES.find((d) => d.id === id)?.label ?? id
      );
      const res = await fetch("/api/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, additionalDutyLabels: dutyLabels }),
      });
      const data = await res.json();
      setPersona(data.persona);
    } catch {
      setPersona("Error generating context file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!persona) return;
    await navigator.clipboard.writeText(persona);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!persona) return;
    const blob = new Blob([persona], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${form.rank}_${form.afsc}_AI_Context.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setPersona(null);
    setStep(0);
    setForm(initial);
    setAttempted(false);
  };

  const openEpubs = () => {
    const q   = form.publications.trim();
    const url = q
      ? `https://www.e-publishing.af.mil/product-index/#/?view=search&keyword=${encodeURIComponent(q)}`
      : "https://www.e-publishing.af.mil";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const afscProfile = getAfscProfile(form.afsc);

  // ── Completion screen ──
  if (persona) {
    return (
      <div className="flex flex-col">
        <div className="hero-af text-white px-5 pt-5 pb-5">
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/af-symbol-white.svg" alt="U.S. Air Force" className="h-6 flex-shrink-0" draggable={false} />
            <div className="w-px h-5 bg-silver/40 flex-shrink-0" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-dark-dim">Airman&apos;s Playbook</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 size={28} className="text-warm animate-check-pop flex-shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-warm block">
                Context File Ready
              </span>
              <h1 className="font-display text-xl font-bold uppercase tracking-wider text-white leading-tight">
                {form.rank} · {form.afsc}
              </h1>
            </div>
          </div>
          <p className="text-sm text-on-dark">
            Paste this into any AI tool before your first message.
          </p>
        </div>

        <div className="h-px bg-silver-mid" />

        <div className="px-4 pt-4 flex flex-col gap-3 pb-6">
          <div className="bg-white rounded-card shadow-resting border border-silver-mid/50 p-4">
            <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
              {persona}
            </pre>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-inner text-sm font-bold transition-all duration-250 ${
              copied
                ? "bg-success text-white"
                : "bg-primary text-white active:bg-primary-dark"
            }`}
          >
            {copied
              ? <><Check size={16} /> Copied to clipboard</>
              : <><Copy size={16} /> Copy to Clipboard</>
            }
          </button>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-inner text-sm font-bold bg-white border border-gray-200 text-primary active:bg-gray-50 transition-colors"
          >
            <Download size={16} /> Download as .txt
          </button>

          <button
            onClick={handleReset}
            className="text-xs text-gray-400 font-medium text-center py-2 hover:text-gray-600 transition-colors"
          >
            Start over
          </button>

          <div className="p-4 rounded-card bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary-dark font-semibold mb-1">How to use this</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Paste this entire file into the first message of any AI session —
              GenAI.mil, Claude, or ChatGPT. The AI will immediately
              know your role and how to help you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Wizard ──
  const animClass = direction === "fwd" ? "step-enter-fwd" : "step-enter-back";

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
        <span className="text-[10px] font-bold uppercase tracking-widest text-warm">
          Persona Builder
        </span>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-white leading-tight mt-1">
          {STEPS[step].label}
        </h1>
        <p className="text-sm text-on-dark mt-0.5">{STEPS[step].sublabel}</p>
      </div>

      {/* Stepper */}
      <Stepper current={step} />

      {/* Step content — key forces remount on each step change, triggering slide animation */}
      <div key={step} className={`px-4 pt-6 flex flex-col gap-5 pb-6 ${animClass}`}>

        {/* ── Step 0: Identity ── */}
        {step === 0 && (
          <>
            <p className="text-base font-semibold text-primary-dark leading-snug">
              What&apos;s your rank, AFSC, and what do people call your job?
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <FieldLabel>Rank</FieldLabel>
                <RankSelector value={form.rank} onChange={(v) => update("rank", v)} />
                <Hint show={attempted && !form.rank} text="Select your rank to continue" />
              </div>

              <div>
                <FieldLabel>AFSC</FieldLabel>
                <input
                  type="text"
                  placeholder="e.g. 3D1X1"
                  value={form.afsc}
                  onChange={(e) => update("afsc", e.target.value)}
                  className="w-full border border-silver-mid/70 rounded-input px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <Hint show={attempted && !form.afsc.trim()} text="Enter your AFSC (e.g., 3D1X1)" />
              </div>

              <div>
                <FieldLabel>Job Title / What You Actually Do</FieldLabel>
                <input
                  type="text"
                  placeholder="e.g. Network Admin, Crew Chief, Training NCO"
                  value={form.jobTitle}
                  onChange={(e) => update("jobTitle", e.target.value)}
                  className="w-full border border-silver-mid/70 rounded-input px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <Hint show={attempted && !form.jobTitle.trim()} text="Enter your job title" />
              </div>
            </div>
          </>
        )}

        {/* ── Step 1: Daily Tasks ── */}
        {step === 1 && (
          <>
            <p className="text-base font-semibold text-primary-dark leading-snug">
              Walk me through your average duty day. What are the first things you actually{" "}
              <em>do</em> when you sit down?
            </p>
            <p className="text-xs text-gray-400 -mt-2">
              Don&apos;t overthink it — just describe what you do, in order.
            </p>
            <textarea
              rows={7}
              placeholder="e.g. Check AROWS for leave requests, pull the maintenance schedule, triage about 30 emails before 0900, then brief the flight chief on overnight issues..."
              value={form.dailyTasks}
              onChange={(e) => update("dailyTasks", e.target.value)}
              className="w-full border border-silver-mid/70 rounded-input px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none leading-relaxed transition-colors"
            />
            <Hint
              show={attempted && form.dailyTasks.trim().length <= 20}
              text="Add a bit more detail — describe what you actually do day to day"
            />

            {afscProfile && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Common tasks for {afscProfile.label} — tap to add
                </p>
                <div className="flex flex-col gap-2">
                  {afscProfile.tasks.map((task) => {
                    const isAdded = form.dailyTasks.includes(task);
                    return (
                      <button
                        key={task}
                        type="button"
                        onClick={() => !isAdded && appendTask(task)}
                        disabled={isAdded}
                        className={`flex items-center gap-2 text-left text-xs px-3 py-2.5 rounded-inner border transition-colors ${
                          isAdded
                            ? "bg-green-50 border-green-200 text-green-600 cursor-default"
                            : "bg-white border-gray-200 text-gray-600 active:bg-primary/5"
                        }`}
                      >
                        <CheckCircle2
                          size={14}
                          className={isAdded ? "text-green-500 flex-shrink-0" : "text-gray-300 flex-shrink-0"}
                        />
                        {task}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── Step 2: Biggest Grind ── */}
        {step === 2 && (
          <>
            <p className="text-base font-semibold text-primary-dark leading-snug">
              What recurring task takes up the most of your time — or feels like the biggest grind?
            </p>
            <p className="text-xs text-gray-400 -mt-2">
              This is what we&apos;re going to help you do faster.
            </p>
            <textarea
              rows={7}
              placeholder="e.g. Writing EPR bullets at the end of every quarter takes me 3-4 hours per person, and I always stare at a blank page for the first hour..."
              value={form.biggestGrind}
              onChange={(e) => update("biggestGrind", e.target.value)}
              className="w-full border border-silver-mid/70 rounded-input px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none leading-relaxed transition-colors"
            />
            <Hint
              show={attempted && form.biggestGrind.trim().length <= 10}
              text="Tell us a bit more — what specific task eats your time?"
            />
          </>
        )}

        {/* ── Step 3: Duties & References ── */}
        {step === 3 && (
          <>
            <p className="text-base font-semibold text-primary-dark leading-snug">
              What AFIs or TOs do you work from — and what additional programs do you manage?
            </p>

            <div>
              <FieldLabel>Key Publications (optional)</FieldLabel>
              <textarea
                rows={3}
                placeholder="e.g. AFI 36-2406, T.O. 00-20-1, AFMAN 33-363..."
                value={form.publications}
                onChange={(e) => update("publications", e.target.value)}
                className="w-full border border-silver-mid/70 rounded-input px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none leading-relaxed transition-colors"
              />
              <button
                onClick={openEpubs}
                className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-inner border border-primary text-primary text-xs font-bold bg-white active:bg-primary/5 transition-colors"
              >
                <ExternalLink size={13} />
                Search AF e-Publishing (EPUBS)
              </button>
            </div>

            <div>
              <FieldLabel>Additional Programs You Manage</FieldLabel>
              <p className="text-[10px] text-gray-400 mb-3 -mt-1">
                These get included in your AI context file so the AI knows your full workload.
              </p>
              <div className="flex flex-wrap gap-2">
                {COMMON_ADDITIONAL_DUTIES.map((duty) => {
                  const selected = form.additionalDuties.includes(duty.id);
                  return (
                    <button
                      key={duty.id}
                      type="button"
                      onClick={() => toggleDuty(duty.id)}
                      title={duty.description}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-badge border transition-colors ${
                        selected
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {selected && <span className="mr-1">✓</span>}
                      {duty.label}
                    </button>
                  );
                })}
              </div>
              {form.additionalDuties.length > 0 && (
                <p className="text-[10px] text-primary font-medium mt-2">
                  {form.additionalDuties.length} program{form.additionalDuties.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          </>
        )}

        {/* ── Step 4: AI Style ── */}
        {step === 4 && (
          <>
            <p className="text-base font-semibold text-primary-dark leading-snug">
              When AI gives you a perfect answer, what does it look like?
            </p>
            <div className="flex flex-col gap-2">
              {AI_STYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("aiStyle", opt.value)}
                  className={`text-left text-sm font-medium px-4 py-3.5 rounded-inner border transition-all duration-150 ${
                    form.aiStyle === opt.value
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <Hint show={attempted && !form.aiStyle} text="Select your preferred response style" />
          </>
        )}

        {/* ── Navigation ── */}
        <div className="flex gap-3 pt-1">
          {step > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 px-4 py-3 rounded-inner border border-gray-200 bg-white text-sm font-semibold text-gray-600 active:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}

          {step < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              className={`flex-1 flex items-center justify-center gap-1 py-3 rounded-inner text-sm font-bold transition-all duration-150 ${
                canAdvance()
                  ? "bg-primary text-white active:bg-primary-dark"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-inner text-sm font-bold transition-all ${
                loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : canAdvance()
                  ? "bg-warm text-primary-dark active:bg-warm-dark"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  Building your file...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generate My Context File
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
