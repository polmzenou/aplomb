"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/data/content";
import { pad, tr } from "@/lib/utils";
import { Chevron } from "@/components/ui/Icons";

/** Rotating quotes with a progress bar; pauses on hover or focus. */
export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const c = useTranslations("common");
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = testimonials[index];
  const go = (dir: number) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <section
      className="graph-paper border-y border-line bg-paper-2 py-24 md:py-32"
      aria-roledescription="carousel"
      aria-label={t("eyebrow")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">
            <span className="mr-4 text-terra">07</span>
            {t("eyebrow")}
          </p>
          <p className="display text-4xl">{t("title")}</p>
          <div className="mt-10 flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label={c("prev")} className="flex h-11 w-11 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper">
              <Chevron className="h-3.5 w-2.5 rotate-180" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={c("next")} className="flex h-11 w-11 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper">
              <Chevron className="h-3.5 w-2.5" />
            </button>
            <span className="mono ml-3 text-xs tabular-nums">
              {pad(index + 1)} / {pad(testimonials.length)}
            </span>
          </div>
        </div>
        <div className="relative min-h-[18rem] md:col-span-8 md:col-start-5" aria-live="polite">
          <span className="accent pointer-events-none absolute -left-2 -top-16 text-[10rem] leading-none text-terra/25" aria-hidden="true">
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.figure key={index} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <blockquote className="accent text-[clamp(1.6rem,3vw,2.7rem)] leading-[1.2]">{tr(item.quote, locale)}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-ink" />
                <span className="font-semibold">{item.name}</span>
                <span className="mono text-[0.7rem] uppercase tracking-[0.12em] text-mute">{tr(item.context, locale)}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-12 flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} type="button" onClick={() => setIndex(i)} aria-label={`${i + 1}`} aria-current={i === index} className="relative h-1 flex-1 overflow-hidden bg-line">
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-0 origin-left bg-ink"
                    initial={{ scaleX: paused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: paused ? 0 : 7, ease: "linear" }}
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-ink/40" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
