import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/biens": { fr: "/biens", en: "/properties" },
    "/biens/[slug]": { fr: "/biens/[slug]", en: "/properties/[slug]" },
    "/architectes": { fr: "/architectes", en: "/architects" },
    "/vendre": { fr: "/vendre", en: "/sell" },
    "/agence": { fr: "/agence", en: "/agency" },
    "/journal": "/journal",
    "/journal/[slug]": "/journal/[slug]",
    "/selection": { fr: "/selection", en: "/shortlist" },
    "/contact": "/contact",
    "/faq": "/faq",
    "/espace-proprietaire": { fr: "/espace-proprietaire", en: "/owner-area" },
    "/mentions-legales": { fr: "/mentions-legales", en: "/legal-notice" },
    "/politique-de-confidentialite": { fr: "/politique-de-confidentialite", en: "/privacy-policy" },
    "/politique-cookies": { fr: "/politique-cookies", en: "/cookie-policy" },
    "/cgu": { fr: "/cgu", en: "/terms-of-use" },
    "/honoraires": { fr: "/honoraires", en: "/fees" },
    "/accessibilite": { fr: "/accessibilite", en: "/accessibility" },
    "/plan-du-site": { fr: "/plan-du-site", en: "/site-map" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
/** Static (parameter-free) routes, usable as a plain `href`. */
export type StaticPathname = Exclude<AppPathname, `${string}[${string}`>;
