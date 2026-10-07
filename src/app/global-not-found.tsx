import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — APLOMB Immobilier",
  description: "Page introuvable · Page not found",
  robots: { index: false },
};

/** 404 for URLs outside any locale. */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="drafting-grid relative flex min-h-dvh items-center overflow-hidden bg-paper text-ink">
        <span aria-hidden="true" className="display pointer-events-none absolute -bottom-[4vw] right-0 select-none text-[34vw] leading-none text-ink/[0.05]">
          404
        </span>
        <main className="container-x relative py-20">
          <p className="eyebrow mb-8 text-terra">Erreur 404 · Error 404</p>
          <h1 className="display text-[clamp(2.6rem,8vw,7rem)]">
            Ce plan
            <span className="accent block text-terra">n&apos;a jamais été construit.</span>
          </h1>
          <p className="accent mt-4 text-2xl text-graphite">This plan was never built.</p>
          <div className="mono mt-12 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.16em]">
            <Link href="/fr" className="bg-ink px-7 py-4 text-paper transition-colors hover:bg-terra">
              Accueil
            </Link>
            <Link href="/en" className="border border-ink px-7 py-4 transition-colors hover:bg-ink hover:text-paper">
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
