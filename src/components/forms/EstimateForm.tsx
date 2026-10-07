"use client";

import { useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { propertyTypes } from "@/data/properties";
import { cn, formatPrice, wait } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { Counter } from "@/components/ui/Counter";
import { contactFields } from "./schemas";
import { Field, fieldProps } from "./Field";

const conditions = ["new", "good", "refresh", "renovate"] as const;
const timings = ["now", "six", "year", "thinking"] as const;

/** Indicative €/m² by market, used for the instant range. */
const markets: [RegExp, number][] = [
  [/paris/i, 14500],
  [/cassis|calanque|marseille|aix/i, 10800],
  [/biarritz|anglet|bidart|guéthary|saint-jean-de-luz/i, 9800],
  [/annecy|talloires|megève|chamonix/i, 9400],
  [/ferret|arcachon|pyla/i, 11200],
  [/lyon|monts? d'or/i, 7200],
  [/bordeaux/i, 6400],
  [/deauville|houlgate|trouville|honfleur/i, 7600],
];

function makeSchema(f: (k: string) => string) {
  const num = z.coerce.number<string>(f("errors.number"));
  return z.object({
    type: z.enum(["villa", "house", "loft", "apartment"], f("errors.required")),
    city: z.string().trim().min(2, f("errors.required")),
    surface: num.pipe(z.number().min(20, f("errors.number")).max(5000, f("errors.number"))),
    land: z.string().optional(),
    year: num.pipe(z.number().min(1800, f("errors.number")).max(2026, f("errors.number"))),
    architect: z.string().optional(),
    condition: z.enum(conditions, f("errors.required")),
    view: z.boolean().optional(),
    pool: z.boolean().optional(),
    listed: z.boolean().optional(),
    timing: z.enum(timings, f("errors.required")),
    ...contactFields(f),
  });
}

type Values = z.output<ReturnType<typeof makeSchema>>;

function estimate(v: Values) {
  const base = markets.find(([re]) => re.test(v.city))?.[1] ?? 6200;
  let value = base * v.surface;
  const land = Number(v.land) || 0;
  value += Math.min(land, 5000) * 90;
  if (v.architect?.trim()) value *= 1.12;
  if (v.listed) value *= 1.15;
  if (v.view) value *= 1.1;
  if (v.pool) value *= 1.05;
  value *= { new: 1.08, good: 1, refresh: 0.93, renovate: 0.85 }[v.condition];
  const round = (n: number) => Math.round(n / 10_000) * 10_000;
  return [round(value * 0.93), round(value * 1.07)] as const;
}

const stepFields: FieldPath<z.input<ReturnType<typeof makeSchema>>>[][] = [
  ["type", "city", "surface", "land", "year"],
  ["architect", "condition", "view", "pool", "listed", "timing"],
  ["firstName", "lastName", "email", "phone", "consent"],
];

export function EstimateForm() {
  const t = useTranslations("sell");
  const f = useTranslations("forms");
  const c = useTranslations("common");
  const locale = useLocale();
  const schema = makeSchema(f);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<readonly [number, number] | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof schema>, unknown, Values>({ resolver: zodResolver(schema), defaultValues: { condition: "good", timing: "six", view: false, pool: false, listed: false } });

  const steps = t.raw("form.steps") as string[];
  const type = useWatch({ control, name: "type" });
  const condition = useWatch({ control, name: "condition" });

  const next = async () => {
    if (await trigger(stepFields[step])) setStep((s) => s + 1);
  };

  const onSubmit = async (values: Values) => {
    await wait(1100);
    setResult(estimate(values));
  };

  if (result) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-ink p-8 text-paper md:p-12" aria-live="polite">
        <p className="eyebrow mb-6 text-terra-soft">{t("result.eyebrow")}</p>
        <p className="display-tight text-2xl md:text-3xl">{t("result.title")}</p>
        <p className="display mt-6 flex flex-wrap items-baseline gap-x-4 text-[clamp(2.4rem,6vw,5rem)] tabular-nums">
          <span>
            <Counter value={result[0]} locale={locale} /> €
          </span>
          <span className="accent text-[0.5em] text-terra-soft">{t("result.and")}</span>
          <span>
            <Counter value={result[1]} locale={locale} /> €
          </span>
        </p>
        <span className="sr-only">
          {formatPrice(result[0], locale)} — {formatPrice(result[1], locale)}
        </span>
        <p className="mt-8 max-w-xl text-paper/70">{t("result.note")}</p>
        <div className="mt-10">
          <Button
            variant="light"
            onClick={() => {
              reset();
              setResult(null);
              setStep(0);
            }}
          >
            {t("result.restart")}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="border border-ink bg-paper">
      {/* stepper */}
      <ol className="grid grid-cols-3 border-b border-ink">
        {steps.map((label, i) => (
          <li key={label} className={cn("relative flex items-center gap-3 px-4 py-4 md:px-6", i > 0 && "border-l border-line")} aria-current={i === step ? "step" : undefined}>
            <span className={cn("mono flex h-6 w-6 shrink-0 items-center justify-center text-[0.66rem] transition-colors", i < step ? "bg-terra text-paper" : i === step ? "bg-ink text-paper" : "border border-line text-mute")}>
              {i < step ? <Check className="h-2 w-2.5" /> : i + 1}
            </span>
            <span className={cn("hidden text-sm md:block", i === step ? "font-semibold" : "text-mute")}>{label}</span>
            <motion.span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-terra" initial={false} animate={{ scaleX: i < step ? 1 : i === step ? 0.5 : 0 }} transition={{ duration: 0.6 }} />
          </li>
        ))}
      </ol>

      <div className="p-6 md:p-10">
        <p className="mono mb-8 text-[0.66rem] uppercase tracking-[0.14em] text-mute">{t("form.step", { n: step + 1, total: steps.length })}</p>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="grid gap-8 sm:grid-cols-2">
            {step === 0 && (
              <>
                <fieldset className="sm:col-span-2">
                  <legend className="eyebrow mb-3">
                    {t("form.type")} <span className="text-terra">*</span>
                  </legend>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {propertyTypes.map((pt) => (
                      <label key={pt} className={cn("flex cursor-pointer items-center justify-center border has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terra px-3 py-4 text-sm transition-colors", type === pt ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}>
                        <input type="radio" value={pt} className="sr-only" {...register("type")} />
                        {c(`types.${pt}`)}
                      </label>
                    ))}
                  </div>
                  {errors.type && <p className="mono mt-1.5 text-[0.66rem] text-danger">{errors.type.message}</p>}
                </fieldset>
                <Field id="e-city" label={t("form.city")} error={errors.city?.message} required>
                  <input placeholder={t("form.cityPlaceholder")} autoComplete="address-level2" {...fieldProps("e-city", errors.city?.message)} {...register("city")} />
                </Field>
                <Field id="e-year" label={t("form.year")} error={errors.year?.message} required>
                  <input type="number" inputMode="numeric" placeholder="1972" {...fieldProps("e-year", errors.year?.message)} {...register("year")} />
                </Field>
                <Field id="e-surface" label={t("form.surface")} error={errors.surface?.message} required>
                  <input type="number" inputMode="numeric" placeholder="180" {...fieldProps("e-surface", errors.surface?.message)} {...register("surface")} />
                </Field>
                <Field id="e-land" label={t("form.land")}>
                  <input type="number" inputMode="numeric" placeholder="1200" {...fieldProps("e-land")} {...register("land")} />
                </Field>
              </>
            )}
            {step === 1 && (
              <>
                <Field id="e-architect" label={t("form.architect")} className="sm:col-span-2">
                  <input placeholder={t("form.architectPlaceholder")} {...fieldProps("e-architect")} {...register("architect")} />
                </Field>
                <fieldset className="sm:col-span-2">
                  <legend className="eyebrow mb-3">{t("form.condition")}</legend>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {conditions.map((k) => (
                      <label key={k} className={cn("flex cursor-pointer items-center justify-center border has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terra px-3 py-3.5 text-center text-sm transition-colors", condition === k ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}>
                        <input type="radio" value={k} className="sr-only" {...register("condition")} />
                        {t(`form.conditions.${k}`)}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="flex flex-col gap-3 sm:col-span-2 md:flex-row md:gap-8">
                  {(["view", "pool", "listed"] as const).map((k) => (
                    <label key={k} className="flex items-center gap-3 text-sm">
                      <input type="checkbox" className="h-4 w-4 accent-terra" {...register(k)} />
                      {t(`form.${k}`)}
                    </label>
                  ))}
                </div>
                <Field id="e-timing" label={t("form.timing")} className="sm:col-span-2">
                  <select {...fieldProps("e-timing")} {...register("timing")}>
                    {timings.map((k) => (
                      <option key={k} value={k}>
                        {t(`form.timings.${k}`)}
                      </option>
                    ))}
                  </select>
                </Field>
              </>
            )}
            {step === 2 && (
              <>
                <Field id="e-first" label={f("firstName")} error={errors.firstName?.message} required>
                  <input autoComplete="given-name" {...fieldProps("e-first", errors.firstName?.message)} {...register("firstName")} />
                </Field>
                <Field id="e-last" label={f("lastName")} error={errors.lastName?.message} required>
                  <input autoComplete="family-name" {...fieldProps("e-last", errors.lastName?.message)} {...register("lastName")} />
                </Field>
                <Field id="e-email" label={f("email")} error={errors.email?.message} required>
                  <input type="email" autoComplete="email" {...fieldProps("e-email", errors.email?.message)} {...register("email")} />
                </Field>
                <Field id="e-phone" label={f("phone")} error={errors.phone?.message}>
                  <input type="tel" autoComplete="tel" {...fieldProps("e-phone", errors.phone?.message)} {...register("phone")} />
                </Field>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-xs leading-relaxed text-graphite">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-terra" aria-invalid={!!errors.consent} {...register("consent")} />
                    {f("consent")}
                  </label>
                  {errors.consent && (
                    <p role="alert" className="mono mt-1.5 text-[0.66rem] text-danger">
                      {errors.consent.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="mono text-[0.68rem] uppercase tracking-[0.14em] underline-offset-4 hover:underline">
              ← {t("form.back")}
            </button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next} arrow>
              {t("form.continue")}
            </Button>
          ) : (
            <Button type="submit" variant="terra" disabled={isSubmitting} arrow>
              {isSubmitting ? f("sending") : t("form.submit")}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
