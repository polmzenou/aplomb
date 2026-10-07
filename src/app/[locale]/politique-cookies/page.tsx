import { getTranslations, setRequestLocale } from "next-intl/server";
import { cookiePolicy, cookieRows } from "@/data/legal";
import { pageMetadata } from "@/lib/metadata";
import { tr } from "@/lib/utils";
import { LegalPage } from "@/components/sections/LegalPage";
import { ManageCookiesButton } from "@/components/sections/PrintButton";

export async function generateMetadata({ params }: PageProps<"/[locale]/politique-cookies">) {
  const { locale } = await params;
  return pageMetadata({ locale, href: "/politique-cookies", titleKey: "cookies" });
}

export default async function CookiePolicyPage({ params }: PageProps<"/[locale]/politique-cookies">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta.titles");
  const l = await getTranslations("legalPages");
  const c = await getTranslations("cookies.categories");

  const table = (
    <div className="max-w-3xl overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="mono border-b border-ink text-[0.64rem] uppercase tracking-[0.12em] text-mute">
            <th className="py-3 pr-4 font-normal">{l("cookieTable.name")}</th>
            <th className="py-3 pr-4 font-normal">{l("cookieTable.purpose")}</th>
            <th className="py-3 pr-4 font-normal">{l("cookieTable.duration")}</th>
            <th className="py-3 font-normal">{l("cookieTable.category")}</th>
          </tr>
        </thead>
        <tbody>
          {cookieRows.map((row) => (
            <tr key={row.name} className="border-b border-line align-top">
              <td className="mono py-3 pr-4 text-xs">{row.name}</td>
              <td className="py-3 pr-4 text-graphite">{tr(row.purpose, locale)}</td>
              <td className="py-3 pr-4 text-graphite">{tr(row.duration, locale)}</td>
              <td className="py-3">
                <span className={row.category === "necessary" ? "mono bg-ink px-1.5 py-0.5 text-[0.6rem] uppercase text-paper" : "mono border border-ink px-1.5 py-0.5 text-[0.6rem] uppercase"}>
                  {c(`${row.category}.title`)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return <LegalPage locale={locale} doc={cookiePolicy} title={t("cookies")} extra={{ list: table, manage: <ManageCookiesButton label={l("manageCookies")} /> }} />;
}
