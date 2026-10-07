"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import type { Property } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { corsicaPath, francePath, MAP_VIEWBOX, project } from "@/lib/geo";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { cn, formatPriceShort } from "@/lib/utils";

type Props = { items: Property[]; active: string | null; onHover: (slug: string | null) => void; className?: string };

/** Stylised map of France with one marker per property and the agency's offices. */
export function FranceMap({ items, active, onHover, className }: Props) {
  const t = useTranslations("properties");
  const locale = useLocale();
  const current = items.find((p) => p.slug === active);
  const pos = current ? project(current.lon, current.lat) : null;

  return (
    <div className={cn("graph-paper relative border border-line bg-paper", className)}>
      <svg viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`} className="h-full w-full" role="img" aria-label={t("mapLabel")}>
        <path d={francePath} fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
        <path d={corsicaPath} fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
        {site.offices.map((o) => {
          const p = project(o.lon, o.lat);
          return (
            <g key={o.key} transform={`translate(${p.x} ${p.y})`}>
              <rect x="-5" y="-5" width="10" height="10" fill="var(--color-ink)" />
              <text x="10" y="-8" fontSize="12" style={{ fontFamily: "var(--font-jetbrains)" }} fill="var(--color-ink)">
                {o.city.toUpperCase()}
              </text>
            </g>
          );
        })}
        {items.map((p) => {
          const { x, y } = project(p.lon, p.lat);
          const isActive = active === p.slug;
          return (
            <g
              key={p.slug}
              transform={`translate(${x} ${y})`}
              onMouseEnter={() => onHover(p.slug)}
              onMouseLeave={() => onHover(null)}
              className="cursor-pointer"
            >
              <circle r={isActive ? 22 : 0} fill="var(--color-terra)" opacity="0.18" className="transition-all duration-500" />
              <circle r={isActive ? 9 : 6} fill={p.status === "sold" ? "var(--color-mute)" : "var(--color-terra)"} stroke="var(--color-paper)" strokeWidth="2" className="transition-all duration-300" />
            </g>
          );
        })}
      </svg>
      <AnimatePresence>
        {current && pos && (
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute z-10 w-48 -translate-x-1/2 bg-ink text-paper shadow-xl"
            style={{ left: `${(pos.x / MAP_VIEWBOX.w) * 100}%`, top: `${(pos.y / MAP_VIEWBOX.h) * 100}%`, marginTop: 18 }}
          >
            <span className="relative block aspect-[16/10]">
              <Image src={img(current.cover, 400)} alt="" fill sizes="192px" className="object-cover" />
            </span>
            <span className="block p-3">
              <span className="block text-sm font-semibold">{current.title}</span>
              <span className="mono mt-1 flex justify-between text-[0.62rem] text-paper/70">
                <span>{current.city}</span>
                <span>{formatPriceShort(current.price, locale)}</span>
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="mono absolute bottom-3 left-3 text-[0.6rem] uppercase tracking-[0.12em] text-mute">{t("mapHint")}</p>
      <ul className="sr-only">
        {items.map((p) => (
          <li key={p.slug}>
            <Link href={{ pathname: "/biens/[slug]", params: { slug: p.slug } }}>
              {p.title} — {p.city}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
