"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { wait } from "@/lib/utils";
import { Field, fieldProps } from "@/components/forms/Field";
import { visitSchema } from "@/components/forms/schemas";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/** Next viewing slots: weekdays except Sunday, two times a day, starting tomorrow. */
function upcomingSlots(locale: string) {
  const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const slots: { value: string; label: string }[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (slots.length < 10) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue;
    for (const time of ["10:00", "15:30"]) {
      slots.push({ value: `${d.toISOString().slice(0, 10)}T${time}`, label: `${fmt.format(d)} · ${time.replace(":", locale === "en" ? ":" : "h")}` });
    }
  }
  return slots;
}

export function VisitForm({ title }: { title: string }) {
  const t = useTranslations("property.visit");
  const f = useTranslations("forms");
  const locale = useLocale();
  const toast = useToast();
  const schema = visitSchema(f);
  // Slots depend on today's date, so they are computed after hydration.
  const [slots, setSlots] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date-dependent content must not be prerendered
    setSlots(upcomingSlots(locale));
  }, [locale]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { slot: "", withArchitect: true } });

  const onSubmit = async () => {
    await wait(900);
    toast(t("success", { title }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-7 sm:grid-cols-2">
      <Field id="v-first" label={f("firstName")} error={errors.firstName?.message} required>
        <input autoComplete="given-name" {...fieldProps("v-first", errors.firstName?.message)} {...register("firstName")} />
      </Field>
      <Field id="v-last" label={f("lastName")} error={errors.lastName?.message} required>
        <input autoComplete="family-name" {...fieldProps("v-last", errors.lastName?.message)} {...register("lastName")} />
      </Field>
      <Field id="v-email" label={f("email")} error={errors.email?.message} required>
        <input type="email" autoComplete="email" {...fieldProps("v-email", errors.email?.message)} {...register("email")} />
      </Field>
      <Field id="v-phone" label={f("phone")} error={errors.phone?.message} required>
        <input type="tel" autoComplete="tel" {...fieldProps("v-phone", errors.phone?.message)} {...register("phone")} />
      </Field>
      <Field id="v-slot" label={t("slot")} error={errors.slot?.message} required className="sm:col-span-2">
        <select {...fieldProps("v-slot", errors.slot?.message)} {...register("slot")}>
          <option value="" disabled>
            {t("slotPlaceholder")}
          </option>
          {slots.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="v-message" label={f("message")} className="sm:col-span-2">
        <textarea rows={3} placeholder={f("messagePlaceholder")} {...fieldProps("v-message")} {...register("message")} />
      </Field>
      <label className="flex items-center gap-3 text-sm sm:col-span-2">
        <input type="checkbox" className="h-4 w-4 accent-terra" {...register("withArchitect")} />
        {t("withArchitect")}
      </label>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-xs leading-relaxed text-graphite">
          <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-terra" aria-invalid={!!errors.consent} {...register("consent")} />
          <span>
            {f("consent")}{" "}
            <Link href="/politique-de-confidentialite" className="underline underline-offset-2">
              →
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mono mt-1.5 text-[0.66rem] text-danger">
            {errors.consent.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 sm:col-span-2">
        <span className="mono text-[0.6rem] uppercase tracking-[0.14em] text-mute">
          <span className="text-terra">*</span> {f("required")}
        </span>
        <Button type="submit" disabled={isSubmitting} arrow>
          {isSubmitting ? f("sending") : t("title")}
        </Button>
      </div>
    </form>
  );
}
