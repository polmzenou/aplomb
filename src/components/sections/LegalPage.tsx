import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { LegalDoc } from "@/data/legal";
import { formatDate, pad, tr } from "@/lib/utils";
import { PageHeader } from "./PageHeader";
import { PrintButton } from "./PrintButton";

type Props = {
  locale: string;
  doc: LegalDoc;
  title: string;
  /** Extra content appended to a section, keyed by section id. */
  extra?: Record<string, ReactNode>;
};

/** Shared layout for legal documents: numbered sections with a sticky table of contents. */
export async function LegalPage({ locale, doc, title, extra = {} }: Props) {
  const t = await getTranslations("legalPages");
  const n = await getTranslations("nav");
  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={title}
        intro={tr(doc.intro, locale)}
        crumbs={[{ label: n("home"), href: "/" }, { label: title }]}
      />
      <div className="container-x grid gap-12 pb-24 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="mono mb-6 text-[0.66rem] uppercase tracking-[0.12em] text-mute">{t("updated", { date: formatDate(doc.updated, locale) })}</p>
            <nav aria-label={t("toc")}>
              <p className="eyebrow mb-4">{t("toc")}</p>
              <ol className="space-y-2 border-l border-ink pl-4 text-sm">
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="group flex gap-3 py-0.5 hover:text-terra">
                      <span className="mono text-[0.66rem] text-terra">{pad(i + 1)}</span>
                      <span className="link-underline">{tr(s.title, locale)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <PrintButton label={t("print")} />
          </div>
        </aside>
        <div className="lg:col-span-8 lg:col-start-5">
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-ink py-10 first:border-t-0 first:pt-0">
              <h2 className="display-tight mb-6 flex items-baseline gap-4 text-2xl md:text-3xl">
                <span className="mono text-sm text-terra">{pad(i + 1)}</span>
                {tr(s.title, locale)}
              </h2>
              <div className="prose-arch max-w-3xl">
                {s.body.map((p, j) => (
                  <p key={j}>{tr(p, locale)}</p>
                ))}
                {s.list && (
                  <ul className="mt-2 space-y-2">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex gap-3 text-graphite">
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-terra" />
                        {tr(item, locale)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {extra[s.id]}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
