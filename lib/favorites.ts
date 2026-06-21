"use client";

import { useCallback, useSyncExternalStore } from "react";

// ─── Favorites + run-tracking (IL2-safe personalization layer) ────────────────
// Mirrors lib/timeBack.ts exactly: localStorage is the external store, reads go
// through useSyncExternalStore, and changes broadcast via a custom in-tab event
// plus the native cross-tab storage event. Nothing identifying is stored — just
// the user's own starred items and the IDs of plays they have opened/run.

const STARRED_KEY = "ap.starred";
const STARRED_EVENT = "ap:starred-change";

const PLAYS_RUN_KEY = "ap.playsRun";
const PLAYS_RUN_EVENT = "ap:playsrun-change";

export type StarredType = "play" | "tool";

export interface StarredItem {
  type: StarredType;
  id: string;
  title: string;
  url: string;
}

// ─── Starred items ────────────────────────────────────────────────────────────

function readStarred(): StarredItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STARRED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StarredItem[]) : [];
  } catch {
    return [];
  }
}

function writeStarred(items: StarredItem[]): void {
  window.localStorage.setItem(STARRED_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(STARRED_EVENT));
}

export function isStarred(id: string): boolean {
  return readStarred().some((i) => i.id === id);
}

// Toggle an item's starred state. Returns true if it is now starred.
export function toggleStar(item: StarredItem): boolean {
  if (typeof window === "undefined") return false;
  const items = readStarred();
  const exists = items.some((i) => i.id === item.id);
  const next = exists ? items.filter((i) => i.id !== item.id) : [...items, item];
  writeStarred(next);
  return !exists;
}

export function removeStar(id: string): void {
  if (typeof window === "undefined") return;
  writeStarred(readStarred().filter((i) => i.id !== id));
}

// ─── Plays-run tracking ───────────────────────────────────────────────────────

function readPlaysRun(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PLAYS_RUN_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

// Record that a play was run. Stored as a set of unique IDs — count is the metric.
export function markPlayRun(id: string): void {
  if (typeof window === "undefined") return;
  const ids = readPlaysRun();
  if (ids.includes(id)) return;
  window.localStorage.setItem(PLAYS_RUN_KEY, JSON.stringify([...ids, id]));
  window.dispatchEvent(new Event(PLAYS_RUN_EVENT));
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

function makeSubscribe(event: string) {
  return (onChange: () => void): (() => void) => {
    window.addEventListener(event, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(event, onChange);
      window.removeEventListener("storage", onChange);
    };
  };
}

const subscribeStarred = makeSubscribe(STARRED_EVENT);
const subscribePlaysRun = makeSubscribe(PLAYS_RUN_EVENT);

const EMPTY_ITEMS: StarredItem[] = [];

// Live-updating favorites. Server snapshot is a stable empty array so static
// prerender and the first client paint agree.
export function useFavorites(): {
  items: StarredItem[];
  toggle: (item: StarredItem) => void;
  remove: (id: string) => void;
} {
  const items = useSyncExternalStore(subscribeStarred, readStarred, () => EMPTY_ITEMS);
  const toggle = useCallback((item: StarredItem) => { toggleStar(item); }, []);
  const remove = useCallback((id: string) => { removeStar(id); }, []);
  return { items, toggle, remove };
}

// Returns whether a single id is starred, live-updating.
export function useIsStarred(id: string): boolean {
  return useSyncExternalStore(
    subscribeStarred,
    () => isStarred(id),
    () => false,
  );
}

// Live count of unique plays run.
export function usePlaysRun(): number {
  return useSyncExternalStore(
    subscribePlaysRun,
    () => readPlaysRun().length,
    () => 0,
  );
}
