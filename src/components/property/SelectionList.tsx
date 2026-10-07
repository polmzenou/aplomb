"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { properties } from "@/data/properties";
import { useFavorites } from "@/lib/favorites";
import { formatPrice } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Bookmark } from "@/components/ui/Icons";
import { useToast } from "@/components/ui/Toast";
import { PropertyCard } from "./PropertyCard";

export function SelectionList() {
  const t = useTranslations("selection");
  const locale = useLocale();
  const toast = useToast();
  const { favorites, clear } = useFavorites();
  const list = properties.filter((p) => favorites.includes(p.slug));
  const total = list.reduce((s, p) => s + p.price, 0);

  if (list.length === 0) {
    return (
      <div className="container-x pb-24">
        <div className="graph-paper flex flex-col items-start gap-8 border border-dashed border-ink p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div className="flex items-start gap-6">
            <Bookmark className="h-10 w-8 shrink-0 text-terra" />
            <p className="max-w-lg text-lg text-graphite">{t("empty")}</p>
          </div>
          <ButtonLink href="/biens">{t("emptyCta")}</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x pb-24">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-y border-ink py-4">
        <p className="mono text-[0.7rem] uppercase tracking-[0.14em]">
          <span className="text-mute">{t("total")} · </span>
          {formatPrice(total, locale)}
        </p>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => {
              clear();
              toast(t("cleared"));
            }}
            className="mono text-[0.66rem] uppercase tracking-[0.14em] underline-offset-4 hover:underline"
          >
            {t("clear")}
          </button>
          <ButtonLink href="/contact" variant="ink">
            {t("contact")}
          </ButtonLink>
        </div>
      </div>
      <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
              <PropertyCard property={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
