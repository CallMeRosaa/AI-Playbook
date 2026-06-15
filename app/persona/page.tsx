"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Copy, Check, Download, Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";
import { getAfscProfile, COMMON_ADDITIONAL_DUTIES } from "@/lib/data/afsc-data";

const RANKS = [
  "AB", "Amn", "A1C", "SrA", "SSgt", "TSgt", "MSgt", "SMSgt", "CMSgt",
  "2Lt", "1Lt", "Capt", "Maj", "Lt Col", "Col", "Brig Gen", "Maj Gen", "Lt Gen", "Gen",
];

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
  { label: "Identity", sublabel: "Who are you?" },
  { label: "Your Day", sublabel: "What do you do?" },
  { label: "The Grind", sublabel: "Where does your time go?" },
  { label: "Duties & Refs", sublabel: "What else do you manage?" },
  { label: "Your Style", sublabel: "How should AI talk to you?" },
];

export default function PersonaPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const toggleDuty = (id: string) => {
    setForm((p) => ({
      ...p,
      additionalDuties: p.additionalDuties.includes(id)
        ? p.additionalDuties.filter((d) => d !== id)
        : [...p.additionalDuties, id],
    }));
  };

  const appendTask = (task: string) => {
    setForm((p) => {
      const current = p.dailyTasks.trim();
      const newVal = current ? `${current}\n${task}` : task;
      return { ...p, dailyTasks: newVal };
    });
  };

  const canAdvance = () => {
    if (step === 0) return !!(form.rank && form.afsc && form.jobTitle.trim());
    if (step === 1) return form.dailyTasks.trim().length > 20;
    if (step === 2) return form.biggestGrind.trim().length > 10;
    if (step === 3) return true;
    if (step === 4) return !!form.aiStyle;
    return true;
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Resolve duty IDs to labels for the API
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
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.rank}_${form.afsc}_AI_Context.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setPersona(null);
    setStep(0);
    setForm(initial);
  };

  const openEpubs = () => {
    const query = form.publications.trim();
    const url = query
      ? `https://www.e-publishing.af.mil/product-index/#/?view=search&keyword=${encodeURIComponent(query)}`
      : "https://www.e-publishing.af.mil";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const afscProfile = getAfscProfile(form.afsc);

  // Result screen
  if (persona) {
    return (
      <div className="flex flex-col">
        <div className="bg-warm px-5 pt-8 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Your AI Context File
            </span>
          </div>
          <h1
            className="text-2xl font-black uppercase tracking-tight text-primary leading-tight"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
          >
            {form.rank} · {form.afsc}
          </h1>
          <p className="text-sm text-primary-dark/80 mt-1">
            Paste this into any AI tool before your first message.
          </p>
        </div>

        <div className="h-1 bg-primary" />

        <div className="px-4 pt-4 flex flex-col gap-3 pb-6">
          <div className="bg-white rounded-card shadow-resting border border-gray-100 p-4">
            <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
              {persona}
            </pre>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-inner text-sm font-bold transition-all ${
              copied ? "bg-green-500 text-white" : "bg-primary text-white"
            }`}
          >
            {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy to Clipboard</>}
          </button>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-inner text-sm font-bold bg-white border border-gray-200 text-primary"
          >
            <Download size={16} /> Download as .txt
          </button>

          <button onClick={handleReset} className="text-xs text-gray-400 font-medium text-center py-2">
            Start over
          </button>

          <div className="p-4 rounded-card bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary-dark font-semibold mb-1">How to use this</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Paste this entire file into the first message of any AI session —
              GenAI.mil, NIPRGPT, Claude, or ChatGPT. The AI will immediately
              know your role and how to help you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-warm px-5 pt-8 pb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Persona Builder
        </span>
        <h1
          className="text-2xl font-black uppercase tracking-tight text-primary leading-tight mt-1"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          {STEPS[step].label}
        </h1>
        <p className="text-sm text-primary-dark/70 mt-0.5">{STEPS[step].sublabel}</p>
      </div>

      {/* Progress bar */}
      <div className="bg-primary px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1 flex-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-badge transition-colors ${
                i <= step ? "bg-warm" : "bg-white/20"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-blue-300 font-medium whitespace-nowrap">
          {step + 1} / {STEPS.length}
        </span>
      </div>

      <div className="px-4 pt-6 flex flex-col gap-5 pb-6">

        {/* Step 0 — Identity */}
        {step === 0 && (
          <>
            <p className="text-base font-semibold text-primary-dark leading-snug">
              What&apos;s your rank, AFSC, and what do people call your job?
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">Rank</label>
                <select
                  value={form.rank}
                  onChange={(e) => update("rank", e.target.value)}
                  className="w-full border border-gray-200 rounded-input px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select rank...</option>
                  {RANKS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">AFSC</label>
                <input
                  type="text"
                  placeholder="e.g. 3D1X1"
                  value={form.afsc}
                  onChange={(e) => update("afsc", e.target.value)}
                  className="w-full border border-gray-200 rounded-input px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                  Job Title / What You Actually Do
                </label>
                <input
                  type="text"
                  placeholder="e.g. Network Admin, Crew Chief, Training NCO"
                  value={form.jobTitle}
                  onChange={(e) => update("jobTitle", e.target.value)}
                  className="w-full border border-gray-200 rounded-input px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          </>
        )}

        {/* Step 1 — Daily Tasks */}
        {step === 1 && (
          <>
            <p className="text-base font-semibold text-primary-dark leading-snug">
              Walk me through your average duty day. What are the first things you actually <em>do</em> when you sit down?
            </p>
            <p className="text-xs text-gray-400 -mt-2">
              Don&apos;t overthink it — just describe what you do, in order.
            </p>
            <textarea
              rows={7}
              placeholder="e.g. Check AROWS for leave requests, pull the maintenance schedule, triage about 30 emails before 0900, then brief the flight chief on overnight issues..."
              value={form.dailyTasks}
              onChange={(e) => update("dailyTasks", e.target.value)}
              className="w-full border border-gray-200 rounded-input px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
            />

            {/* AFSC-based task suggestions */}
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

        {/* Step 2 — Biggest Grind */}
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
              className="w-full border border-gray-200 rounded-input px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
            />
          </>
        )}

        {/* Step 3 — Duties & References */}
        {step === 3 && (
          <>
            <p className="text-base font-semibold text-primary-dark leading-snug">
              What AFIs or TOs do you work from — and what additional programs do you manage?
            </p>

            {/* Publications */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                Key Publications (optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. AFI 36-2406, T.O. 00-20-1, AFMAN 33-363..."
                value={form.publications}
                onChange={(e) => update("publications", e.target.value)}
                className="w-full border border-gray-200 rounded-input px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
              />
              <button
                onClick={openEpubs}
                className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-inner border border-primary text-primary text-xs font-bold bg-white"
              >
                <ExternalLink size={13} />
                Search AF e-Publishing (EPUBS)
              </button>
            </div>

            {/* Additional Duties */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">
                Additional Programs You Manage (select all that apply)
              </label>
              <p className="text-[10px] text-gray-400 mb-3">
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

        {/* Step 4 — AI Style */}
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
                  className={`text-left text-sm font-medium px-4 py-3.5 rounded-inner border transition-colors ${
                    form.aiStyle === opt.value
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-1">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1 px-4 py-3 rounded-inner border border-gray-200 bg-white text-sm font-semibold text-gray-600"
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className={`flex-1 flex items-center justify-center gap-1 py-3 rounded-inner text-sm font-bold transition-all ${
                canAdvance()
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={loading || !canAdvance()}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-inner text-sm font-bold transition-all ${
                loading || !canAdvance()
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-warm text-primary"
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
