"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Copy, Check, Download, Sparkles, User } from "lucide-react";

const RANKS = [
  "AB", "Amn", "A1C", "SrA", "SSgt", "TSgt", "MSgt", "SMSgt", "CMSgt",
  "2Lt", "1Lt", "Capt", "Maj", "Lt Col", "Col", "Brig Gen", "Maj Gen", "Lt Gen", "Gen",
];

const DAILY_TOOLS = [
  "MS Outlook", "MS Teams", "SharePoint", "PowerPoint", "Excel", "Word",
  "GCSS-AF", "MyFSS", "Air Force Portal", "AROWS", "eMSO", "DTMS",
];

const AI_GOALS = [
  "Write faster (EPRs, emails, memos)",
  "Research and summarize regulations",
  "Build briefings and slide decks",
  "Analyze data and create reports",
  "Create training materials",
  "Draft SOPs and checklists",
  "Prepare for boards and interviews",
  "Manage my schedule and tasks",
];

interface FormData {
  rank: string;
  name: string;
  afsc: string;
  yearsOfService: string;
  installation: string;
  unit: string;
  billet: string;
  tasks: [string, string, string];
  tools: string[];
  aiGoals: string[];
  tone: string;
  outputFormat: string;
}

const initialForm: FormData = {
  rank: "",
  name: "",
  afsc: "",
  yearsOfService: "",
  installation: "",
  unit: "",
  billet: "",
  tasks: ["", "", ""],
  tools: [],
  aiGoals: [],
  tone: "Professional and direct",
  outputFormat: "Bullet points where possible",
};

const steps = [
  { title: "Identity", subtitle: "Who are you?" },
  { title: "Assignment", subtitle: "Where are you serving?" },
  { title: "Daily Work", subtitle: "What do you do?" },
  { title: "AI Goals", subtitle: "What do you want from AI?" },
  { title: "Your Style", subtitle: "How should AI talk to you?" },
];

