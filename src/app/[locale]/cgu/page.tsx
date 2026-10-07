import { getTranslations, setRequestLocale } from "next-intl/server";
import { terms } from "@/data/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/cgu">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/cgu", titleKey: "terms" });
}

export default async function Page({ params }: PageProps<"/[locale]/cgu">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta.titles");
  return <LegalPage locale={locale} doc={terms} title={t("terms")} />;
}
