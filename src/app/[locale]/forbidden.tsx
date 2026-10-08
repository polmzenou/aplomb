import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ErrorView } from "@/components/sections/ErrorView";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "403", robots: { index: false } };

export default async function Forbidden() {
  const t = await getTranslations("errors.forbidden");
  const c = await getTranslations("common");
  return (
    <ErrorView
      code={t("code")}
      eyebrow={t("eyebrow")}
      title={t("title")}
      accent={t("accent")}
      text={t("text")}
      mode="sealed"
      actions={
        <>
          <ButtonLink href="/contact">{t("cta")}</ButtonLink>
          <ButtonLink href="/" variant="ghost">
            {c("backHome")}
          </ButtonLink>
        </>
      }
    />
  );
}
