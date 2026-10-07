import { getTranslations, setRequestLocale } from "next-intl/server";
import { articles } from "@/data/content";
import { pageMetadata } from "@/lib/metadata";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArchitectsIndex } from "@/components/sections/home/ArchitectsIndex";
import { FeaturedRail } from "@/components/sections/home/FeaturedRail";
import { Hero } from "@/components/sections/home/Hero";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { PlanToStone } from "@/components/sections/home/PlanToStone";
import { Process } from "@/components/sections/home/Process";
import { Stats } from "@/components/sections/home/Stats";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/", titleKey: "home" });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Hero />
      <div className="border-y border-ink bg-ink py-5 text-paper">
        <Marquee items={t.raw("marquee") as string[]} className="display-tight text-[clamp(1.4rem,2.6vw,2.2rem)] uppercase" />
      </div>
      <Manifesto />
      <FeaturedRail />
      <Stats />
      <Process />
      <PlanToStone />
      <ArchitectsIndex />
      <Testimonials />
      <section className="container-x py-24 md:py-36">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading index="08" eyebrow={t("journal.eyebrow")} title={t("journal.title")} />
          <ButtonLink href="/journal" variant="outline" className="self-start md:self-end">
            {t("journal.cta")}
          </ButtonLink>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.1}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
