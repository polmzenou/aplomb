import { getTranslations, setRequestLocale } from "next-intl/server";
import { fees, feeSchedule } from "@/data/legal";
import { pageMetadata } from "@/lib/metadata";
import { tr } from "@/lib/utils";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/honoraires">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/honoraires", titleKey: "fees" });
}

export default async function FeesPage({ params }: PageProps<"/[locale]/honoraires">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta.titles");
  const l = await getTranslations("legalPages");

  const table = (
    <div className="max-w-3xl">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="mono border-b border-ink text-[0.64rem] uppercase tracking-[0.12em] text-mute">
            <th className="py-3 pr-4 font-normal">{l("feesTable.range")}</th>
            <th className="py-3 text-right font-normal">{l("feesTable.fee")}</th>
          </tr>
        </thead>
        <tbody>
          {feeSchedule.map((row) => (
            <tr key={row.range.fr} className="border-b border-line">
              <td className="py-4 pr-4">{tr(row.range, locale)}</td>
              <td className="mono py-4 text-right">{tr(row.fee, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 border-l-2 border-terra bg-paper-2 p-4 text-sm text-graphite">{l("feesExample")}</p>
    </div>
  );

  return <LegalPage locale={locale} doc={fees} title={t("fees")} extra={{ sale: table }} />;
}
