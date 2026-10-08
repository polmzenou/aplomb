"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { architects } from "@/data/architects";
import { properties, propertyTypes } from "@/data/properties";
import type { PropertyType } from "@/data/types";
import { cn, formatNumber, formatPriceShort, tr } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Grid, List, MapIcon, Plus } from "@/components/ui/Icons";
import { DualRange, Range } from "@/components/ui/RangeSlider";
import { FranceMap } from "./FranceMap";
import { PropertyCard } from "./PropertyCard";

type Sort = "featured" | "priceAsc" | "priceDesc" | "surfaceDesc" | "recent";
type View = "grid" | "list" | "map";

const PRICE_MIN = 1_000_000;
const PRICE_MAX = 5_000_000;
const PRICE_STEP = 50_000;

const defaults = {
  type: "all" as PropertyType | "all",
  area: "all",
  price: [PRICE_MIN, PRICE_MAX] as [number, number],
  surface: 100,
  bedrooms: 0,
  architect: "all",
  hideSold: false,
};

export function PropertyExplorer() {
  const t = useTranslations("properties");
  const c = useTranslations("common");
  const locale = useLocale();
  const [filters, setFilters] = useState(defaults);
  const [sort, setSort] = useState<Sort>("featured");
  const [view, setView] = useState<View>("grid");
  const [panel, setPanel] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const set = <K extends keyof typeof defaults>(key: K, value: (typeof defaults)[K]) => setFilters((f) => ({ ...f, [key]: value }));

  const areas = useMemo(() => [...new Map(properties.map((p) => [p.area.fr, p.area])).values()], []);

  const results = useMemo(() => {
    const list = properties.filter(
      (p) =>
        (filters.type === "all" || p.type === filters.type) &&
        (filters.area === "all" || p.area.fr === filters.area) &&
        p.price >= filters.price[0] &&
        (filters.price[1] >= PRICE_MAX || p.price <= filters.price[1]) &&
        p.surface >= filters.surface &&
        (filters.bedrooms === 0 || p.bedrooms >= filters.bedrooms) &&
        (filters.architect === "all" || p.architect === filters.architect) &&
        (!filters.hideSold || p.status !== "sold"),
    );
    const sorted = [...list];
    if (sort === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "surfaceDesc") sorted.sort((a, b) => b.surface - a.surface);
    if (sort === "recent") sorted.sort((a, b) => (b.renovated ?? b.year) - (a.renovated ?? a.year));
    if (sort === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(a.status === "sold") - Number(b.status === "sold"));
    return sorted;
  }, [filters, sort]);

  const activeCount = (Object.keys(defaults) as (keyof typeof defaults)[]).filter((k) => JSON.stringify(filters[k]) !== JSON.stringify(defaults[k])).length;

  const views: { key: View; Icon: typeof Grid }[] = [
    { key: "grid", Icon: Grid },
    { key: "list", Icon: List },
    { key: "map", Icon: MapIcon },
  ];

  return (
    <div>
      {/* toolbar */}
      <div className="sticky top-0 z-30 border-y border-ink bg-paper/95 backdrop-blur-md">
        <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
          <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto" role="group" aria-label={t("filters.type")}>
            {(["all", ...propertyTypes] as const).map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={filters.type === type}
                onClick={() => set("type", type)}
                className={cn(
                  "mono shrink-0 px-3 py-2 text-[0.66rem] uppercase tracking-[0.14em] transition-colors",
                  filters.type === type ? "bg-ink text-paper" : "hover:bg-paper-2",
                )}
              >
                {type === "all" ? t("filters.all") : c(`types.${type}`)}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPanel((p) => !p)}
            aria-expanded={panel}
            aria-controls="filters-panel"
            className="mono flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.14em]"
          >
            <Plus className={cn("h-3 w-3 transition-transform duration-300", panel && "rotate-45")} />
            {panel ? t("filters.hide") : t("filters.show")}
            {activeCount > 0 && <span className="flex h-4 min-w-4 items-center justify-center bg-terra px-1 text-[0.6rem] text-paper">{activeCount}</span>}
          </button>
          <div className="ml-auto flex items-center gap-5">
            <p className="mono text-[0.7rem] tabular-nums" aria-live="polite">
              {t("filters.results", { count: results.length })}
            </p>
            <label className="mono hidden items-center gap-2 text-[0.66rem] uppercase tracking-[0.14em] md:flex">
              <span className="text-mute">{t("filters.sort")}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field w-auto py-1 text-[0.7rem] normal-case">
                {(["featured", "priceAsc", "priceDesc", "surfaceDesc", "recent"] as const).map((s) => (
                  <option key={s} value={s}>
                    {t(`sort.${s}`)}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex border border-ink" role="group" aria-label={t("views.grid")}>
              {views.map(({ key, Icon }) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={view === key}
                  aria-label={t(`views.${key}`)}
                  onClick={() => setView(key)}
                  className={cn("flex h-9 w-9 items-center justify-center transition-colors", view === key ? "bg-ink text-paper" : "hover:bg-paper-2")}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {panel && (
            <motion.div
              id="filters-panel"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-line"
            >
              <div className="container-x grid gap-8 py-7 sm:grid-cols-2 lg:grid-cols-5">
                <label className="block">
                  <span className="eyebrow mb-2 block">{t("filters.area")}</span>
                  <select value={filters.area} onChange={(e) => set("area", e.target.value)} className="field">
                    <option value="all">{t("filters.allAreas")}</option>
                    {areas.map((a) => (
                      <option key={a.fr} value={a.fr}>
                        {tr(a, locale)}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="lg:col-span-2">
                  <div className="mb-3 flex justify-between">
                    <span className="eyebrow">{t("filters.price")}</span>
                    <span className="mono text-[0.7rem]">
                      {formatPriceShort(filters.price[0], locale)} — {filters.price[1] >= PRICE_MAX ? "∞" : formatPriceShort(filters.price[1], locale)}
                    </span>
                  </div>
                  <DualRange min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP} value={filters.price} onChange={(v) => set("price", v)} labels={[t("filters.priceMin"), t("filters.priceMax")]} />
                </div>
                <div>
                  <div className="mb-3 flex justify-between">
                    <span className="eyebrow">{t("filters.surface")}</span>
                    <span className="mono text-[0.7rem]">{formatNumber(filters.surface, locale)} m²</span>
                  </div>
                  <Range min={100} max={320} step={10} value={filters.surface} onChange={(v) => set("surface", v)} label={t("filters.surface")} />
                </div>
                <div>
                  <span className="eyebrow mb-2 block">{t("filters.bedrooms")}</span>
                  <div className="flex border border-line" role="group" aria-label={t("filters.bedrooms")}>
                    {[0, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-pressed={filters.bedrooms === n}
                        onClick={() => set("bedrooms", n)}
                        className={cn("mono flex-1 py-2 text-[0.7rem] transition-colors", filters.bedrooms === n ? "bg-ink text-paper" : "hover:bg-paper-2")}
                      >
                        {n === 0 ? t("filters.any") : `${n}+`}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="block lg:col-span-2">
                  <span className="eyebrow mb-2 block">{t("filters.architect")}</span>
                  <select value={filters.architect} onChange={(e) => set("architect", e.target.value)} className="field">
                    <option value="all">{t("filters.allArchitects")}</option>
                    {architects.map((a) => (
                      <option key={a.slug} value={a.slug}>
                        {a.name} — {a.studio}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-3 self-end pb-3 text-sm">
                  <input type="checkbox" checked={filters.hideSold} onChange={(e) => set("hideSold", e.target.checked)} className="h-4 w-4 accent-terra" />
                  {t("filters.hideSold")}
                </label>
                <button type="button" onClick={() => setFilters(defaults)} className="mono self-end pb-3 text-left text-[0.66rem] uppercase tracking-[0.14em] underline underline-offset-4 lg:col-start-5 lg:text-right">
                  {t("filters.reset")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* results */}
      <div className="container-x py-12 md:py-16">
        {results.length === 0 ? (
          <div className="graph-paper flex flex-col items-start gap-6 border border-dashed border-line p-10 md:p-16">
            <p className="max-w-lg text-lg text-graphite">{t("empty")}</p>
            <ButtonLink href="/contact">{t("emptyCta")}</ButtonLink>
          </div>
        ) : view === "map" ? (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {results.map((p) => (
                <PropertyCard key={p.slug} property={p} layout="list" highlighted={hovered === p.slug} onHover={setHovered} />
              ))}
            </div>
            <div className="order-first lg:order-none lg:col-span-7">
              <FranceMap items={results} active={hovered} onHover={setHovered} className="aspect-[760/700] lg:sticky lg:top-24" />
            </div>
          </div>
        ) : view === "list" ? (
          <motion.div layout className="border-b border-line">
            <AnimatePresence mode="popLayout">
              {results.map((p) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <PropertyCard property={p} layout="list" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 5) * 0.04 }}
                >
                  <PropertyCard property={p} index={i} priority={i < 3} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
