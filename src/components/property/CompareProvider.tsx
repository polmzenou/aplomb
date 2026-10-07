"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { getArchitect } from "@/data/architects";
import { getProperty } from "@/data/properties";
import { Link } from "@/i18n/navigation";
import { img } from "@/lib/images";
import { formatNumber, formatPrice, tr } from "@/lib/utils";
import { Close, Compare } from "@/components/ui/Icons";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

const MAX = 3;

type Ctx = { items: string[]; toggle: (slug: string) => void; has: (slug: string) => boolean; clear: () => void };
const CompareContext = createContext<Ctx | null>(null);

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const toast = useToast();
  const t = useTranslations("common");

  const toggle = useCallback(
    (slug: string) => {
      if (items.includes(slug)) return setItems(items.filter((s) => s !== slug));
      if (items.length >= MAX) return toast(t("compareFull"));
      setItems([...items, slug]);
    },
    [items, toast, t],
  );
  const clear = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, toggle, clear, has: (s: string) => items.includes(s) }), [items, toggle, clear]);

  return (
    <CompareContext.Provider value={value}>
      {children}
      <CompareDrawer />
    </CompareContext.Provider>
  );
}

function CompareDrawer() {
  const { items, toggle, clear } = useCompare();
  const t = useTranslations("properties.compare");
  const c = useTranslations("common");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const list = items.map((s) => getProperty(s)!).filter(Boolean);

  const rows: { label: string; value: (p: (typeof list)[number]) => string }[] = [
    { label: t("price"), value: (p) => formatPrice(p.price, locale) },
    { label: t("pricePerSqm"), value: (p) => formatPrice(p.price / p.surface, locale) },
    { label: t("surface"), value: (p) => `${formatNumber(p.surface, locale)} m²` },
    { label: t("land"), value: (p) => (p.land ? `${formatNumber(p.land, locale)} m²` : "—") },
    { label: t("bedrooms"), value: (p) => String(p.bedrooms) },
    { label: t("year"), value: (p) => (p.renovated ? `${p.year} / ${p.renovated}` : String(p.year)) },
    { label: t("architect"), value: (p) => getArchitect(p.architect)?.studio ?? "—" },
    { label: t("energy"), value: (p) => `${p.energy} · ${p.energyValue}` },
    { label: t("location"), value: (p) => `${p.city}, ${tr(p.area, locale)}` },
  ];

  return (
    <>
      <AnimatePresence>
        {list.length > 0 && (
          <motion.div
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            exit={{ y: "120%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-3 left-1/2 z-[75] flex w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 items-center gap-4 bg-ink p-3 pl-5 text-paper shadow-2xl"
          >
            <Compare className="hidden h-4 w-5 shrink-0 text-terra-soft sm:block" />
            <p className="mono hidden text-[0.68rem] uppercase tracking-[0.14em] sm:block">{t("selected", { count: list.length })}</p>
            <ul className="flex flex-1 gap-2">
              {list.map((p) => (
                <li key={p.slug} className="group relative h-11 w-14 overflow-hidden">
                  <Image src={img(p.cover, 200)} alt={p.title} fill sizes="56px" className="object-cover" />
                  <button type="button" onClick={() => toggle(p.slug)} aria-label={`${t("remove")} ${p.title}`} className="absolute inset-0 flex items-center justify-center bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100">
                    <Close className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={clear} className="mono text-[0.66rem] uppercase tracking-[0.14em] text-paper/60 hover:text-paper">
              {t("clear")}
            </button>
            <button type="button" onClick={() => setOpen(true)} disabled={list.length < 2} className="mono bg-terra px-4 py-3 text-[0.66rem] uppercase tracking-[0.14em] transition-colors hover:bg-paper hover:text-ink disabled:opacity-40">
              {t("open")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal open={open && list.length > 0} onClose={() => setOpen(false)} title={t("title")} className="max-w-5xl" closeLabel={c("close")}>
        <p className="eyebrow mb-3 text-terra">{t("selected", { count: list.length })}</p>
        <h2 className="display mb-8 text-3xl">{t("title")}</h2>
        <div className="overflow-x-auto" data-lenis-prevent>
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-40" />
                {list.map((p) => (
                  <th key={p.slug} className="p-2 text-left align-top font-normal">
                    <Link href={{ pathname: "/biens/[slug]", params: { slug: p.slug } }} onClick={() => setOpen(false)} className="group block">
                      <span className="relative mb-3 block aspect-[4/3] overflow-hidden">
                        <Image src={img(p.cover, 500)} alt="" fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </span>
                      <span className="display-tight block text-lg">{p.title}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="mono py-3 pr-4 text-left text-[0.66rem] font-normal uppercase tracking-[0.12em] text-mute">
                    {row.label}
                  </th>
                  {list.map((p) => (
                    <td key={p.slug} className="p-2 py-3">
                      {row.value(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
}
