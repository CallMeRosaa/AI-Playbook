"use client";

import { useState } from "react";
import { ExternalLink, Shield, Wifi, Globe } from "lucide-react";
import { TOOLS, USE_CASES, type AccessLevel, type UseCase } from "@/lib/mock/tools";

const accessBadge: Record<AccessLevel, { label: string; color: string; icon: typeof Shield }> = {
  NIPR:       { label: "Approved – Official Use (NIPR)",   color: "bg-success-tint text-success-mid", icon: Shield },
  Commercial: { label: "Personal Use Only – Unclassified", color: "bg-caution-tint text-caution-mid", icon: Globe  },
  Both:       { label: "Official + Personal",              color: "bg-primary-tint text-primary",      icon: Wifi   },
};

const accessFilterLabel: Record<AccessLevel | "All", string> = {
  All:        "All",
  NIPR:       "Official (NIPR)",
  Commercial: "Personal Use Only",
  Both:       "Official + Personal",
};

export default function ToolsPage() {
  const [activeAccess, setActiveAccess] = useState<AccessLevel | "All">("All");
  const [activeUseCase, setActiveUseCase] = useState<UseCase | "All">("All");

  const filtered = TOOLS.filter((t) => {
    const matchesAccess = activeAccess === "All" || t.accessLevel === activeAccess;
    const matchesUseCase = activeUseCase === "All" || t.useCases.includes(activeUseCase);
    return matchesAccess && matchesUseCase;
  });

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-primary-dark text-white px-5 pt-8 pb-5">
        <h1
          className="text-2xl font-black uppercase tracking-tight mb-1"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          AI Tool Catalog
        </h1>
        <p className="text-sm text-blue-200">
          Know what&apos;s available, what it does, and when to use it.
        </p>
      </div>

      {/* Gold accent bar */}
      <div className="h-1 bg-warm" />

      {/* Access filter */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Filter by access</p>
        <div className="flex gap-2 overflow-x-auto">
          {(["All", "NIPR", "Commercial", "Both"] as (AccessLevel | "All")[]).map((a) => (
            <button
              key={a}
              onClick={() => setActiveAccess(a)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-badge transition-colors ${
                activeAccess === a
                  ? "bg-primary-dark text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {accessFilterLabel[a]}
            </button>
          ))}
        </div>
      </div>

      {/* Use case filter */}
      <div className="px-4 pt-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Filter by use case</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(["All", ...USE_CASES] as (UseCase | "All")[]).map((u) => (
            <button
              key={u}
              onClick={() => setActiveUseCase(u)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-badge transition-colors ${
                activeUseCase === u
                  ? "bg-warm text-primary-dark"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-gray-500 font-medium">{filtered.length} tool{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Tool cards */}
      <div className="px-4 flex flex-col gap-3 pb-4">
        {filtered.map((tool) => {
          const badge = accessBadge[tool.accessLevel];
          const BadgeIcon = badge.icon;
          return (
            <div key={tool.id} className="bg-white rounded-card shadow-resting border border-gray-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="text-2xl leading-none mt-0.5">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3 className="text-sm font-bold text-primary-dark">{tool.name}</h3>
                      {tool.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary text-white uppercase tracking-wide">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-primary font-semibold">{tool.tagline}</p>
                  </div>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 rounded-inner bg-background text-primary hover:bg-primary hover:text-white transition-colors"
                  aria-label={`Open ${tool.name}`}
                >
                  <ExternalLink size={15} />
                </a>
              </div>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{tool.description}</p>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-badge ${badge.color}`}>
                  <BadgeIcon size={10} />
                  {badge.label}
                </span>
                {tool.useCases.map((uc) => (
                  <span key={uc} className="text-[10px] font-medium px-2 py-1 rounded-badge bg-gray-100 text-gray-500">
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-sm font-medium">No tools match your filters</p>
            <button
              onClick={() => { setActiveAccess("All"); setActiveUseCase("All"); }}
              className="text-xs text-primary font-semibold mt-2"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-1 p-3 rounded-inner bg-warm/10 border border-warm/30">
          <p className="text-[10px] text-primary-dark leading-relaxed">
            <span className="font-bold">OPSEC reminder:</span> Never enter classified, CUI, or PII into commercial AI tools. Use NIPR-approved platforms for all sensitive work.
          </p>
        </div>
      </div>
    </div>
  );
}
