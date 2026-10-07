import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { img } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealText } from "@/components/ui/Reveal";

/** Closing call to action toward the valuation page. */
export async function CtaBand() {
  const t = await getTranslations("home.cta");
  return (
    <section className="container-x py-16 md:py-24">
      <div className="relative grid overflow-hidden bg-terra text-paper md:grid-cols-12">
        <div className="relative z-10 p-8 md:col-span-7 md:p-14 lg:p-20">
          <p className="eyebrow mb-6 text-paper/70">{t("eyebrow")}</p>
          <RevealText text={t("title")} className="display text-[clamp(2.2rem,5vw,4.6rem)]" />
          <p className="accent mt-1 text-[clamp(1.8rem,3.6vw,3.4rem)] leading-none text-ink">{t("accent")}</p>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-paper/85">{t("text")}</p>
            <div className="mt-10">
              <ButtonLink href="/vendre" variant="ink">
                {t("button")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <div className="relative min-h-72 md:col-span-5">
          <Image src={img("houseTreeDark", 1000)} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover mix-blend-multiply grayscale" />
          <div className="pointer-events-none absolute inset-6 border border-paper/50" aria-hidden="true">
            <span className="mono absolute -top-3 left-4 bg-terra px-2 text-[0.6rem] uppercase tracking-[0.14em]">72 h</span>
          </div>
        </div>
      </div>
    </section>
  );
}
