import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { ConsentProvider } from "@/components/cookies/ConsentProvider";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeaderThemeProvider } from "@/components/layout/HeaderTheme";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CompareProvider } from "@/components/property/CompareProvider";
import { ToastProvider } from "@/components/ui/Toast";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#ece8e1",
  colorScheme: "light",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: site.fullName, template: `%s · ${site.fullName}` },
    description: t("siteDescription"),
    applicationName: site.fullName,
    formatDetection: { telephone: false },
    authors: [{ name: site.fullName, url: site.url }],
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.fullName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    foundingDate: String(site.founded),
    email: site.email,
    telephone: site.phone,
    address: site.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.city,
      postalCode: o.zip,
      addressCountry: "FR",
    })),
    areaServed: ["Paris", "Lyon", "Pays basque", "Bassin d'Arcachon", "Provence", "Normandie", "Haute-Savoie"],
  };

  return (
    <html lang={locale} className={fontVariables}>
      <body className="grain flex min-h-dvh flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NextIntlClientProvider>
          <ConsentProvider>
            <ToastProvider>
              <CompareProvider>
                <HeaderThemeProvider>
                  <SmoothScroll>
                    <Preloader />
                    <Cursor />
                    <Header />
                    <main id="main" className="flex-1">
                      {children}
                    </main>
                    <Footer />
                    <CookieBanner />
                  </SmoothScroll>
                </HeaderThemeProvider>
              </CompareProvider>
            </ToastProvider>
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