export default function PersonaPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (field: keyof FormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleTool = (tool: string) => {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter((t) => t !== tool)
        : [...prev.tools, tool],
    }));
  };

  const toggleGoal = (goal: string) => {
    setForm((prev) => ({
      ...prev,
      aiGoals: prev.aiGoals.includes(goal)
        ? prev.aiGoals.filter((g) => g !== goal)
        : [...prev.aiGoals, goal],
    }));
  };

  const canAdvance = () => {
    if (step === 0) return form.rank && form.name && form.afsc;
    if (step === 1) return form.installation && form.unit && form.billet;
    if (step === 2) return form.tasks[0].trim();
    if (step === 3) return form.aiGoals.length > 0;
    if (step === 4) return form.tone;
    return true;
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setPersona(data.persona);
    } catch {
      setPersona("Error generating persona. Please try again.");
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
    a.download = `${form.name.replace(/\s+/g, "_")}_AI_Context_File.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setPersona(null);
    setStep(0);
    setForm(initialForm);
  };

  // Result screen
  if (persona) {
    return (
      <div className="flex flex-col">
        <div className="bg-[#FFC72C] px-5 pt-8 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-[#003087]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#003087]">
              Your AI Context File
            </span>
          </div>
          <h1
            className="text-2xl font-black uppercase tracking-tight text-[#003087] leading-tight"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
          >
            {form.rank} {form.name}
          </h1>
          <p className="text-sm text-[#002554]/80 mt-1">
            Paste this into any AI tool before your first message for dramatically better results.
          </p>
        </div>

        <div className="h-1 bg-[#003087]" />

        <div className="px-4 pt-4 flex flex-col gap-3">
          {/* The generated file */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">{persona}</pre>
          </div>

          {/* Actions */}
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
              copied ? "bg-green-500 text-white" : "bg-[#003087] text-white"
            }`}
          >
            {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy to Clipboard</>}
          </button>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-white border border-gray-200 text-[#003087]"
          >
            <Download size={16} /> Download as .txt
          </button>
          <button
            onClick={handleReset}
            className="text-xs text-gray-400 font-medium text-center py-2"
          >
            Start over
          </button>

          {/* Usage tip */}
          <div className="p-4 rounded-2xl bg-[#003087]/5 border border-[#003087]/10">
            <p className="text-xs text-[#002554] font-semibold mb-1">💡 How to use this file</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Copy and paste this entire file into the system prompt or first message of any AI tool —
              GenAI.mil, NIPRGPT, Claude, or ChatGPT. The AI will immediately understand your role
              and tailor every response to your needs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-[#FFC72C] px-5 pt-8 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <User size={18} className="text-[#003087]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#003087]">Persona Builder</span>
        </div>
        <h1
          className="text-2xl font-black uppercase tracking-tight text-[#003087] leading-tight"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          Build Your<br />AI Context File
        </h1>
        <p className="text-sm text-[#002554]/80 mt-1">
          5 quick steps. Better AI outputs every time.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-[#003087] px-4 py-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-white">
            Step {step + 1} of {steps.length}: {steps[step].title}
          </span>
          <span className="text-xs text-blue-300">{steps[step].subtitle}</span>
        </div>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-[#FFC72C]" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form steps */}
      <div className="px-4 pt-5 flex flex-col gap-4">
        {/* Step 0: Identity */}
        {step === 0 && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-1.5 uppercase tracking-wider">Rank *</label>
              <select
                value={form.rank}
                onChange={(e) => update("rank", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
              >
                <option value="">Select rank...</option>
                {RANKS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-1.5 uppercase tracking-wider">Name *</label>
              <input
                type="text"
                placeholder="First Last"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-1.5 uppercase tracking-wider">AFSC *</label>
              <input
                type="text"
                placeholder="e.g. 3D1X1"
                value={form.afsc}
                onChange={(e) => update("afsc", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-1.5 uppercase tracking-wider">Years of Service</label>
              <input
                type="number"
                placeholder="e.g. 6"
                min="0"
                max="40"
                value={form.yearsOfService}
                onChange={(e) => update("yearsOfService", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
              />
            </div>
          </>
        )}

        {/* Step 1: Assignment */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-1.5 uppercase tracking-wider">Installation *</label>
              <input
                type="text"
                placeholder="e.g. Joint Base San Antonio"
                value={form.installation}
                onChange={(e) => update("installation", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-1.5 uppercase tracking-wider">Unit / Organization *</label>
              <input
                type="text"
                placeholder="e.g. 90th Cyberspace Operations Squadron"
                value={form.unit}
                onChange={(e) => update("unit", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-1.5 uppercase tracking-wider">Current Billet / Role *</label>
              <input
                type="text"
                placeholder="e.g. Cyber Systems Operations Technician"
                value={form.billet}
                onChange={(e) => update("billet", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
              />
            </div>
          </>
        )}

        {/* Step 2: Daily Work */}
        {step === 2 && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-1.5 uppercase tracking-wider">
                Top 3 Recurring Tasks *
              </label>
              {([0, 1, 2] as const).map((i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={
                    i === 0 ? "e.g. Write and process trouble tickets"
                    : i === 1 ? "e.g. Maintain and patch servers"
                    : "e.g. Brief leadership on network status (optional)"
                  }
                  value={form.tasks[i]}
                  onChange={(e) => {
                    const updated: [string, string, string] = [...form.tasks];
                    updated[i] = e.target.value;
                    update("tasks", updated);
                  }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
                />
              ))}
            </div>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-2 uppercase tracking-wider">
                Daily Tools You Use
              </label>
              <div className="flex flex-wrap gap-2">
                {DAILY_TOOLS.map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                      form.tools.includes(tool)
                        ? "bg-[#003087] text-white border-[#003087]"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 3: AI Goals */}
        {step === 3 && (
          <div>
            <label className="block text-xs font-bold text-[#002554] mb-1 uppercase tracking-wider">
              What do you want AI to help with? *
            </label>
            <p className="text-xs text-gray-500 mb-3">Select all that apply.</p>
            <div className="flex flex-col gap-2">
              {AI_GOALS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`text-left text-sm font-medium px-4 py-3 rounded-xl border transition-colors ${
                    form.aiGoals.includes(goal)
                      ? "bg-[#003087] text-white border-[#003087]"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Style */}
        {step === 4 && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-2 uppercase tracking-wider">
                Preferred Tone *
              </label>
              <div className="flex flex-col gap-2">
                {[
                  "Professional and direct",
                  "Formal military (BLUF, headers, etc.)",
                  "Plain language (simple, conversational)",
                  "Technical and precise",
                ].map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => update("tone", tone)}
                    className={`text-left text-sm font-medium px-4 py-3 rounded-xl border transition-colors ${
                      form.tone === tone
                        ? "bg-[#FFC72C] text-[#002554] border-[#FFC72C]"
                        : "bg-white text-gray-700 border-gray-200"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#002554] mb-2 uppercase tracking-wider">
                Output Format
              </label>
              <div className="flex flex-col gap-2">
                {[
                  "Bullet points where possible",
                  "Short paragraphs",
                  "Tables and structured lists",
                  "Mix it up based on context",
                ].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => update("outputFormat", fmt)}
                    className={`text-left text-sm font-medium px-4 py-3 rounded-xl border transition-colors ${
                      form.outputFormat === fmt
                        ? "bg-[#FFC72C] text-[#002554] border-[#FFC72C]"
                        : "bg-white text-gray-700 border-gray-200"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-2 pb-2">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600"
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className={`flex-1 flex items-center justify-center gap-1 py-3 rounded-xl text-sm font-bold transition-all ${
                canAdvance()
                  ? "bg-[#003087] text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={loading || !canAdvance()}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                loading || !canAdvance()
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#FFC72C] text-[#003087]"
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
