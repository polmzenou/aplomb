"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "next-intl";
import { timeline } from "@/data/content";
import { tr } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Horizontal timeline pinned and scrubbed on desktop; a vertical list on small screens. */
export function Timeline({ title }: { title: string }) {
  const locale = useLocale();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current;
      if (!el || !section.current) return;
      const distance = () => el.scrollWidth - el.clientWidth;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      tl.to(el, { x: () => -distance(), ease: "none" }, 0).fromTo(line.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      return () => tl.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="overflow-hidden bg-paper-2 py-20 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="container-x mb-12 flex items-center gap-6">
        <h2 className="display text-[clamp(2rem,4vw,3.6rem)]">{title}</h2>
        <span className="relative h-px flex-1 bg-line">
          <span ref={line} className="absolute inset-0 origin-left bg-terra" />
        </span>
      </div>
      <ol ref={track} className="container-x flex flex-col gap-10 lg:flex-row lg:gap-0">
        {timeline.map((item) => (
          <li key={item.year} className="relative border-l border-ink pl-6 lg:w-[34vw] lg:shrink-0 lg:pr-12">
            <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 bg-terra" />
            <p className="display text-[clamp(3.6rem,7vw,7rem)] leading-none text-ink/90">{item.year}</p>
            <h3 className="mt-6 text-xl font-semibold">{tr(item.title, locale)}</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-graphite">{tr(item.text, locale)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
