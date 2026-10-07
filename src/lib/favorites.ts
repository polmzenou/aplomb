"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "aplomb_selection";
const EVENT = "aplomb:selection";
const EMPTY: string[] = [];
let cache: { raw: string | null; value: string[] } = { raw: null, value: EMPTY };

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.value;
    const value = raw ? (JSON.parse(raw) as string[]) : EMPTY;
    cache = { raw, value: Array.isArray(value) ? value : EMPTY };
    return cache.value;
  } catch {
    return EMPTY;
  }
}

function write(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* storage unavailable: selection is not persisted */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Shortlisted property slugs, persisted in localStorage and synced across tabs. */
export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback((slug: string) => {
    const current = read();
    write(current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]);
  }, []);
  const clear = useCallback(() => write([]), []);
  return { favorites, toggle, clear, has: (slug: string) => favorites.includes(slug) };
}
