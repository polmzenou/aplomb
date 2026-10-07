import { getLocale, getTranslations } from "next-intl/server";
import { Counter } from "@/components/ui/Counter";
import { DrawLine, Reveal } from "@/components/ui/Reveal";

type Stat = { value: number; suffix: string; label: string };

export async function Stats() {
  const t = await getTranslations("home.stats");
  const locale = await getLocale();
  const items = t.raw("items") as Stat[];
  return (
    <section className="container-x py-24 md:py-32" aria-label={t("eyebrow")}>
      <p className="eyebrow mb-10">
        <span className="mr-4 text-terra">03</span>
        {t("eyebrow")}
      </p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {items.map((s, i) => (
          <li key={s.label}>
            <Reveal delay={i * 0.1}>
              <DrawLine className="mb-6 text-ink" delay={i * 0.1} />
              <Counter value={s.value} suffix={s.suffix} locale={locale} className="display block text-[clamp(3.5rem,8vw,7.5rem)] tabular-nums" />
              <p className="mono mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-graphite">{s.label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
