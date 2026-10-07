"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { articles } from "@/data/content";
import { cn, tr } from "@/lib/utils";
import { ArticleCard } from "./ArticleCard";

export function JournalList() {
  const t = useTranslations("journal");
  const locale = useLocale();
  const [category, setCategory] = useState("all");
  const categories = [...new Map(articles.map((a) => [a.category.fr, a.category])).values()];
  const list = category === "all" ? articles : articles.filter((a) => a.category.fr === category);
  const [first, ...rest] = list;

  return (
    <div className="container-x pb-24">
      <div className="no-scrollbar mb-12 flex gap-1 overflow-x-auto border-y border-ink py-3" role="group" aria-label={t("eyebrow")}>
        {[{ fr: "all", en: "all" }, ...categories].map((cat) => (
          <button
            key={cat.fr}
            type="button"
            aria-pressed={category === cat.fr}
            onClick={() => setCategory(cat.fr)}
            className={cn("mono shrink-0 px-3 py-2 text-[0.66rem] uppercase tracking-[0.14em] transition-colors", category === cat.fr ? "bg-ink text-paper" : "hover:bg-paper-2")}
          >
            {cat.fr === "all" ? t("all") : tr(cat, locale)}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={category} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          {first && (
            <div className="mb-16 grid gap-8 border-b border-line pb-16 lg:grid-cols-12">
              <p className="eyebrow text-terra lg:col-span-2">{t("featured")}</p>
              <ArticleCard article={first} large className="lg:col-span-10" />
            </div>
          )}
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
