"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("nav");
  const [pending, startTransition] = useTransition();

  const change = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      // @ts-expect-error -- params always match the current pathname
      router.replace({ pathname, params }, { locale: next, scroll: false });
    });
  };

  return (
    <div role="group" aria-label={t("language")} className={cn("mono flex items-center gap-1 text-[0.7rem]", pending && "opacity-50", className)}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
          <button
            type="button"
            onClick={() => change(l)}
            aria-pressed={l === locale}
            lang={l}
            className={cn("px-1 py-1 uppercase transition-opacity", l === locale ? "opacity-100" : "opacity-45 hover:opacity-100")}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
