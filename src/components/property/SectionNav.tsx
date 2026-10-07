"use client";

import { useEffect, useState } from "react";
import { cn, pad } from "@/lib/utils";
import { useLenis } from "@/components/layout/SmoothScroll";

/** Sticky in-page navigation highlighting the section in view. */
export function SectionNav({ items, cta }: { items: { id: string; label: string }[]; cta?: { id: string; label: string } }) {
  const [active, setActive] = useState(items[0]?.id);
  const lenis = useLenis();

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-ink bg-paper/95 backdrop-blur-md" aria-label="Sections">
      <div className="container-x flex items-center justify-between gap-6">
        <ul className="no-scrollbar -mx-2 flex overflow-x-auto">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative flex items-baseline gap-1.5 whitespace-nowrap px-3 py-4 text-sm transition-colors",
                  active === item.id ? "text-ink" : "text-mute hover:text-ink",
                )}
              >
                <span className="mono text-[0.58rem] text-terra">{pad(i + 1)}</span>
                {item.label}
                <span className={cn("absolute inset-x-3 bottom-0 h-0.5 origin-left bg-terra transition-transform duration-500", active === item.id ? "scale-x-100" : "scale-x-0")} />
              </a>
            </li>
          ))}
        </ul>
        {cta && (
          <a href={`#${cta.id}`} onClick={(e) => go(e, cta.id)} className="mono hidden shrink-0 bg-ink px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-terra md:block">
            {cta.label}
          </a>
        )}
      </div>
    </nav>
  );
}
