import { getTranslations, setRequestLocale } from "next-intl/server";
import { properties } from "@/data/properties";
import { localizedUrl, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { PropertyExplorer } from "@/components/property/PropertyExplorer";
import { PageHeader } from "@/components/sections/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[locale]/biens">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/biens", titleKey: "properties" });
}

export default async function PropertiesPage({ params }: PageProps<"/[locale]/biens">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("properties");
  const n = await getTranslations("nav");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: properties.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}${localizedUrl({ pathname: "/biens/[slug]", params: { slug: p.slug } }, locale)}`,
      name: p.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        accent={t("accent")}
        intro={t("intro")}
        crumbs={[{ label: n("home"), href: "/" }, { label: n("properties") }]}
      />
      <PropertyExplorer />
    </>
  );
}
