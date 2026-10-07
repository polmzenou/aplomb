import type { MetadataRoute } from "next";
import { articles } from "@/data/content";
import { properties } from "@/data/properties";
import { routing, type StaticPathname } from "@/i18n/routing";
import { localizedUrl, type Href } from "@/lib/metadata";
import { site } from "@/lib/site";

const staticPaths: StaticPathname[] = [
  "/",
  "/biens",
  "/architectes",
  "/vendre",
  "/agence",
  "/journal",
  "/contact",
  "/faq",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/politique-cookies",
  "/cgu",
  "/honoraires",
  "/accessibilite",
  "/plan-du-site",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs: Href[] = [
    ...staticPaths,
    ...properties.map((p) => ({ pathname: "/biens/[slug]" as const, params: { slug: p.slug } })),
    ...articles.map((a) => ({ pathname: "/journal/[slug]" as const, params: { slug: a.slug } })),
  ];
  return hrefs.map((href) => ({
    url: `${site.url}${localizedUrl(href, routing.defaultLocale)}`,
    lastModified: new Date("2026-09-18"),
    changeFrequency: href === "/" || href === "/biens" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : typeof href === "object" ? 0.7 : 0.8,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}${localizedUrl(href, l)}`])),
    },
  }));
}
