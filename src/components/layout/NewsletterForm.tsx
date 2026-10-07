"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/Toast";
import { ArrowRight } from "@/components/ui/Icons";
import { wait } from "@/lib/utils";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const f = useTranslations("forms");
  const toast = useToast();
  const schema = z.object({
    email: z.email(f("errors.email")),
    consent: z.literal(true, f("errors.consent")),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await wait(700);
    toast(t("newsletterSuccess"));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <label htmlFor="newsletter-email" className="eyebrow mb-3 block text-paper/50">
        {t("newsletterLabel")}
      </label>
      <div className="flex items-end gap-3 border-b border-paper/30 focus-within:border-paper">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder={t("newsletterPlaceholder")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          className="w-full bg-transparent py-3 text-lg text-paper placeholder:text-paper/35 focus:outline-none"
          {...register("email")}
        />
        <button type="submit" disabled={isSubmitting} aria-label={t("newsletterSubmit")} className="group mb-2 flex h-10 w-12 shrink-0 items-center justify-center bg-terra text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-50">
          <ArrowRight className="h-3 w-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed text-paper/55">
        <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-terra" {...register("consent")} />
        <span>{t("newsletterConsent")}</span>
      </label>
      {(errors.email || errors.consent) && (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs text-terra-soft">
          {errors.email?.message ?? errors.consent?.message}
        </p>
      )}
    </form>
  );
}
