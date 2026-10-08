"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { featuredProperties } from "@/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

/** Featured listings: pinned and scrolled horizontally on desktop, native swipe on touch. */
export function FeaturedRail() {
  const t = useTranslations("home.featured");
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  // Layout effect so GSAP reverts its pin-spacer before React detaches the DOM on navigation.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current;
      const container = wrap.current;
      if (!el || !container) return;
      const distance = () => el.scrollWidth - window.innerWidth + 48;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`),
        },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    // GSAP wraps the pinned section in a pin-spacer: keep it inside a node React owns.
    <div>
      <section ref={wrap} className="relative overflow-hidden bg-paper-2 py-20 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
        <div className="container-x mb-12 flex flex-col justify-between gap-8 lg:mb-10 lg:flex-row lg:items-end">
          <SectionHeading index="02" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} />
          <div className="flex max-w-sm flex-col gap-6">
            <p className="text-graphite">{t("intro")}</p>
            <ButtonLink href="/biens" variant="outline" className="self-start">
              {t("cta")}
            </ButtonLink>
          </div>
        </div>
        <div ref={track} className="no-scrollbar flex gap-6 overflow-x-auto px-[var(--gutter)] pb-4 lg:overflow-visible lg:pb-0 lg:will-change-transform">
          {featuredProperties.map((p, i) => (
            <PropertyCard key={p.slug} property={p} index={i} layout="rail" />
          ))}
        </div>
        <div className="container-x mt-8 hidden items-center gap-4 lg:flex">
          <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-mute">{t("drag")}</span>
          <span className="relative h-px flex-1 bg-line">
            <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-ink" />
          </span>
          <span className="mono text-[0.62rem] text-mute">{String(featuredProperties.length).padStart(2, "0")}</span>
        </div>
      </section>
    </div>
  );
}
