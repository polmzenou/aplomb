"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { legalNav, mainNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { tr } from "@/lib/utils";
import { useConsent } from "@/components/cookies/ConsentProvider";
import { ArrowUp, Instagram, LinkedIn, Pinterest } from "@/components/ui/Icons";
import { PlumbMark } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";
import { useLenis } from "./SmoothScroll";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const locale = useLocale();
  const { openPreferences } = useConsent();
  const lenis = useLenis();

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-paper">
      <div className="blueprint-paper pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="container-x relative">
        <div className="grid gap-14 border-b border-paper/15 py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="display text-[clamp(2rem,4vw,3.4rem)]">
              {t("title")} <span className="accent text-terra-soft">{t("titleAccent")}</span>
            </p>
            <p className="mt-6 max-w-md text-paper/60">{t("text")}</p>
            <div className="mt-10 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label={t("explore")} className="lg:col-span-2 lg:col-start-7">
            <p className="eyebrow mb-5 text-paper/45">{t("explore")}</p>
            <ul className="space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="link-underline text-paper/80 hover:text-paper">
                    {n(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/faq" className="link-underline text-paper/80 hover:text-paper">
                  {n("faq")}
                </Link>
              </li>
              <li>
                <Link href="/espace-proprietaire" className="link-underline text-paper/80 hover:text-paper">
                  {n("owners")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow mb-5 text-paper/45">{t("offices")}</p>
            <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {site.offices.map((o) => (
                <li key={o.key} className="text-sm leading-relaxed">
                  <p className="font-semibold">{o.city}</p>
                  <p className="text-paper/60">
                    {o.street}, {o.zip}
                  </p>
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="link-underline text-paper/60 hover:text-paper">
                    {o.phone}
                  </a>
                  <p className="mono mt-1 text-[0.65rem] text-paper/40">{tr(o.hours, locale)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-8 border-b border-paper/15 py-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-paper/55">
            {legalNav.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="link-underline hover:text-paper">
                  {n(`legal.${item.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <button type="button" onClick={openPreferences} className="link-underline hover:text-paper">
                {t("manageCookies")}
              </button>
            </li>
          </ul>
          <div className="flex items-center gap-5">
            {[
              { href: site.instagram, label: "Instagram", Icon: Instagram },
              { href: site.linkedin, label: "LinkedIn", Icon: LinkedIn },
              { href: site.pinterest, label: "Pinterest", Icon: Pinterest },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-paper/60 transition-colors hover:text-terra-soft">
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
            <button type="button" onClick={toTop} aria-label={t("backToTop")} className="ml-4 flex h-10 w-10 items-center justify-center border border-paper/30 transition-colors hover:bg-paper hover:text-ink">
              <ArrowUp className="h-3.5 w-3" />
            </button>
          </div>
        </div>

        <div className="relative select-none pb-6 pt-10" aria-hidden="true">
          <div className="flex items-end justify-between gap-4">
            <span className="display block text-[19.5vw] leading-[0.78] text-paper/[0.92] [font-variation-settings:'wdth'_125]">APLOMB</span>
            <PlumbMark className="mb-[1.5vw] h-[12vw] w-[7.5vw] text-paper" animated />
          </div>
        </div>
        <div className="mono flex flex-col gap-2 pb-8 text-[0.62rem] uppercase tracking-[0.14em] text-paper/40 md:flex-row md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.company.legalName} — {t("card")} {site.company.card}
          </span>
          <span>{t("since", { year: site.founded })}</span>
        </div>
      </div>
    </footer>
  );
}
