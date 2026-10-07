import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { SelectionList } from "@/components/property/SelectionList";
import { PageHeader } from "@/components/sections/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[locale]/selection">) {
  const { locale } = await params;
  return { ...(await pageMetadata({ locale, href: "/selection", titleKey: "selection" })), robots: { index: false } };
}

export default async function SelectionPage({ params }: PageProps<"/[locale]/selection">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("selection");
  const n = await getTranslations("nav");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} intro={t("intro")} crumbs={[{ label: n("home"), href: "/" }, { label: t("eyebrow") }]} />
      <SelectionList />
    </>
  );
}
