"use client";

import { useState } from "react";
import { Search, Copy, Check, Clock, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";
import { PROMPTS, CATEGORIES, type PromptCategory } from "@/lib/mock/prompts";

const categoryColors: Record<PromptCategory, string> = {
  Admin: "bg-blue-100 text-blue-700",
  Comms: "bg-purple-100 text-purple-700",
  Training: "bg-green-100 text-green-700",
  Operations: "bg-orange-100 text-orange-700",
  Logistics: "bg-yellow-100 text-yellow-700",
  Intel: "bg-red-100 text-red-700",
};

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<PromptCategory | "All">("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = PROMPTS.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
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
      <div className="bg-[#003087] text-white px-5 pt-8 pb-5">
        <h1
          className="text-2xl font-black uppercase tracking-tight mb-1"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          Prompt Library
        </h1>
        <p className="text-sm text-blue-200">
          Copy a prompt, fill in the brackets, paste into any AI tool.
        </p>
      </div>

      {/* Gold accent bar */}
      <div className="h-1 bg-[#FFC72C]" />

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 focus:border-[#003087]"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="px-4 pt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {(["All", ...CATEGORIES] as (PromptCategory | "All")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              activeCategory === cat
                ? "bg-[#003087] text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-gray-500 font-medium">
          {filtered.length} prompt{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
        </p>
      </div>

      {/* Prompt cards */}
      <div className="px-4 flex flex-col gap-3 pb-4">
        {filtered.map((prompt) => {
          const isExpanded = expandedId === prompt.id;
          const isCopied = copiedId === prompt.id;
          return (
            <div key={prompt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Card header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : prompt.id)}
                className="w-full text-left p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[prompt.category]}`}>
                        {prompt.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                        <Clock size={10} />
                        saves {prompt.timeSaved}
                      </span>
                      {prompt.sensitive && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          <ShieldAlert size={10} />
                          Sensitive
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-[#002554] leading-tight">{prompt.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{prompt.description}</p>
                  </div>
                  <div className="flex-shrink-0 mt-1 text-gray-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </button>

              {/* Expanded prompt */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  <div className="mt-3 bg-[#F4F6F9] rounded-xl p-3 relative">
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
                      {prompt.prompt}
                    </p>
                  </div>
                  {prompt.sensitive && (
                    <p className="mt-2 flex items-start gap-1.5 text-[10px] font-semibold text-amber-800">
                      <ShieldAlert size={11} className="flex-shrink-0 mt-px" />
                      Use a NIPR-approved tool only. Do not enter CUI, classified, or PII.
                    </p>
                  )}
                  <button
                    onClick={() => handleCopy(prompt.id, prompt.prompt)}
                    className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isCopied
                        ? "bg-green-500 text-white"
                        : "bg-[#003087] text-white active:bg-[#002554]"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={15} /> Copied to clipboard
                      </>
                    ) : (
                      <>
                        <Copy size={15} /> Copy Prompt
                      </>
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
