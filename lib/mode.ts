"use client";

import { useSyncExternalStore } from "react";

// ─── Context mode (workstation vs. mobile) — device-local, no identity ─────────
// ADR-R08: the same play renders differently depending on where the Airman is. At a
// workstation they can execute now; on the phone they are planning and discovering.
// One context question sets the mode. Stored in localStorage, changeable anytime,
// no account required. Mirrors lib/timeBack.ts: localStorage is the external store,
// reads go through useSyncExternalStore, changes broadcast via a custom in-tab event
// plus the native cross-tab storage event. Cross-device persistence arrives with the
// ADR-R07 profile, not before — this key is a seed for that future migration.

export type Mode = "workstation" | "mobile";

const STORAGE_KEY = "ap.mode";
const EVENT = "ap:mode-change";

export function readMode(): Mode | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "workstation" || raw === "mobile" ? raw : null;
}

export function writeMode(mode: Mode | null): void {
  if (typeof window === "undefined") return;
  if (mode) window.localStorage.setItem(STORAGE_KEY, mode);
  else window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(EVENT));
}

// Subscribe to changes from our custom in-tab event and cross-tab storage events.
function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Live-updating mode via useSyncExternalStore. Server snapshot is null so static
// prerender and the first client paint agree (then it resolves after hydration).
export function useMode(): Mode | null {
  return useSyncExternalStore(subscribe, readMode, () => null);
}
