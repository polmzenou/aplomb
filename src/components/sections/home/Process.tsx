import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pad } from "@/lib/utils";

type Step = { title: string; text: string; duration: string };

/** Method in four steps, laid out like a dimensioned section drawing. */
export async function Process() {
  const t = await getTranslations("home.process");
  const steps = t.raw("steps") as Step[];
  return (
    <section className="bg-ink py-24 text-paper md:py-36">
      <div className="container-x">
        <SectionHeading index="04" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} dark />
        <ol className="mt-20 grid gap-px bg-paper/15 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-ink">
              <Reveal delay={i * 0.12} className="flex h-full flex-col p-6 pt-0 md:p-8 md:pt-0">
                {/* dimension line with tick marks */}
                <div className="mb-10 flex items-center gap-3 pt-6 text-terra-soft">
                  <span className="dim-line flex-1" />
                  <span className="mono text-[0.62rem]">{s.duration}</span>
                </div>
                <span className="mono text-xs text-paper/40">{pad(i + 1)}</span>
                <h3 className="display mt-3 text-[clamp(1.8rem,2.6vw,2.6rem)]">{s.title}</h3>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-paper/65">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
