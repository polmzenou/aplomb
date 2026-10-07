import { getTranslations, setRequestLocale } from "next-intl/server";
import { legalNotice } from "@/data/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/mentions-legales">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/mentions-legales", titleKey: "legal" });
}

export default async function Page({ params }: PageProps<"/[locale]/mentions-legales">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta.titles");
  return <LegalPage locale={locale} doc={legalNotice} title={t("legal")} />;
}
