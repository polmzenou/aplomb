"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  date: string;
  version: number;
};

const STORAGE_KEY = "aplomb_consent";
const VERSION = 1;
const MAX_AGE_DAYS = 182;

type Ctx = {
  consent: Consent | null;
  ready: boolean;
  bannerOpen: boolean;
  preferencesOpen: boolean;
  save: (choice: { analytics: boolean; marketing: boolean }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const ConsentContext = createContext<Ctx | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside ConsentProvider");
  return ctx;
}

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    const age = (Date.now() - new Date(parsed.date).getTime()) / 86_400_000;
    if (parsed.version !== VERSION || age > MAX_AGE_DAYS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persist(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* storage unavailable: consent lives for this session only */
  }
  const value = `a${consent.analytics ? 1 : 0}m${consent.marketing ? 1 : 0}`;
  document.cookie = `${STORAGE_KEY}=${value}; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax`;
}

/**
 * Stores the visitor's cookie choices. Optional scripts must check
 * `consent.analytics` / `consent.marketing` before loading anything.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from browser storage after mount
    setConsent(read());
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.consentAnalytics = String(!!consent?.analytics);
    document.documentElement.dataset.consentMarketing = String(!!consent?.marketing);
  }, [consent]);

  const save = useCallback((choice: { analytics: boolean; marketing: boolean }) => {
    const next: Consent = { necessary: true, ...choice, date: new Date().toISOString(), version: VERSION };
    persist(next);
    setConsent(next);
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo<Ctx>(
    () => ({ consent, ready, bannerOpen: ready && !consent, preferencesOpen, save, openPreferences, closePreferences }),
    [consent, ready, preferencesOpen, save, openPreferences, closePreferences],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
