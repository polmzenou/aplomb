"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { architects } from "@/data/architects";
import { properties } from "@/data/properties";
import { Link } from "@/i18n/navigation";
import { portrait } from "@/lib/images";
import { pad, tr } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Index of architects; a portrait follows the cursor over the hovered row. */
export function ArchitectsIndex() {
  const t = useTranslations("home.architects");
  const locale = useLocale();
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });

  return (
    <section className="container-x py-24 md:py-36">
      <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading index="06" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} intro={t("intro")} />
        <ButtonLink href="/architectes" variant="outline" className="self-start md:self-end">
          {t("cta")}
        </ButtonLink>
      </div>
      <ul
        className="relative border-t border-ink"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => setHover(null)}
      >
        {architects.map((a, i) => {
          const count = properties.filter((p) => p.architect === a.slug && p.status !== "sold").length;
          return (
            <li key={a.slug} onPointerEnter={() => setHover(i)} className="border-b border-line">
              <Link href="/architectes" className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[3rem_1.4fr_1fr_1fr_auto] md:py-8">
                <span className="mono text-xs text-terra">{pad(i + 1)}</span>
                <span className="display-tight text-[clamp(1.5rem,3.4vw,2.8rem)] transition-transform duration-500 ease-[var(--ease-out-arch)] group-hover:translate-x-3">{a.name}</span>
                <span className="accent hidden text-xl text-graphite md:block">{tr(a.signature, locale)}</span>
                <span className="mono hidden text-[0.7rem] uppercase tracking-[0.12em] text-mute md:block">
                  {a.base} · {count}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </li>
          );
        })}
        <AnimatePresence>
          {hover !== null && (
            <motion.div
              key="portrait"
              className="pointer-events-none absolute left-0 top-0 z-10 hidden h-64 w-52 overflow-hidden lg:block"
              style={{ x: sx, y: sy, translateX: "-50%", translateY: "-110%" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={hover} className="absolute inset-0" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}>
                  <Image src={portrait(architects[hover].portrait, 420)} alt="" fill sizes="208px" className="object-cover grayscale" />
                </motion.div>
              </AnimatePresence>
              <span className="mono absolute bottom-2 left-2 bg-paper px-1.5 py-0.5 text-[0.56rem] uppercase tracking-[0.12em]">{architects[hover].studio}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </section>
  );
}
