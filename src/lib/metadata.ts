import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site } from "./site";

export type Href = Parameters<typeof getPathname>[0]["href"];

export function localizedUrl(href: Href, locale: string) {
  return getPathname({ href, locale });
}

export function alternates(href: Href, locale: string) {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(href, l)]));
  return {
    canonical: localizedUrl(href, locale),
    languages: { ...languages, "x-default": localizedUrl(href, routing.defaultLocale) },
  };
}

/** Builds title, description, hreflang alternates and social cards for a page. */
export async function pageMetadata({
  locale,
  href,
  titleKey,
  title,
  description,
  image,
}: {
  locale: string;
  href: Href;
  titleKey?: string;
  title?: string;
  description?: string;
  image?: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const pageTitle = title ?? (titleKey ? t(`titles.${titleKey}`) : site.fullName);
  const desc = description ?? (titleKey && t.has(`descriptions.${titleKey}`) ? t(`descriptions.${titleKey}`) : t("siteDescription"));
  const url = localizedUrl(href, locale);
  return {
    title: href === "/" ? { absolute: `${site.fullName} — ${pageTitle}` } : pageTitle,
    description: desc,
    alternates: alternates(href, locale),
    openGraph: {
      title: pageTitle,
      description: desc,
      url,
      siteName: site.fullName,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title: pageTitle, description: desc },
  };
}
