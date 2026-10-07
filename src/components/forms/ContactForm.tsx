"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { wait } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Field, fieldProps } from "./Field";
import { contactSchema } from "./schemas";

const subjects = ["buy", "sell", "visit", "alert", "press", "other"] as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const f = useTranslations("forms");
  const toast = useToast();
  const schema = contactSchema(f);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { subject: "buy" } });

  const onSubmit = async () => {
    await wait(1000);
    toast(t("success"));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-8 sm:grid-cols-2">
      <fieldset className="sm:col-span-2">
        <legend className="eyebrow mb-3">{f("subject")}</legend>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" value={s} className="peer sr-only" {...register("subject")} />
              <span className="mono block border border-line px-3 py-2 text-[0.66rem] uppercase tracking-[0.14em] transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-terra">
                {f(`subjects.${s}`)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="c-first" label={f("firstName")} error={errors.firstName?.message} required>
        <input autoComplete="given-name" {...fieldProps("c-first", errors.firstName?.message)} {...register("firstName")} />
      </Field>
      <Field id="c-last" label={f("lastName")} error={errors.lastName?.message} required>
        <input autoComplete="family-name" {...fieldProps("c-last", errors.lastName?.message)} {...register("lastName")} />
      </Field>
      <Field id="c-email" label={f("email")} error={errors.email?.message} required>
        <input type="email" autoComplete="email" {...fieldProps("c-email", errors.email?.message)} {...register("email")} />
      </Field>
      <Field id="c-phone" label={f("phone")} error={errors.phone?.message}>
        <input type="tel" autoComplete="tel" {...fieldProps("c-phone", errors.phone?.message)} {...register("phone")} />
      </Field>
      <Field id="c-message" label={f("message")} error={errors.message?.message} required className="sm:col-span-2">
        <textarea rows={5} placeholder={f("messagePlaceholder")} {...fieldProps("c-message", errors.message?.message)} {...register("message")} />
      </Field>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-xs leading-relaxed text-graphite">
          <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-terra" aria-invalid={!!errors.consent} {...register("consent")} />
          <span>
            {f("consent")}{" "}
            <Link href="/politique-de-confidentialite" className="underline underline-offset-2">
              ↗
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
          {isSubmitting ? f("sending") : f("submit")}
        </Button>
      </div>
    </form>
  );
}
