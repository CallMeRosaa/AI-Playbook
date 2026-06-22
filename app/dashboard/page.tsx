"use client";

import Link from "next/link";
import { Layers, Wrench, Clock, Zap, X, Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useFavorites, usePlaysRun } from "@/lib/favorites";
import { useTimeBack, formatTimeBack } from "@/lib/timeBack";

// Play-type mix is mock data this pass — real breakdown lands with Inc 2 analytics.
const PLAY_TYPES = [
  { label: "Admin", value: 9, color: "bg-primary" },
  { label: "AFC", value: 5, color: "bg-tech" },
  { label: "Program", value: 3, color: "bg-warm-dark" },
  { label: "MFR", value: 2, color: "bg-silver" },
];

function PlayTypeBars() {
  const total = PLAY_TYPES.reduce((s, t) => s + t.value, 0) || 1;
  return (
    <div className="flex flex-col gap-2">
      {PLAY_TYPES.map((t) => (
        <div key={t.label} className="flex items-center gap-2">
          <span className="w-16 flex-shrink-0 text-[11px] font-semibold text-gray-600">{t.label}</span>
          <div className="flex-1 h-2.5 rounded-badge bg-silver-tint overflow-hidden">
            <div
              className={`h-full rounded-badge ${t.color}`}
              style={{ width: `${(t.value / total) * 100}%` }}
            />
          </div>
          <span className="w-5 flex-shrink-0 text-right text-[11px] font-bold text-primary-dark">{t.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { items, remove } = useFavorites();
  const playsRun = usePlaysRun();
  const { minutes } = useTimeBack();

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
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider mb-1">Dashboard</h1>
        <p className="text-sm text-on-dark">Your plays, your tools, your time back — saved on this device.</p>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-5 pb-6">
        {/* Metrics tiles */}
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-inner bg-primary/10">
                  <Zap size={14} className="text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Plays run</span>
              </div>
              <p className="text-2xl font-display font-bold text-primary-dark leading-none">{playsRun}</p>
            </div>
            <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-inner bg-primary/10">
                  <Clock size={14} className="text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Minutes saved</span>
              </div>
              <p className="text-2xl font-display font-bold text-primary-dark leading-none">{minutes}</p>
              <p className="text-[10px] text-gray-400 mt-1 leading-tight">{formatTimeBack(minutes)}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Play types breakdown */}
        <ScrollReveal>
          <div className="p-4 rounded-card bg-white border border-silver-mid/40 shadow-resting">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-silver">Play types</span>
              <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-badge bg-gray-100 text-gray-500">
                Sample data
              </span>
            </div>
            <PlayTypeBars />
          </div>
        </ScrollReveal>

        {/* Pinned links */}
        <ScrollReveal>
          <div>
            <p className="text-[10px] font-bold text-silver uppercase tracking-wider mb-2">Pinned shortcuts</p>
            {items.length === 0 ? (
              <div className="p-5 rounded-card bg-white border border-dashed border-silver-mid/70 text-center">
                <div className="inline-flex p-2.5 rounded-inner bg-silver-tint mb-2">
                  <Star size={18} className="text-silver" />
                </div>
                <p className="text-xs text-gray-500 leading-snug">
                  Star plays and tools to add them here.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {items.map((item) => {
                  const Icon = item.type === "play" ? Layers : Wrench;
                  const isExternal = item.url.startsWith("http");
                  const Inner = (
                    <div className="flex items-center gap-3 p-3 rounded-card bg-white border border-silver-mid/40 shadow-resting flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-inner bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-primary-dark leading-tight truncate">{item.title}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
                          {item.type === "play" ? "Play" : "Tool"}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <div key={item.id} className="flex items-stretch gap-2">
                      {item.url ? (
                        isExternal ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex flex-1 min-w-0">
                            {Inner}
                          </a>
                        ) : (
                          <Link href={item.url} className="flex flex-1 min-w-0">
                            {Inner}
                          </Link>
                        )
                      ) : (
                        Inner
                      )}
                      <button
                        onClick={() => remove(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="flex-shrink-0 w-9 flex items-center justify-center rounded-card bg-white border border-silver-mid/40 text-gray-400 hover:text-danger hover:border-danger/30 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
