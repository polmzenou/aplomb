"use client";

import { useConsent } from "@/components/cookies/ConsentProvider";

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="mono mt-8 text-[0.66rem] uppercase tracking-[0.14em] underline underline-offset-4 hover:text-terra print:hidden">
      {label}
    </button>
  );
}

export function ManageCookiesButton({ label }: { label: string }) {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className="mono mt-6 bg-ink px-6 py-4 text-[0.7rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-terra">
      {label}
    </button>
  );
}
