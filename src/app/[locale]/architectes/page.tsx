import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { architects } from "@/data/architects";
import { properties } from "@/data/properties";
import { Link } from "@/i18n/navigation";
import { img, portrait } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { pad, tr } from "@/lib/utils";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export async function generateMetadata({ params }: PageProps<"/[locale]/architectes">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/architectes", titleKey: "architects" });
}

export default async function ArchitectsPage({ params }: PageProps<"/[locale]/architectes">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("architectsPage");
  const n = await getTranslations("nav");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} intro={t("intro")} crumbs={[{ label: n("home"), href: "/" }, { label: n("architects") }]} />

      <div className="container-x pb-24">
        {architects.map((a, i) => {
          const works = properties.filter((p) => p.architect === a.slug);
          const forSale = works.filter((p) => p.status !== "sold");
          const reversed = i % 2 === 1;
          return (
            <article key={a.slug} id={a.slug} className="grid scroll-mt-24 gap-10 border-t border-ink py-16 md:py-24 lg:grid-cols-12">
              <Reveal className={reversed ? "lg:order-2 lg:col-span-4 lg:col-start-9" : "lg:col-span-4"}>
                <TiltCard className="relative aspect-[4/5]">
                  <Image src={portrait(a.portrait, 800)} alt={a.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover grayscale" />
                  <span className="mono absolute left-3 top-3 bg-paper px-2 py-1 text-[0.62rem]">{pad(i + 1)}</span>
                </TiltCard>
              </Reveal>
              <div className={reversed ? "lg:order-1 lg:col-span-7" : "lg:col-span-7 lg:col-start-6"}>
                <p className="eyebrow mb-4 text-terra">{a.studio}</p>
                <h2 className="display text-[clamp(2.2rem,5vw,4.6rem)]">{a.name}</h2>
                <p className="accent mt-2 text-[clamp(1.4rem,2.6vw,2.2rem)] text-graphite">{tr(a.signature, locale)}</p>
                <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-graphite">{tr(a.bio, locale)}</p>
                <blockquote className="accent mt-8 border-l-2 border-terra pl-5 text-2xl leading-snug">« {tr(a.quote, locale)} »</blockquote>
                <dl className="mono mt-10 grid gap-6 text-[0.7rem] uppercase tracking-[0.12em] sm:grid-cols-3">
                  <div>
                    <dt className="mb-1 text-mute">{t("baseLabel")}</dt>
                    <dd>{a.base}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-mute">{t("sinceLabel")}</dt>
                    <dd>{a.since}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-mute">{t("materials")}</dt>
                    <dd>{a.materials.map((m) => tr(m, locale)).join(" · ")}</dd>
                  </div>
                </dl>
                {works.length > 0 && (
                  <div className="mt-12">
                    <p className="eyebrow mb-4">{t("properties", { count: forSale.length })}</p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {works.map((p) => (
                        <li key={p.slug}>
                          <Link href={{ pathname: "/biens/[slug]", params: { slug: p.slug } }} className="group flex items-center gap-4 border border-line p-2 pr-4 transition-colors hover:border-ink">
                            <span className="relative h-16 w-20 shrink-0 overflow-hidden">
                              <Image src={img(p.cover, 300)} alt="" fill sizes="80px" className={p.status === "sold" ? "object-cover grayscale" : "object-cover"} />
                            </span>
                            <span>
                              <span className="block font-semibold leading-tight group-hover:text-terra">{p.title}</span>
                              <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-mute">{p.city}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          );
        })}

        <section className="graph-paper mt-8 flex flex-col items-start justify-between gap-8 border border-ink p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="display text-3xl md:text-4xl">{t("join.title")}</h2>
            <p className="mt-3 max-w-xl text-graphite">{t("join.text")}</p>
          </div>
          <ButtonLink href="/contact">{t("join.cta")}</ButtonLink>
        </section>
      </div>
    </>
  );
}
