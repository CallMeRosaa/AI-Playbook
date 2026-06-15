"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
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

const ACCESS_OPTIONS = (["All", "NIPR", "Commercial", "Both"] as (AccessLevel | "All")[]);
const USE_CASE_OPTIONS = (["All", ...USE_CASES] as (UseCase | "All")[]);

function SegmentedFilter<T extends string>({
  options,
  labels,
  active,
  onChange,
  pillColor = "bg-primary-dark",
  activeTextColor = "text-white",
}: {
  options: T[];
  labels?: Record<T, string>;
  active: T;
  onChange: (v: T) => void;
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
          {labels ? labels[opt] : opt}
        </button>
      ))}
    </div>
  );
}

export default function ToolsPage() {
  const [activeAccess, setActiveAccess] = useState<AccessLevel | "All">("All");
  const [activeUseCase, setActiveUseCase] = useState<UseCase | "All">("All");
  const [fading, setFading] = useState(false);
  const [displayAccess, setDisplayAccess] = useState<AccessLevel | "All">("All");
  const [displayUseCase, setDisplayUseCase] = useState<UseCase | "All">("All");

  const applyFilter = useCallback((acc: AccessLevel | "All", uc: UseCase | "All") => {
    setFading(true);
    setTimeout(() => {
      setDisplayAccess(acc);
      setDisplayUseCase(uc);
      setFading(false);
    }, 130);
  }, []);

  const handleAccess = (a: AccessLevel | "All") => {
    setActiveAccess(a);
    applyFilter(a, activeUseCase);
  };

  const handleUseCase = (u: UseCase | "All") => {
    setActiveUseCase(u);
    applyFilter(activeAccess, u);
  };

  const filtered = TOOLS.filter((t) => {
    const matchesAccess = displayAccess === "All" || t.accessLevel === displayAccess;
    const matchesUseCase = displayUseCase === "All" || t.useCases.includes(displayUseCase);
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
        <div className="overflow-x-auto">
          <SegmentedFilter
            options={ACCESS_OPTIONS}
            labels={accessFilterLabel}
            active={activeAccess}
            onChange={handleAccess}
            pillColor="bg-primary-dark"
            activeTextColor="text-white"
          />
        </div>
      </div>

      {/* Use case filter */}
      <div className="px-4 pt-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Filter by use case</p>
        <div className="overflow-x-auto pb-1">
          <SegmentedFilter
            options={USE_CASE_OPTIONS}
            active={activeUseCase}
            onChange={handleUseCase}
            pillColor="bg-warm"
            activeTextColor="text-primary-dark"
          />
        </div>
      </div>

      {/* Count */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-gray-500 font-medium">{filtered.length} tool{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Tool cards */}
      <div className={`px-4 flex flex-col gap-3 pb-4 filter-grid ${fading ? "fading" : ""}`}>
        {filtered.map((tool, index) => {
          const badge = accessBadge[tool.accessLevel];
          const BadgeIcon = badge.icon;
          return (
            <div
              key={tool.id}
              className="animate-fade-up bg-white rounded-card shadow-resting border border-gray-100 hover:shadow-hover hover:border-primary/20 p-5 transition-all duration-base ease-smooth"
              style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
            >
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
              onClick={() => { handleAccess("All"); handleUseCase("All"); }}
              className="text-xs text-primary font-semibold mt-2"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-1 p-3 rounded-inner bg-warm/10 border border-warm/30">
          <p className="text-[10px] text-primary-dark leading-relaxed">
            <span className="font-bold">OPSEC reminder:</span> Never enter classified, CUI, or PII into commercial AI tools. Use NIPR-approved platforms for all sensitive work.
          </p>
        </div>
      </div>
    </div>
  );
}
