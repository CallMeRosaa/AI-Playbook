"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { Search, Copy, Check, Clock, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";
import { PROMPTS, CATEGORIES, type PromptCategory } from "@/lib/mock/prompts";

const categoryColors: Record<PromptCategory, string> = {
  Admin:      "bg-blue-100 text-blue-700",
  Comms:      "bg-purple-100 text-purple-700",
  Training:   "bg-green-100 text-green-700",
  Operations: "bg-orange-100 text-orange-700",
  Logistics:  "bg-yellow-100 text-yellow-700",
  Intel:      "bg-red-100 text-red-700",
};

const categoryAccent: Record<PromptCategory, string> = {
  Admin:      "bg-primary",
  Comms:      "bg-purple-500",
  Training:   "bg-success",
  Operations: "bg-orange-500",
  Logistics:  "bg-yellow-500",
  Intel:      "bg-danger",
};

const ALL_CATS = ["All", ...CATEGORIES] as (PromptCategory | "All")[];

function SegmentedFilter({
  options,
  active,
  onChange,
  pillColor = "bg-primary",
  activeTextColor = "text-white",
}: {
  options: string[];
  active: string;
  onChange: (v: string) => void;
  pillColor?: string;
  activeTextColor?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const updatePill = useCallback(() => {
    const idx = options.indexOf(active);
    const btn = btnRefs.current[idx];
    const track = trackRef.current;
    if (!btn || !track) return;
    const trackRect = track.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPill({ left: btnRect.left - trackRect.left, width: btnRect.width });
  }, [active, options]);

  useLayoutEffect(() => { updatePill(); }, [updatePill]);

  return (
    <div ref={trackRef} className="seg-track">
      <div
        className={`seg-pill ${pillColor}`}
        style={{ left: pill.left, width: pill.width }}
      />
      {options.map((opt, i) => (
        <button
          key={opt}
          ref={el => { btnRefs.current[i] = el; }}
          onClick={() => onChange(opt)}
          className={`seg-btn ${active === opt ? activeTextColor : "text-gray-500"}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<PromptCategory | "All">("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const [displayCategory, setDisplayCategory] = useState<PromptCategory | "All">("All");
  const [displaySearch, setDisplaySearch] = useState("");

  const applyFilter = useCallback((cat: PromptCategory | "All", srch: string) => {
    setFading(true);
    setTimeout(() => {
      setDisplayCategory(cat);
      setDisplaySearch(srch);
      setFading(false);
    }, 130);
  }, []);

  const handleCategory = (cat: string) => {
    const c = cat as PromptCategory | "All";
    setActiveCategory(c);
    applyFilter(c, search);
  };

  const handleSearch = (s: string) => {
    setSearch(s);
    applyFilter(activeCategory, s);
  };

  const filtered = PROMPTS.filter((p) => {
    const matchesCategory = displayCategory === "All" || p.category === displayCategory;
    const matchesSearch =
      displaySearch.trim() === "" ||
      p.title.toLowerCase().includes(displaySearch.toLowerCase()) ||
      p.description.toLowerCase().includes(displaySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(displaySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="hero-af text-white px-5 pt-5 pb-5">
        {/* Symbol lockup — small mark + wordmark on same row */}
        <div className="flex items-center gap-3 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/af-symbol-white.svg" alt="U.S. Air Force" className="h-6 flex-shrink-0" draggable={false} />
          <div className="w-px h-5 bg-silver/40 flex-shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-on-dark-dim">Airman&apos;s Playbook</span>
        </div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider mb-1">
          Prompt Library
        </h1>
        <p className="text-sm text-on-dark">
          Copy a prompt, fill in the brackets, paste into any AI tool.
        </p>
      </div>

      {/* Silver accent bar — metallic separator */}
      <div className="h-px bg-silver-mid" />

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-input border border-silver-mid bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      {/* Category filter — segmented control */}
      <div className="px-4 pt-3 overflow-x-auto pb-1">
        <SegmentedFilter
          options={ALL_CATS}
          active={activeCategory}
          onChange={handleCategory}
          pillColor="bg-primary"
          activeTextColor="text-white"
        />
      </div>

      {/* Results count */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-gray-500 font-medium">
          {filtered.length} prompt{filtered.length !== 1 ? "s" : ""}
          {displayCategory !== "All" ? ` in ${displayCategory}` : ""}
        </p>
      </div>

      {/* Prompt cards */}
      <div className={`px-4 flex flex-col gap-3 pb-4 filter-grid ${fading ? "fading" : ""}`}>
        {filtered.map((prompt, index) => {
          const isExpanded = expandedId === prompt.id;
          const isCopied = copiedId === prompt.id;
          return (
            <div
              key={prompt.id}
              className="animate-fade-up bg-white rounded-card shadow-resting border border-silver-mid/50 hover:shadow-hover hover:border-primary/25 overflow-hidden transition-all duration-base ease-smooth"
              style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
            >
              <div className={`h-[3px] w-full ${categoryAccent[prompt.category]}`} />

              <button
                onClick={() => setExpandedId(isExpanded ? null : prompt.id)}
                className="w-full text-left p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-badge ${categoryColors[prompt.category]}`}>
                        {prompt.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-badge bg-gray-100 text-gray-500">
                        <Clock size={9} />
                        {prompt.timeSaved}
                      </span>
                      {prompt.sensitive && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-badge bg-caution-tint text-caution-mid">
                          <ShieldAlert size={10} />
                          Sensitive
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-primary-dark leading-tight">{prompt.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{prompt.description}</p>
                  </div>
                  <div className="flex-shrink-0 mt-1 text-gray-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-silver-mid/40">
                  <div className="mt-3 bg-background rounded-inner p-3 relative">
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
                      {prompt.prompt}
                    </p>
                  </div>
                  {prompt.sensitive && (
                    <p className="mt-2 flex items-start gap-1.5 text-[10px] font-semibold text-caution-mid">
                      <ShieldAlert size={11} className="flex-shrink-0 mt-px" />
                      Use a NIPR-approved tool only. Do not enter CUI, classified, or PII.
                    </p>
                  )}
                  <button
                    onClick={() => handleCopy(prompt.id, prompt.prompt)}
                    className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-inner text-sm font-semibold transition-all ${
                      isCopied
                        ? "bg-green-500 text-white"
                        : "bg-primary text-white active:bg-primary-dark"
                    }`}
                  >
                    {isCopied ? (
                      <><Check size={15} /> Copied to clipboard</>
                    ) : (
                      <><Copy size={15} /> Copy Prompt</>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <Search size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No prompts found</p>
            <p className="text-xs mt-1">Try a different search or category</p>
          </div>
        )}

        <p className="text-[10px] text-gray-400 text-center leading-relaxed px-4 pt-1 pb-2">
          * Time estimates are illustrative, based on typical task completion time. Individual results vary.
        </p>
      </div>
    </div>
  );
}
