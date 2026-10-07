"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import type { Property } from "@/data/types";
import { img } from "@/lib/images";
import { formatPrice, tr } from "@/lib/utils";
import { DarkHeader } from "@/components/layout/HeaderTheme";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useToast } from "@/components/ui/Toast";
import { CompareButton, FavoriteButton } from "./PropertyActions";
import { StatusBadge } from "./PropertyCard";

export function PropertyHero({ property: p, crumbs }: { property: Property; crumbs: { home: string; list: string } }) {
  const locale = useLocale();
  const t = useTranslations("property");
  const c = useTranslations("common");
  const toast = useToast();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: p.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast(c("linkCopied"));
      }
    } catch {
      /* share sheet dismissed */
    }
  };

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <DarkHeader />
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y, scale }}>
        <Image src={img(p.cover, 2200)} alt={p.title} fill priority sizes="100vw" className={p.status === "sold" ? "object-cover grayscale" : "object-cover"} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
      <div className="container-x relative flex h-full flex-col justify-between pb-10 pt-[calc(var(--header-h)+2rem)]">
        <Breadcrumbs
          dark
          items={[
            { label: crumbs.home, href: "/" },
            { label: crumbs.list, href: "/biens" },
            { label: p.title },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <StatusBadge status={p.status} />
              <span className="mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/70">
                {c(`types.${p.type}`)} · {p.city} · {tr(p.area, locale)}
              </span>
            </div>
            <motion.h1
              className="display text-[clamp(3rem,9vw,9rem)]"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {p.title}
            </motion.h1>
            <p className="accent mt-3 text-[clamp(1.5rem,3vw,2.6rem)] leading-tight text-terra-soft">{tr(p.tagline, locale)}</p>
          </div>
          <div className="flex flex-col gap-6 border-t border-paper/25 pt-6 lg:col-span-4">
            <div>
              <p className="eyebrow mb-2 text-paper/55">{t("price")}</p>
              <p className="mono text-[clamp(1.8rem,3vw,2.6rem)] leading-none">{formatPrice(p.price, locale)}</p>
              <p className="mono mt-2 text-[0.66rem] text-paper/55">
                {t("perSqm", { price: formatPrice(Math.round(p.price / p.surface), locale) })} · {t("feesIncluded")}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-paper">
              <FavoriteButton slug={p.slug} title={p.title} withLabel />
              <CompareButton slug={p.slug} withLabel />
              <button type="button" onClick={share} className="mono text-[0.68rem] uppercase tracking-[0.14em] underline-offset-4 hover:underline">
                {c("share")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
