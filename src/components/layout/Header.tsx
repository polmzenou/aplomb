"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useFavorites } from "@/lib/favorites";
import { img } from "@/lib/images";
import { mainNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn, pad, tr } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Bookmark } from "@/components/ui/Icons";
import { useHeaderTheme } from "./HeaderTheme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLenis } from "./SmoothScroll";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { dark } = useHeaderTheme();
  const { favorites } = useFavorites();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 300 && y > prev && !open);
  });

  // Close the menu on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- route change closes the overlay
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const light = (dark && !scrolled) || open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a href="#main" className="sr-only z-[100] bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {t("skip")}
      </a>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,color] duration-500",
          scrolled && !open ? "border-b border-line/70 bg-paper/85 backdrop-blur-md" : "border-b border-transparent",
          light ? "text-paper" : "text-ink",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.fullName} — ${t("home")}`} className="relative z-10" data-cursor="hover">
            <Logo />
          </Link>

          <nav aria-label={t("main")} className="hidden items-center gap-7 lg:flex">
            {mainNav.slice(0, 5).map((item, i) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative flex items-baseline gap-1.5 text-[0.82rem] font-medium"
              >
                <span className={cn("mono text-[0.58rem] transition-colors", isActive(item.href) ? "text-terra" : "opacity-50")}>{pad(i + 1)}</span>
                <span className="link-underline">{t(item.key)}</span>
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-4 md:gap-6">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link href="/selection" className="relative flex items-center gap-2 text-[0.8rem]" aria-label={t("selectionCount", { count: favorites.length })} data-cursor="hover">
              <Bookmark className="h-4 w-3.5" filled={favorites.length > 0} />
              <span className="mono hidden text-[0.7rem] md:inline">{pad(favorites.length)}</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-3"
              data-cursor="hover"
            >
              <span className="mono hidden text-[0.7rem] uppercase tracking-[0.16em] sm:inline">{open ? t("close") : t("menu")}</span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span className={cn("absolute left-0 h-px w-full bg-current transition-transform duration-500", open ? "top-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px bg-current transition-all duration-500", open ? "top-1/2 w-full -rotate-45" : "bottom-0 w-2/3 group-hover:w-full")} />
              </span>
              <span className="sr-only">{t("menu")}</span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-[65] overflow-y-auto bg-ink text-paper"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
            data-lenis-prevent
          >
            <div className="blueprint-paper pointer-events-none absolute inset-0 opacity-[0.12]" />
            <div className="container-x relative grid min-h-full grid-cols-1 gap-10 pb-10 pt-[calc(var(--header-h)+2rem)] lg:grid-cols-12">
              <nav aria-label={t("main")} className="lg:col-span-7">
                <ul>
                  {mainNav.map((item, i) => (
                    <motion.li
                      key={item.key}
                      className="border-b border-paper/15"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onMouseEnter={() => setHovered(i)}
                        onFocus={() => setHovered(i)}
                        className="group flex items-baseline gap-5 py-3 md:py-4"
                      >
                        <span className="mono w-8 text-xs text-terra-soft">{pad(i + 1)}</span>
                        <span className="display text-[clamp(2.2rem,6.4vw,5.4rem)] transition-transform duration-500 ease-[var(--ease-out-arch)] group-hover:translate-x-4">
                          {t(item.key)}
                        </span>
                        <span className="accent ml-auto hidden text-2xl text-paper/50 transition-opacity md:block md:opacity-0 md:group-hover:opacity-100">
                          {t(`${item.key}Hint`)}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <LanguageSwitcher className="mt-8 text-sm sm:hidden" />
              </nav>
              <motion.aside
                className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="relative hidden aspect-[4/5] overflow-hidden lg:block">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={hovered}
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      animate={{ clipPath: "inset(0% 0 0 0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
                    >
                      <Image src={img(mainNav[hovered].image, 900)} alt="" fill sizes="30vw" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                  <span className="mono absolute bottom-3 left-3 bg-ink px-2 py-1 text-[0.6rem] uppercase tracking-widest">
                    {pad(hovered + 1)} — {t(mainNav[hovered].key)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {site.offices.map((o) => (
                    <div key={o.key}>
                      <p className="eyebrow mb-2 text-paper/50">{o.city}</p>
                      <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="link-underline block text-paper/80">
                        {o.phone}
                      </a>
                      <p className="mt-1 text-xs text-paper/45">{tr(o.hours, locale)}</p>
                    </div>
                  ))}
                </div>
                <a href={`mailto:${site.email}`} className="display-tight link-underline self-start text-xl">
                  {site.email}
                </a>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
