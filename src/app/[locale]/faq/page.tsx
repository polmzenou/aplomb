import { getTranslations, setRequestLocale } from "next-intl/server";
import { faq } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { pad, tr } from "@/lib/utils";
import { PageHeader } from "@/components/sections/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/faq", titleKey: "faq" });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faqPage");
  const n = await getTranslations("nav");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: tr(item.q, locale),
        acceptedAnswer: { "@type": "Answer", text: tr(item.a, locale) },
      })),
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} intro={t("intro")} crumbs={[{ label: n("home"), href: "/" }, { label: n("faq") }]} />
      <div className="container-x grid gap-12 pb-24 lg:grid-cols-12">
        <nav aria-label={t("eyebrow")} className="lg:col-span-3">
          <ul className="space-y-2 lg:sticky lg:top-28">
            {faq.map((cat, i) => (
              <li key={cat.category.fr}>
                <a href={`#cat-${i}`} className="group flex items-baseline gap-3 py-1">
                  <span className="mono text-xs text-terra">{pad(i + 1)}</span>
                  <span className="link-underline">{tr(cat.category, locale)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-20 lg:col-span-8 lg:col-start-5">
          {faq.map((cat, i) => (
            <section key={cat.category.fr} id={`cat-${i}`} className="scroll-mt-28">
              <h2 className="display mb-8 text-3xl md:text-4xl">{tr(cat.category, locale)}</h2>
              <Accordion items={cat.items.map((item) => ({ title: tr(item.q, locale), content: <p>{tr(item.a, locale)}</p> }))} defaultOpen={i === 0 ? 0 : -1} />
            </section>
          ))}
          <div className="graph-paper flex flex-col items-start justify-between gap-6 border border-ink p-8 md:flex-row md:items-center">
            <div>
              <p className="display text-2xl">{t("still")}</p>
              <p className="mt-2 text-graphite">{t("stillText")}</p>
            </div>
            <ButtonLink href="/contact">{t("stillCta")}</ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
