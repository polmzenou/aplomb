import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { pad, tr } from "@/lib/utils";
import { ContactForm } from "@/components/forms/ContactForm";
import { FranceMapStatic } from "@/components/sections/FranceMapStatic";
import { PageHeader } from "@/components/sections/PageHeader";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/contact", titleKey: "contact" });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const n = await getTranslations("nav");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} intro={t("intro")} crumbs={[{ label: n("home"), href: "/" }, { label: n("contact") }]} />
      <section className="container-x grid gap-16 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="border border-ink p-6 md:p-10">
            <h2 className="display mb-10 text-3xl">{t("formTitle")}</h2>
            <ContactForm />
          </div>
          <div className="mt-8 border-l-2 border-terra bg-paper-2 p-6">
            <p className="font-semibold">{t("alert")}</p>
            <p className="mt-2 text-sm text-graphite">{t("alertText")}</p>
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow mb-6">{t("or")}</p>
          <a href={`tel:${site.phoneHref}`} className="display-tight link-underline text-3xl">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="mono link-underline mt-3 block text-sm">
            {site.email}
          </a>
          <FranceMapStatic className="mt-12" />
          <h2 className="eyebrow mb-4 mt-12">{t("offices")}</h2>
          <ul className="border-t border-ink">
            {site.offices.map((o, i) => (
              <li key={o.key} className="border-b border-line py-6">
                <Reveal delay={i * 0.08}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-2xl">
                      <span className="mono mr-3 align-middle text-xs text-terra">{pad(i + 1)}</span>
                      {o.city}
                    </h3>
                    <a
                      href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${o.street} ${o.zip} ${o.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.12em] hover:text-terra"
                    >
                      {t("directions")} <ArrowUpRight className="h-2.5 w-2.5" />
                    </a>
                  </div>
                  <p className="mt-2 text-graphite">
                    {o.street}, {o.zip} {o.city}
                  </p>
                  <p className="mono mt-2 text-xs">
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="link-underline">
                      {o.phone}
                    </a>
                    <span className="mx-2 text-mute">·</span>
                    <span className="text-mute">{tr(o.hours, locale)}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
