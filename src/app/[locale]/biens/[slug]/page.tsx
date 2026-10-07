import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArchitect } from "@/data/architects";
import { getProperty, properties, similarProperties } from "@/data/properties";
import { routing } from "@/i18n/routing";
import { img, portrait } from "@/lib/images";
import { localizedUrl, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { formatNumber, pad, tr } from "@/lib/utils";
import { EnergyRating } from "@/components/property/EnergyRating";
import { FloorPlan } from "@/components/property/FloorPlan";
import { Gallery } from "@/components/property/Gallery";
import { ModelViewer } from "@/components/property/ModelViewer";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyHero } from "@/components/property/PropertyHero";
import { SectionNav } from "@/components/property/SectionNav";
import { VisitForm } from "@/components/property/VisitForm";
import { ButtonLink } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { DrawLine, Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => properties.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/biens/[slug]">) {
  const { locale, slug } = await params;
  const p = getProperty(slug);
  if (!p) return {};
  return pageMetadata({
    locale,
    href: { pathname: "/biens/[slug]", params: { slug } },
    title: `${p.title} — ${p.city}`,
    description: tr(p.excerpt, locale),
    image: img(p.cover, 1200),
  });
}

function Heading({ index, children, id }: { index: number; children: React.ReactNode; id?: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="mono text-xs text-terra">{pad(index)}</span>
      <h2 id={id} className="display text-[clamp(1.8rem,3.4vw,3rem)]">
        {children}
      </h2>
      <DrawLine className="flex-1 text-line" />
    </div>
  );
}

