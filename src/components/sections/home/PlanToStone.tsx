"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { plans } from "@/data/plans";
import { img } from "@/lib/images";
import { FloorPlan } from "@/components/property/FloorPlan";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Before/after slider: redrawn blueprint on one side, photograph on the other. */
export function PlanToStone() {
  const t = useTranslations("home.planToStone");
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="container-x grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-4">
        <SectionHeading index="05" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} intro={t("text")} />
      </div>
      <div className="lg:col-span-8">
        <div
          ref={box}
          className="relative aspect-[4/3] select-none overflow-hidden md:aspect-[16/10]"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            update(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && update(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          style={{ touchAction: "pan-y" }}
          data-cursor-label={t("accent").split(" ")[0]}
        >
          <Image src={img("villaPoolWhite", 1600)} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
          <span className="mono absolute bottom-4 right-4 bg-paper px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em]">{t("after")}</span>

          <div className="blueprint-paper absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={img("villaPoolWhite", 1600)} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover opacity-[0.12] mix-blend-luminosity" />
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
              <FloorPlan plan={plans.villa} theme="blueprint" className="w-full max-w-2xl" />
            </div>
            <span className="mono absolute bottom-4 left-4 bg-paper px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-ink">{t("before")}</span>
          </div>

          <div className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${pos}%` }}>
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-paper bg-ink text-paper">
              <svg viewBox="0 0 24 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M7 1L2 6l5 5M17 1l5 5-5 5M2 6h20" />
              </svg>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={t("handle")}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
