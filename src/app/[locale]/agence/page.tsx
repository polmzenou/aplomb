import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { team } from "@/data/content";
import { img, portrait } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { pad, tr } from "@/lib/utils";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { Timeline } from "@/components/sections/Timeline";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({ params }: PageProps<"/[locale]/agence">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/agence", titleKey: "agency" });
}

const officeImages = { paris: "parisRoofs", lyon: "geometricWhite", biarritz: "villaPoolSea" } as const;

export default async function AgencyPage({ params }: PageProps<"/[locale]/agence">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("agency");
  const n = await getTranslations("nav");
  const values = t.raw("values.items") as { title: string; text: string }[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} intro={t("intro")} crumbs={[{ label: n("home"), href: "/" }, { label: n("agency") }]} />

      <ParallaxImage src={img("terracottaCurves", 2200)} alt="" className="h-[60vh] md:h-[85vh]" strength={14} sizes="100vw" />

      <section className="container-x grid gap-10 py-24 md:grid-cols-12 md:py-36">
        <p className="eyebrow md:col-span-3">
          <span className="mr-4 text-terra">01</span>
          {t("eyebrow")}
        </p>
        <RevealText as="p" text={t("manifesto")} className="display-tight text-[clamp(1.7rem,3.6vw,3.4rem)] leading-[1.12] md:col-span-9" stagger={0.025} />
      </section>

      <section className="container-x pb-24 md:pb-36">
        <SectionHeading index="02" eyebrow={site.fullName} title={t("values.title")} />
        <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li key={v.title} className="bg-paper">
              <Reveal delay={i * 0.08} className="flex h-full flex-col p-6 md:p-8">
                <span className="mono text-xs text-terra">{pad(i + 1)}</span>
                <h3 className="display mt-8 text-2xl">{v.title}</h3>
                <p className="mt-4 leading-relaxed text-graphite">{v.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Timeline title={t("timeline")} />

      <section className="container-x py-24 md:py-36">
        <SectionHeading index="04" eyebrow={t("eyebrow")} title={t("team")} intro={t("teamIntro")} />
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {team.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={i * 0.06}>
                <div className="group relative mb-4 aspect-[4/5] overflow-hidden bg-paper-3">
                  <Image src={portrait(m.portrait, 600)} alt={m.name} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-graphite">{tr(m.role, locale)}</p>
                <p className="mono mt-2 text-[0.62rem] uppercase tracking-[0.12em] text-mute">
                  {m.office} · {m.languages}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-ink py-24 md:py-32">
        <div className="container-x">
          <SectionHeading index="05" eyebrow={site.offices.map((o) => o.city).join(" · ")} title={t("offices")} intro={t("officesIntro")} />
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {site.offices.map((o, i) => (
              <li key={o.key}>
                <Reveal delay={i * 0.08}>
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden">
                    <Image src={img(officeImages[o.key], 900)} alt={o.city} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                    <span className="mono absolute left-3 top-3 bg-paper px-2 py-1 text-[0.62rem]">{pad(i + 1)}</span>
                  </div>
                  <h3 className="display text-3xl">{o.city}</h3>
                  <p className="mt-3 text-graphite">
                    {o.street}
                    <br />
                    {o.zip} {o.city}
                  </p>
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="link-underline mono mt-3 inline-block text-sm">
                    {o.phone}
                  </a>
                  <p className="mono mt-1 text-[0.66rem] text-mute">{tr(o.hours, locale)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
