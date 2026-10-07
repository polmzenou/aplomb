"use client";

import { fontVariables } from "@/lib/fonts";
import "./globals.css";

/** Last-resort error page, rendered outside the localized layout. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="drafting-grid flex min-h-dvh items-center bg-paper text-ink">
        <main className="container-x py-20">
          <p className="eyebrow mb-8 text-terra">Erreur 500 · Error 500</p>
          <h1 className="display text-[clamp(2.6rem,8vw,7rem)]">
            Un mur porteur
            <span className="accent block text-terra">a cédé.</span>
          </h1>
          <p className="accent mt-4 text-2xl text-graphite">A load-bearing wall gave way.</p>
          <p className="mt-8 max-w-lg text-graphite">
            Une erreur inattendue est survenue. Réessayez dans quelques instants. — An unexpected error occurred. Please try again in a moment.
          </p>
          <div className="mono mt-12 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.16em]">
            <button type="button" onClick={() => reset()} className="bg-ink px-7 py-4 text-paper transition-colors hover:bg-terra">
              Réessayer · Retry
            </button>
            {/* Plain anchor on purpose: the router may be unusable here. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="border border-ink px-7 py-4 transition-colors hover:bg-ink hover:text-paper">
              Accueil · Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
