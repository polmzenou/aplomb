import { getTranslations, setRequestLocale } from "next-intl/server";
import { architects } from "@/data/architects";
import { articles } from "@/data/content";
import { properties } from "@/data/properties";
import { Link } from "@/i18n/navigation";
import { pageMetadata, type Href } from "@/lib/metadata";
import { legalNav, mainNav } from "@/lib/nav";
import { pad, tr } from "@/lib/utils";
import { PageHeader } from "@/components/sections/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[locale]/plan-du-site">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/plan-du-site", titleKey: "sitemap" });
}

export default async function SitemapPage({ params }: PageProps<"/[locale]/plan-du-site">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sitemapPage");
  const n = await getTranslations("nav");
  const m = await getTranslations("meta.titles");

  const groups: { title: string; links: { label: string; href: Href }[] }[] = [
    {
      title: t("main"),
      links: [
        { label: n("home"), href: "/" },
        ...mainNav.map((item) => ({ label: n(item.key), href: item.href })),
        { label: n("faq"), href: "/faq" },
        { label: m("selection"), href: "/selection" },
        { label: n("owners"), href: "/espace-proprietaire" },
      ],
    },
    { title: t("properties"), links: properties.map((p) => ({ label: `${p.title} — ${p.city}`, href: { pathname: "/biens/[slug]", params: { slug: p.slug } } })) },
    { title: t("architects"), links: architects.map((a) => ({ label: `${a.name} — ${a.studio}`, href: "/architectes" })) },
    { title: t("journal"), links: articles.map((a) => ({ label: tr(a.title, locale), href: { pathname: "/journal/[slug]", params: { slug: a.slug } } })) },
    { title: t("legal"), links: legalNav.map((l) => ({ label: n(`legal.${l.key}`), href: l.href })) },
  ];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} crumbs={[{ label: n("home"), href: "/" }, { label: t("title") }]} />
      <div className="container-x grid gap-14 pb-24 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <section key={g.title} className="border-t border-ink pt-6">
            <h2 className="eyebrow mb-6 flex gap-3">
              <span className="text-terra">{pad(i + 1)}</span>
              {g.title}
            </h2>
            <ul className="space-y-2.5">
              {g.links.map((l, j) => (
                <li key={j}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
