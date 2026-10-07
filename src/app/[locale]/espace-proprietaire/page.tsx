import { forbidden } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export const metadata = { robots: { index: false, follow: false } };

/** Owner area: access is granted by invitation only, so visitors always get the 403 page. */
export default async function OwnerAreaPage({ params }: PageProps<"/[locale]/espace-proprietaire">) {
  const { locale } = await params;
  setRequestLocale(locale);
  forbidden();
}
