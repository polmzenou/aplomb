import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { JournalList } from "@/components/sections/JournalList";
import { PageHeader } from "@/components/sections/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/journal", titleKey: "journal" });
}

export default async function JournalPage({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journal");
  const n = await getTranslations("nav");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} intro={t("intro")} crumbs={[{ label: n("home"), href: "/" }, { label: n("journal") }]} />
      <JournalList />
    </>
  );
}
