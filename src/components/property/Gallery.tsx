"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ImageKey } from "@/lib/images";
import { img } from "@/lib/images";
import { cn, pad } from "@/lib/utils";
import { Expand } from "@/components/ui/Icons";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";

/** Editorial mosaic; any image opens the full-screen lightbox. */
export function Gallery({ images, title }: { images: ImageKey[]; title: string }) {
  const t = useTranslations("property");
  const c = useTranslations("common");
  const [index, setIndex] = useState<number | null>(null);
  const items = images.map((k, i) => ({ src: img(k, 2000), alt: t("photoAlt", { title, n: i + 1 }) }));
  const layout = ["md:col-span-8 md:row-span-2 aspect-[4/3] md:aspect-auto", "md:col-span-4 aspect-[4/3]", "md:col-span-4 aspect-[4/3]", "md:col-span-5 aspect-[4/3]", "md:col-span-7 aspect-[16/10]", "md:col-span-12 aspect-[21/9]"];

  return (
    <>
      <div className="grid gap-3 md:grid-cols-12">
        {images.slice(0, 6).map((k, i) => (
          <Reveal key={k + i} delay={(i % 3) * 0.08} className={cn("relative", layout[i] ?? "md:col-span-4 aspect-[4/3]")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group absolute inset-0 overflow-hidden bg-paper-3"
              aria-label={items[i].alt}
              data-cursor-label={c("view")}
            >
              <Image src={img(k, 1400)} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-arch)] group-hover:scale-105" />
              <span className="mono absolute left-3 top-3 bg-paper/90 px-1.5 py-0.5 text-[0.6rem]">{pad(i + 1)}</span>
              <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-paper text-ink opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <button type="button" onClick={() => setIndex(0)} className="mono mt-6 text-[0.68rem] uppercase tracking-[0.14em] underline underline-offset-4 hover:text-terra">
        {t("viewPhotos", { count: images.length })}
      </button>
      <Lightbox images={items} index={index} onChange={setIndex} labels={{ close: c("close"), prev: c("prev"), next: c("next") }} />
    </>
  );
}
