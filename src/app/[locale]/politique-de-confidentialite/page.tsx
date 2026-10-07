import { getTranslations, setRequestLocale } from "next-intl/server";
import { privacyPolicy } from "@/data/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/politique-de-confidentialite">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/politique-de-confidentialite", titleKey: "privacy" });
}

export default async function Page({ params }: PageProps<"/[locale]/politique-de-confidentialite">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta.titles");
  return <LegalPage locale={locale} doc={privacyPolicy} title={t("privacy")} />;
}
