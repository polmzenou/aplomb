import type { StaticPathname } from "@/i18n/routing";
import type { ImageKey } from "./images";

export const mainNav: { key: string; href: StaticPathname; image: ImageKey }[] = [
  { key: "properties", href: "/biens", image: "villaPoolTerrace" },
  { key: "architects", href: "/architectes", image: "drawing" },
  { key: "sell", href: "/vendre", image: "houseTreeDark" },
  { key: "agency", href: "/agence", image: "geometricWhite" },
  { key: "journal", href: "/journal", image: "concreteNight" },
  { key: "contact", href: "/contact", image: "parisRoofs" },
];

export const legalNav: { key: string; href: StaticPathname }[] = [
  { key: "legal", href: "/mentions-legales" },
  { key: "privacy", href: "/politique-de-confidentialite" },
  { key: "cookies", href: "/politique-cookies" },
  { key: "terms", href: "/cgu" },
  { key: "fees", href: "/honoraires" },
  { key: "accessibility", href: "/accessibilite" },
  { key: "sitemap", href: "/plan-du-site" },
];
