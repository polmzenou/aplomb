"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { monthlyPayment, notaryFees } from "@/lib/mortgage";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import { Range } from "@/components/ui/RangeSlider";

/** Indicative loan simulator with a proportional breakdown bar. */
export function MortgageCalculator({ price, recentBuild }: { price: number; recentBuild: boolean }) {
  const t = useTranslations("property.mortgage");
  const locale = useLocale();
  const [deposit, setDeposit] = useState(Math.round((price * 0.3) / 10_000) * 10_000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(3.4);

  const notary = notaryFees(price, recentBuild);
  const loan = Math.max(0, price + notary - deposit);
  const monthly = monthlyPayment(loan, rate, years);
  const interest = monthly * years * 12 - loan;
  const total = price + notary + interest;
  const parts = [
    { key: "price", label: t("price"), value: price, cls: "bg-ink" },
    { key: "notary", label: t("notary"), value: notary, cls: "bg-sage" },
    { key: "interest", label: t("interest"), value: interest, cls: "bg-terra" },
  ];

  return (
    <div className="grid gap-10 border border-ink p-6 md:p-10 lg:grid-cols-2">
      <div className="space-y-8">
        <div>
          <div className="mb-3 flex justify-between">
            <span className="eyebrow">{t("deposit")}</span>
            <span className="mono text-sm">{formatPrice(deposit, locale)}</span>
          </div>
          <Range min={0} max={Math.round(price * 0.8)} step={10_000} value={deposit} onChange={setDeposit} label={t("deposit")} />
        </div>
        <div>
          <div className="mb-3 flex justify-between">
            <span className="eyebrow">{t("duration")}</span>
            <span className="mono text-sm">{t("years", { count: years })}</span>
          </div>
          <div className="grid grid-cols-5 border border-line" role="group" aria-label={t("duration")}>
            {[10, 15, 20, 25, 30].map((y) => (
              <button key={y} type="button" aria-pressed={years === y} onClick={() => setYears(y)} className={cn("mono py-2.5 text-xs transition-colors", years === y ? "bg-ink text-paper" : "hover:bg-paper-2")}>
                {y}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 flex justify-between">
            <span className="eyebrow">{t("rate")}</span>
            <span className="mono text-sm">{formatNumber(rate, locale, 2)} %</span>
          </div>
          <Range min={1} max={6} step={0.05} value={rate} onChange={setRate} label={t("rate")} />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 bg-ink p-6 text-paper md:p-8">
        <div>
          <p className="eyebrow text-paper/60">{t("monthly")}</p>
          <p className="mt-3 flex items-baseline gap-2">
            <motion.span key={Math.round(monthly)} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="display text-[clamp(2.6rem,5vw,4.2rem)] tabular-nums">
              {formatPrice(Math.round(monthly), locale)}
            </motion.span>
            <span className="mono text-sm text-paper/60">{t("perMonth")}</span>
          </p>
        </div>
        <div>
          <div className="flex h-2 w-full overflow-hidden" aria-hidden="true">
            {parts.map((p) => (
              <motion.span key={p.key} className={cn("h-full", p.cls === "bg-ink" ? "bg-paper" : p.cls)} animate={{ width: `${(Math.max(0, p.value) / total) * 100}%` }} transition={{ duration: 0.6 }} />
            ))}
          </div>
          <dl className="mono mt-5 space-y-2 text-[0.72rem]">
            {[
              { label: t("loan"), value: loan },
              { label: t("notary"), value: notary },
              { label: t("interest"), value: interest },
            ].map((row) => (
              <div key={row.label} className="flex justify-between gap-4 border-b border-paper/15 pb-2">
                <dt className="text-paper/60">{row.label}</dt>
                <dd>{formatPrice(Math.round(row.value), locale)}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 pt-1 text-paper">
              <dt>{t("total")}</dt>
              <dd>{formatPrice(Math.round(total), locale)}</dd>
            </div>
          </dl>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-mute lg:col-span-2">{t("disclaimer")}</p>
    </div>
  );
}