export default async function PropertyPage({ params }: PageProps<"/[locale]/biens/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = getProperty(slug);
  if (!p) notFound();
  const t = await getTranslations("property");
  const n = await getTranslations("nav");
  const architect = getArchitect(p.architect);
  const similar = similarProperties(p.slug);
  // Reduced notary fees apply to buildings under five years old.
  const recentBuild = !p.renovated && p.year >= 2021;

  const figures = [
    { label: t("surface"), value: `${formatNumber(p.surface, locale)} m²` },
    p.land && { label: t("land"), value: `${formatNumber(p.land, locale)} m²` },
    p.terrace && { label: t("terrace"), value: `${formatNumber(p.terrace, locale)} m²` },
    { label: t("rooms"), value: String(p.rooms) },
    { label: t("bedrooms"), value: String(p.bedrooms) },
    { label: t("bathrooms"), value: String(p.bathrooms) },
    { label: t("year"), value: String(p.year) },
    p.renovated && { label: t("renovated"), value: String(p.renovated) },
    { label: t("reference"), value: p.ref },
  ].filter(Boolean) as { label: string; value: string }[];

  const sections = [
    { id: "presentation", label: t("sections.overview") },
    { id: "plan", label: t("sections.plan") },
    { id: "maquette", label: t("sections.model") },
    { id: "galerie", label: t("sections.gallery") },
    { id: "financement", label: t("sections.financing") },
  ];

  const url = `${site.url}${localizedUrl({ pathname: "/biens/[slug]", params: { slug } }, locale)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    description: tr(p.excerpt, locale),
    url,
    image: p.gallery.map((k) => img(k, 1600)),
    datePosted: "2026-09-01",
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "EUR",
      availability: p.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
    itemOffered: {
      "@type": p.type === "apartment" || p.type === "loft" ? "Apartment" : "SingleFamilyResidence",
      floorSize: { "@type": "QuantitativeValue", value: p.surface, unitCode: "MTK" },
      numberOfRooms: p.rooms,
      numberOfBedrooms: p.bedrooms,
      numberOfBathroomsTotal: p.bathrooms,
      yearBuilt: p.year,
      address: { "@type": "PostalAddress", addressLocality: p.city, addressCountry: "FR" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PropertyHero property={p} crumbs={{ home: n("home"), list: n("properties") }} />
      <SectionNav items={sections} cta={p.status !== "sold" ? { id: "visite", label: t("visit.title") } : undefined} />

      {/* overview */}
      <section id="presentation" className="container-x scroll-mt-20 py-20 md:py-28">
        {p.status === "sold" && <p className="mb-12 border-l-2 border-terra bg-paper-2 p-5 text-sm text-graphite">{t("soldNote")}</p>}
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading index={1}>{t("sections.overview")}</Heading>
            <div className="prose-arch text-[1.08rem]">
              {p.description.map((para, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className={i === 0 ? "text-[1.25rem] !text-ink first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-terra" : undefined}>{tr(para, locale)}</p>
                </Reveal>
              ))}
            </div>
            <h3 className="eyebrow mb-5 mt-14">{t("features")}</h3>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 border-t border-line py-3.5 text-[0.95rem]">
                  <Check className="mt-1.5 h-2.5 w-3 shrink-0 text-terra" />
                  {tr(f, locale)}
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-24">
              <div className="border border-ink">
                <p className="eyebrow border-b border-ink bg-ink px-5 py-3 text-paper">{t("keyFigures")}</p>
                <dl>
                  {figures.map((f) => (
                    <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3 last:border-b-0">
                      <dt className="text-sm text-graphite">{f.label}</dt>
                      <dd className="mono text-sm">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {architect && (
                <div className="mt-6 flex items-center gap-4 border border-line p-4">
                  <span className="relative h-16 w-14 shrink-0 overflow-hidden">
                    <Image src={portrait(architect.portrait, 200)} alt={architect.name} fill sizes="56px" className="object-cover grayscale" />
                  </span>
                  <div>
                    <p className="eyebrow mb-1">{t("architect")}</p>
                    <p className="font-semibold leading-tight">{architect.name}</p>
                    <p className="text-xs text-mute">{architect.studio}</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* plan */}
      <section id="plan" className="scroll-mt-20 border-t border-line bg-paper-2 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading index={2}>{t("planTitle")}</Heading>
            <p className="eyebrow mb-3 text-terra">{tr(p.plan.label, locale)}</p>
            <p className="text-graphite">{t("planHint")}</p>
            <p className="mono mt-8 text-[0.66rem] uppercase tracking-[0.12em] text-mute">{t("planNote")}</p>
          </div>
          <div className="graph-paper border border-line bg-paper p-4 md:p-8 lg:col-span-8">
            <FloorPlan plan={p.plan} interactive />
          </div>
        </div>
      </section>

      {/* model */}
      <section id="maquette" className="container-x scroll-mt-20 py-20 md:py-28">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <Heading index={3}>{t("modelTitle")}</Heading>
          </div>
          <p className="max-w-sm text-graphite md:mb-10">{t("modelHint")}</p>
        </div>
        <ModelViewer property={p} />
      </section>

      {/* gallery */}
      <section id="galerie" className="container-x scroll-mt-20 pb-20 md:pb-28">
        <Heading index={4}>{t("galleryTitle")}</Heading>
        <Gallery images={p.gallery} title={p.title} />
      </section>

      {/* energy + financing */}
      <section id="financement" className="scroll-mt-20 border-t border-line py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading index={5}>{t("energyTitle")}</Heading>
            <EnergyRating energy={p.energy} ghg={p.ghg} energyValue={p.energyValue} ghgValue={p.ghgValue} />
          </div>
          <div className="lg:col-span-7">
            <Heading index={6}>{t("mortgage.title")}</Heading>
            <p className="mb-8 text-graphite">{t("mortgage.intro")}</p>
            <MortgageCalculator price={p.price} recentBuild={recentBuild} />
          </div>
        </div>
      </section>

      {/* visit */}
      {p.status !== "sold" && (
        <section id="visite" className="scroll-mt-20 bg-paper-2 py-20 md:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading index={7}>{t("visit.title")}</Heading>
              <p className="text-graphite">{t("visit.intro")}</p>
              <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden lg:block">
                <Image src={img(p.gallery[1] ?? p.cover, 800)} alt="" fill sizes="30vw" className="object-cover" />
              </div>
            </div>
            <div className="border border-ink bg-paper p-6 md:p-10 lg:col-span-7 lg:col-start-6">
              <p className="mono mb-8 flex justify-between text-[0.66rem] uppercase tracking-[0.12em] text-mute">
                <span>{p.title}</span>
                <span>{p.ref}</span>
              </p>
              <VisitForm title={p.title} />
            </div>
          </div>
        </section>
      )}

      {/* architect */}
      {architect && (
        <section className="container-x py-20 md:py-28">
          <div className="grid items-center gap-10 border-y border-ink py-12 md:grid-cols-12">
            <div className="relative aspect-[4/5] overflow-hidden md:col-span-3">
              <Image src={portrait(architect.portrait, 600)} alt={architect.name} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover grayscale" />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <p className="eyebrow mb-4 text-terra">{t("architectCard.title")}</p>
              <p className="display-tight text-[clamp(1.8rem,3.4vw,3rem)]">{architect.name}</p>
              <p className="mono mt-2 text-[0.7rem] uppercase tracking-[0.12em] text-mute">
                {architect.studio} · {architect.base}
              </p>
              <blockquote className="accent mt-8 text-[clamp(1.4rem,2.4vw,2.2rem)] leading-snug">« {tr(architect.quote, locale)} »</blockquote>
              <p className="mt-6 max-w-2xl text-graphite">{tr(architect.bio, locale)}</p>
              <div className="mt-8">
                <ButtonLink href="/architectes" variant="outline">
                  {t("architectCard.cta")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* similar */}
      {similar.length > 0 && (
        <section className="container-x pb-24 md:pb-32">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(1.8rem,3.4vw,3rem)]">{t("similar")}</h2>
            <ButtonLink href="/biens" variant="ghost">
              {t("back")}
            </ButtonLink>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <PropertyCard key={s.slug} property={s} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
