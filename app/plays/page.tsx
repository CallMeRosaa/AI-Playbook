"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  Copy, Check, Clock, ChevronDown, ChevronUp, ShieldAlert, CheckSquare, Wrench, Timer,
} from "lucide-react";
import { AFSC_TILES, orderPlays, renderStarter, TIME_BACK_OPTIONS, type Play } from "@/lib/plays";
import { addMinutes } from "@/lib/timeBack";
import SurfaceRouting from "@/components/SurfaceRouting";

// The selected AFSC is persisted in localStorage (the external store) and read via
// useSyncExternalStore so static prerender (null) and the client agree on first paint.
const AFSC_STORAGE_KEY = "ap.selectedAfsc";
const AFSC_EVENT = "ap:afsc-change";

function subscribeAfsc(onChange: () => void): () => void {
  window.addEventListener(AFSC_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(AFSC_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readAfsc(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AFSC_STORAGE_KEY);
}

function writeAfsc(code: string | null): void {
  if (code) window.localStorage.setItem(AFSC_STORAGE_KEY, code);
  else window.localStorage.removeItem(AFSC_STORAGE_KEY);
  window.dispatchEvent(new Event(AFSC_EVENT));
}

function PlayCard({ play }: { play: Play }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logged, setLogged] = useState(false);

  const starter = useMemo(() => renderStarter(play), [play]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(starter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTimeBack = (minutes: number) => {
    addMinutes(minutes);
    setLogged(true);
    setTimeout(() => setLogged(false), 2500);
  };

  return (
    <div className="bg-white rounded-card shadow-resting border border-silver-mid/50 hover:shadow-hover hover:border-primary/25 overflow-hidden transition-all duration-base ease-smooth">
      {/* 1. Title + one-line task */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left p-5"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {play.afsc && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-badge bg-primary-tint text-primary">
                  {play.afsc}
                </span>
              )}
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-badge bg-gray-100 text-gray-500">
                <Clock size={9} />
                {play.timeBack}
              </span>
            </div>
            <h3 className="text-sm font-bold text-primary-dark leading-tight">{play.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{play.task}</p>
          </div>
          <div className="flex-shrink-0 mt-1 text-gray-400">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-silver-mid/40">
          {/* 2. Copyable starter prompt */}
          <p className="text-[10px] font-bold uppercase tracking-wider text-silver mt-3 mb-1.5">
            Starter prompt
          </p>
          <div className="bg-background rounded-inner p-3">
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">{starter}</p>
          </div>
          <button
            onClick={handleCopy}
            className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-inner text-sm font-semibold transition-all ${
              copied ? "bg-success text-white" : "bg-primary text-white active:bg-primary-dark"
            }`}
          >
            {copied ? (
              <><Check size={15} /> Copied to clipboard</>
            ) : (
              <><Copy size={15} /> Copy starter prompt</>
            )}
          </button>

          {/* 3. Approved tool line */}
          <div className="mt-3 flex items-start gap-2 text-xs text-primary-dark">
            <Wrench size={14} className="flex-shrink-0 mt-0.5 text-primary" />
            <span className="leading-snug">{play.approvedTool}</span>
          </div>

          {/* 4. Never-paste safety bar */}
          <div className="mt-3 flex items-start gap-2 rounded-inner bg-danger-tint border border-danger/30 px-3 py-2.5">
            <ShieldAlert size={15} className="flex-shrink-0 mt-0.5 text-danger-mid" />
            <p className="text-xs font-semibold text-danger-mid leading-snug">{play.neverPaste}</p>
          </div>

          {/* 5. Verify step — required-looking checklist item */}
          <div className="mt-3 flex items-start gap-2 rounded-inner bg-warm/10 border border-warm/40 px-3 py-2.5">
            <CheckSquare size={15} className="flex-shrink-0 mt-0.5 text-warm-dark" />
            <p className="text-xs font-semibold text-primary-dark leading-snug">
              <span className="uppercase tracking-wide text-[10px] text-warm-dark block">Verify before official use</span>
              {play.verify}
            </p>
          </div>

          {/* 7. Where to run this */}
          <SurfaceRouting />

          {/* 8. Time-back capture */}
          <div className="mt-4 pt-3 border-t border-silver-mid/40">
            {logged ? (
              <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-success py-1.5">
                <Check size={14} /> Logged. See your tally on Home.
              </p>
            ) : (
              <>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 mb-2">
                  <Timer size={12} /> This saved me about
                </p>
                <div className="flex gap-2">
                  {TIME_BACK_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleTimeBack(opt.minutes)}
                      className="flex-1 py-2 rounded-inner text-xs font-bold bg-white border border-primary/40 text-primary active:bg-primary/5 transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                  Self-reported estimate, saved on this device only.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlaysPage() {
  const selectedAfsc = useSyncExternalStore(subscribeAfsc, readAfsc, () => null);

  const selectAfsc = (code: string) => {
    writeAfsc(selectedAfsc === code ? null : code);
  };

  const plays = useMemo(() => orderPlays(selectedAfsc), [selectedAfsc]);

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
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider mb-1">Play Shelf</h1>
        <p className="text-sm text-on-dark">
          Pick your job, copy the safe starting move, go run it on GenAI.mil.
        </p>
      </div>

      <div className="h-px bg-silver-mid" />

      {/* AFSC tiles */}
      <div className="px-4 pt-4">
        <p className="text-[10px] font-bold text-silver uppercase tracking-wider mb-2">Pick your AFSC</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {AFSC_TILES.map((tile) => {
            const active = selectedAfsc === tile.code;
            return (
              <button
                key={tile.code}
                onClick={() => selectAfsc(tile.code)}
                aria-pressed={active}
                className={`flex-shrink-0 min-w-[88px] rounded-card px-3 py-2.5 border text-center transition-all duration-base ease-smooth ${
                  active
                    ? "bg-primary border-primary text-white shadow-resting"
                    : "bg-white border-silver-mid/60 text-primary-dark active:bg-primary/5"
                }`}
              >
                <span className="block font-display font-bold tracking-wider text-sm leading-tight">{tile.code}</span>
                <span className={`block text-[10px] font-semibold leading-tight ${active ? "text-on-dark" : "text-gray-500"}`}>
                  {tile.nickname}
                </span>
              </button>
            );
          })}
        </div>
        {selectedAfsc && (
          <button
            onClick={() => selectAfsc(selectedAfsc)}
            className="text-[11px] text-primary font-semibold mt-2"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Context line */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-gray-500 font-medium">
          {selectedAfsc
            ? `${selectedAfsc} plays first, then the universal and everyday plays.`
            : "Universal plays everyone uses, then everyday writing tasks. Pick a tile to surface your job's plays."}
        </p>
      </div>

      {/* Play cards */}
      <div className="px-4 flex flex-col gap-3 pb-4">
        {plays.map((play) => (
          <PlayCard key={play.id} play={play} />
        ))}

        <p className="text-[10px] text-gray-400 text-center leading-relaxed px-4 pt-1 pb-2">
          Plays are examples for a concept demonstration. Time figures are self-reported estimates. Verify every
          output before official use.
        </p>
      </div>
    </div>
  );
}
