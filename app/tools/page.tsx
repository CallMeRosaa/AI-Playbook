"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { ExternalLink, Shield, Clock, Check, Monitor, Star } from "lucide-react";
import { TOOLS, USE_CASES, SECTIONS, type UseCase, type Section, type Tool } from "@/lib/mock/tools";
import StarToggle from "@/components/StarToggle";
import ContextModeToggle from "@/components/ContextModeToggle";
import { useMode } from "@/lib/mode";
import { useIsStarred, toggleStar, type StarredItem } from "@/lib/favorites";

// Every tool on this page is approved for official use. One badge, one meaning.
const APPROVED_BADGE = {
  label: "Approved for official use, verify locally",
  color: "bg-success-tint text-success-mid",
};

const sectionFilterLabel: Record<Section | "All", string> = {
  All:        "All",
  ai:         "AI",
  automation: "Automation",
  data:       "Data",
  digital:    "Digital",
  soon:       "Coming Soon",
};

const USE_CASE_OPTIONS = (["All", ...USE_CASES] as (UseCase | "All")[]);
const SECTION_OPTIONS = (["All", ...SECTIONS.map((s) => s.id)] as (Section | "All")[]);

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

// Save-to-dashboard action for desktop/NIPR-only tools the Airman can't open here.
// Reuses the favorites store, so it stays in sync with the card's star (ADR-R07 —
// replaces the retired "Send to me" relay with an in-app save; honesty over dead links).
function SaveToDashboard({ item }: { item: StarredItem }) {
  const saved = useIsStarred(item.id);
  return (
    <button
      onClick={() => toggleStar(item)}
      aria-pressed={saved}
      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-inner text-sm font-semibold transition-colors ${
        saved ? "bg-success text-white" : "bg-white border border-primary/40 text-primary active:bg-primary/5"
      }`}
    >
      {saved ? (
        <><Check size={15} /> Saved to your dashboard</>
      ) : (
        <><Star size={15} /> Save to your dashboard</>
      )}
    </button>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const mode = useMode();

  const live = !tool.inDevelopment && !!tool.url;
  const workstationOnly = !tool.accessibleMobile;
  // Openable here when the tool works on any device, or when the Airman says they are
  // at a workstation (ADR-R08). Otherwise offer "Save to your dashboard" so they can
  // run it later at a workstation.
  const canOpen = live && (tool.accessibleMobile || mode === "workstation");

  return (
    <div
      className="animate-fade-up bg-white rounded-card shadow-resting border border-silver-mid/50 hover:shadow-hover hover:border-primary/25 p-5 transition-all duration-base ease-smooth"
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
        <StarToggle
          item={{ type: "tool", id: tool.id, title: tool.name, url: tool.url }}
          className="-mr-1.5 -mt-1"
        />
      </div>

      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{tool.description}</p>

      {workstationOnly && !canOpen && (
        <p className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 mt-2">
          <Monitor size={11} /> Open this one from your government workstation.
        </p>
      )}

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-badge ${APPROVED_BADGE.color}`}>
          <Shield size={10} />
          {APPROVED_BADGE.label}
        </span>
        {tool.useCases.map((uc) => (
          <span key={uc} className="text-[10px] font-medium px-2 py-1 rounded-badge bg-gray-100 text-gray-500">
            {uc}
          </span>
        ))}
      </div>

      {/* Device-aware action — ADR-R08 mode drives open vs. save */}
      <div className="mt-4">
        {!live ? (
          <span className="w-full flex items-center justify-center gap-2 py-2.5 rounded-inner text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed">
            <Clock size={15} /> Coming soon
          </span>
        ) : canOpen ? (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-inner text-sm font-semibold bg-primary text-white active:bg-primary-dark transition-colors"
          >
            <ExternalLink size={15} /> Open tool
          </a>
        ) : (
          <SaveToDashboard item={{ type: "tool", id: tool.id, title: tool.name, url: tool.url }} />
        )}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const [activeSection, setActiveSection] = useState<Section | "All">("All");
  const [activeUseCase, setActiveUseCase] = useState<UseCase | "All">("All");
  const [fading, setFading] = useState(false);
  const [displaySection, setDisplaySection] = useState<Section | "All">("All");
  const [displayUseCase, setDisplayUseCase] = useState<UseCase | "All">("All");

  const applyFilter = useCallback((sec: Section | "All", uc: UseCase | "All") => {
    setFading(true);
    setTimeout(() => {
      setDisplaySection(sec);
      setDisplayUseCase(uc);
      setFading(false);
    }, 130);
  }, []);

  const handleSection = (s: Section | "All") => {
    setActiveSection(s);
    applyFilter(s, activeUseCase);
  };

  const handleUseCase = (u: UseCase | "All") => {
    setActiveUseCase(u);
    applyFilter(activeSection, u);
  };

  const matchesFilters = (t: Tool) => {
    const matchesSection = displaySection === "All" || t.section === displaySection;
    const matchesUseCase = displayUseCase === "All" || t.useCases.includes(displayUseCase);
    return matchesSection && matchesUseCase;
  };

  const filtered = TOOLS.filter(matchesFilters);

  // Group surviving tools by section, preserving SECTIONS order and dropping empties.
  const groupedSections = SECTIONS
    .map((s) => ({ ...s, tools: filtered.filter((t) => t.section === s.id) }))
    .filter((s) => s.tools.length > 0);

  // Running index across sections keeps the fade-up cascade smooth.
  let cardIndex = 0;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="hero-af text-white px-5 pt-5 pb-5 overflow-hidden rounded-b-[24px]">
        <div className="flex items-center gap-3 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/af-symbol-white.svg" alt="U.S. Air Force" className="h-6 flex-shrink-0" draggable={false} />
          <div className="w-px h-5 bg-silver/40 flex-shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-on-dark-dim">Airman&apos;s Playbook</span>
        </div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider mb-1">
          AI Tools
        </h1>
        <p className="text-sm text-on-dark">
          Every tool on this page is approved for official use. Start at GenAI.mil for official, unclassified work.
        </p>
      </div>

      {/* Context mode — decides whether cards lead with "Open tool" or "Save" */}
      <div className="px-4 pt-4">
        <ContextModeToggle />
      </div>

      {/* Category filter */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-bold text-silver uppercase tracking-wider mb-2">Filter by category</p>
        <div className="overflow-x-auto">
          <SegmentedFilter
            options={SECTION_OPTIONS}
            labels={sectionFilterLabel}
            active={activeSection}
            onChange={handleSection}
            pillColor="bg-primary"
            activeTextColor="text-white"
          />
        </div>
      </div>

      {/* Use case filter */}
      <div className="px-4 pt-3">
        <p className="text-[10px] font-bold text-silver uppercase tracking-wider mb-2">Filter by use case</p>
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

      {/* Tool cards, grouped by section */}
      <div className={`px-4 flex flex-col gap-3 pb-4 filter-grid ${fading ? "fading" : ""}`}>
        {groupedSections.map((section) => (
          <div key={section.id} className="flex flex-col gap-3">
            <div className="mt-2 first:mt-0">
              <h2 className="text-xs font-bold text-primary-dark uppercase tracking-wider">{section.label}</h2>
              <p className="text-[11px] text-gray-500 mt-0.5">{section.blurb}</p>
            </div>
            {section.tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} index={cardIndex++} />
            ))}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-sm font-medium">No tools match your filters</p>
            <button
              onClick={() => { handleSection("All"); handleUseCase("All"); }}
              className="text-xs text-primary font-semibold mt-2"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-1 p-3 rounded-inner bg-primary/5 border border-primary/20">
          <p className="text-[10px] text-primary-dark leading-relaxed">
            <span className="font-bold">Reclaim hours:</span> the M365 tools chain together — <span className="font-semibold">Form → List → Power Automate → Power App / Power BI dashboard</span> — to automate the admin work you do by hand today.
          </p>
        </div>

        <div className="mt-1 p-3 rounded-inner bg-warm/10 border border-warm/30">
          <p className="text-[10px] text-primary-dark leading-relaxed">
            <span className="font-bold">OPSEC reminder:</span> Approved does not mean anything goes. Never enter classified information, and follow your local guidance on CUI and PII, even in approved tools.
          </p>
        </div>
      </div>
    </div>
  );
}
