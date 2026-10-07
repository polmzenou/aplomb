import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Bilingual string. */
export type L = { fr: string; en: string };

export function tr(value: L, locale: string): string {
  return locale === "en" ? value.en : value.fr;
}

const intlLocale = (locale: string) => (locale === "en" ? "en-GB" : "fr-FR");

export function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** 2 450 000 € → "2,45 M€" */
export function formatPriceShort(value: number, locale: string) {
  if (value >= 1_000_000) {
    const n = new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 2 }).format(value / 1_000_000);
    return locale === "en" ? `€${n}M` : `${n} M€`;
  }
  return formatPrice(value, locale);
}

export function formatNumber(value: number, locale: string, digits = 0) {
  return new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: digits }).format(value);
}

export function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(intlLocale(locale), { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
