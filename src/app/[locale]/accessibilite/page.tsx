import { getTranslations, setRequestLocale } from "next-intl/server";
import { accessibility } from "@/data/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/accessibilite">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/accessibilite", titleKey: "accessibility" });
}

export default async function Page({ params }: PageProps<"/[locale]/accessibilite">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta.titles");
  return <LegalPage locale={locale} doc={accessibility} title={t("accessibility")} />;
}
