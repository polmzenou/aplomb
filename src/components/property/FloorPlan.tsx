"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import type { FloorPlan as Plan } from "@/data/types";
import { cn, formatNumber, tr } from "@/lib/utils";

const S = 40; // px per metre
const M = 60; // margin for dimension lines

type Props = { plan: Plan; interactive?: boolean; theme?: "paper" | "blueprint"; className?: string };

/** Architectural floor plan drawn from room rectangles, with dimension lines and hover areas. */
export function FloorPlan({ plan, interactive = false, theme = "paper", className }: Props) {
  const locale = useLocale();
  const t = useTranslations("property");
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const W = plan.width * S;
  const H = plan.depth * S;
  const ink = theme === "blueprint" ? "#cfe0f3" : "#161614";
  const accent = theme === "blueprint" ? "#ffffff" : "#b5502b";
  const indoor = plan.rooms.filter((r) => !r.outdoor).reduce((sum, r) => sum + r.w * r.h, 0);
  const current = plan.rooms.find((r) => r.id === active);

  const draw = (delay: number) =>
    reduce ? {} : { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true }, transition: { duration: 1.6, delay, ease: [0.7, 0, 0.2, 1] as const } };

  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${W + M * 2} ${H + M * 2}`} className="h-auto w-full" role="img" aria-label={t("planLabel", { label: tr(plan.label, locale) })}>
        <defs>
          <pattern id={`hatch-${theme}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={ink} strokeWidth="0.6" opacity="0.35" />
          </pattern>
        </defs>
        <g transform={`translate(${M} ${M})`}>
          {plan.rooms.map((r, i) => {
            const isActive = active === r.id;
            return (
              <g
                key={r.id}
                onMouseEnter={interactive ? () => setActive(r.id) : undefined}
                onMouseLeave={interactive ? () => setActive(null) : undefined}
                onFocus={interactive ? () => setActive(r.id) : undefined}
                onBlur={interactive ? () => setActive(null) : undefined}
                tabIndex={interactive ? 0 : undefined}
                role={interactive ? "button" : undefined}
                aria-label={interactive ? `${tr(r.name, locale)} — ${formatNumber(r.w * r.h, locale)} m²` : undefined}
                className={interactive ? "cursor-pointer outline-none" : undefined}
              >
                <rect
                  x={r.x * S}
                  y={r.y * S}
                  width={r.w * S}
                  height={r.h * S}
                  fill={r.outdoor ? `url(#hatch-${theme})` : isActive ? accent : "transparent"}
                  fillOpacity={isActive && !r.outdoor ? 0.14 : 1}
                  className="transition-[fill-opacity] duration-300"
                />
                <motion.rect
                  x={r.x * S}
                  y={r.y * S}
                  width={r.w * S}
                  height={r.h * S}
                  fill="none"
                  stroke={isActive ? accent : ink}
                  strokeWidth={r.outdoor ? 1 : 3}
                  strokeDasharray={r.outdoor ? "6 5" : undefined}
                  {...draw(0.1 + i * 0.12)}
                />
                <text x={r.x * S + (r.w * S) / 2} y={r.y * S + (r.h * S) / 2 - 4} textAnchor="middle" fill={isActive ? accent : ink} fontSize="15" style={{ fontFamily: "var(--font-archivo)" }} fontWeight="600">
                  {tr(r.name, locale).toUpperCase()}
                </text>
                <text x={r.x * S + (r.w * S) / 2} y={r.y * S + (r.h * S) / 2 + 16} textAnchor="middle" fill={ink} opacity="0.6" fontSize="13" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  {formatNumber(r.w * r.h, locale)} m²
                </text>
              </g>
            );
          })}
          {/* outer wall */}
          <motion.rect x={0} y={0} width={W} height={H} fill="none" stroke={ink} strokeWidth="7" {...draw(0)} />
          {/* door openings */}
          <rect x={W * 0.55} y={H - 4} width={36} height={8} fill={theme === "blueprint" ? "#1f3a5f" : "#ece8e1"} />
          <path d={`M${W * 0.55} ${H} A36 36 0 0 0 ${W * 0.55 + 36} ${H - 36}`} fill="none" stroke={ink} strokeWidth="1" opacity="0.6" />

          {/* horizontal dimension */}
          <g stroke={ink} strokeWidth="1" opacity="0.8">
            <line x1={0} y1={-30} x2={W} y2={-30} />
            <line x1={0} y1={-38} x2={0} y2={-22} />
            <line x1={W} y1={-38} x2={W} y2={-22} />
            <line x1={-4} y1={-26} x2={4} y2={-34} />
            <line x1={W - 4} y1={-26} x2={W + 4} y2={-34} />
          </g>
          <text x={W / 2} y={-38} textAnchor="middle" fill={ink} fontSize="13" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {formatNumber(plan.width, locale, 2)} m
          </text>
          {/* vertical dimension */}
          <g stroke={ink} strokeWidth="1" opacity="0.8">
            <line x1={W + 30} y1={0} x2={W + 30} y2={H} />
            <line x1={W + 22} y1={0} x2={W + 38} y2={0} />
            <line x1={W + 22} y1={H} x2={W + 38} y2={H} />
          </g>
          <text x={W + 44} y={H / 2} fill={ink} fontSize="13" style={{ fontFamily: "var(--font-jetbrains)" }} transform={`rotate(90 ${W + 44} ${H / 2})`} textAnchor="middle">
            {formatNumber(plan.depth, locale, 2)} m
          </text>
          {/* north arrow */}
          <g transform={`translate(${-34} ${H + 30})`} fill={ink}>
            <circle r="14" fill="none" stroke={ink} strokeWidth="1" />
            <path d="M0 -12 L5 4 L0 1 L-5 4 Z" />
            <text y="-18" textAnchor="middle" fontSize="11" style={{ fontFamily: "var(--font-jetbrains)" }}>
              N
            </text>
          </g>
        </g>
      </svg>
      {interactive && (
        <div className="mono mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-[0.7rem] uppercase tracking-[0.12em]">
          <span className="text-mute">{current ? tr(current.name, locale) : t("planHint")}</span>
          <span>
            {current ? `${formatNumber(current.w * current.h, locale)} m²` : `${t("planTotal")} · ${formatNumber(indoor, locale)} m²`}
          </span>
        </div>
      )}
    </div>
  );
}
