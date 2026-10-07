import { getTranslations, setRequestLocale } from "next-intl/server";
import { img } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { pad } from "@/lib/utils";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: PageProps<"/[locale]/vendre">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/vendre", titleKey: "sell" });
}

export default async function SellPage({ params }: PageProps<"/[locale]/vendre">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sell");
  const n = await getTranslations("nav");
  const h = await getTranslations("home");
  const why = t.raw("why.items") as { title: string; text: string }[];
  const steps = h.raw("process.steps") as { title: string; text: string; duration: string }[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        accent={t("accent")}
        intro={t("intro")}
        crumbs={[{ label: n("home"), href: "/" }, { label: n("sell") }]}
        aside={<ParallaxImage src={img("houseBlackGarden", 1000)} alt="" className="aspect-[4/5]" reveal sizes="(min-width: 1024px) 33vw, 100vw" />}
      />

      <section className="container-x grid gap-14 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display text-3xl md:text-4xl">{t("why.title")}</h2>
          <ul className="mt-10 space-y-8">
            {why.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 0.08} className="border-t border-ink pt-5">
                  <p className="mono mb-2 text-xs text-terra">{pad(i + 1)}</p>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-graphite">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <div id="estimation" className="scroll-mt-24 lg:col-span-7 lg:col-start-6">
          <h2 className="display text-3xl md:text-4xl">{t("form.title")}</h2>
          <p className="mb-10 mt-4 max-w-xl text-graphite">{t("form.intro")}</p>
          <EstimateForm />
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="container-x">
          <p className="eyebrow mb-10 text-paper/60">{h("process.eyebrow")}</p>
          <ol className="grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-paper/25 pt-6">
                <div className="mono mb-4 flex justify-between text-xs">
                  <span className="text-terra-soft">{pad(i + 1)}</span>
                  <span className="text-paper/50">{s.duration}</span>
                </div>
                <h3 className="display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
