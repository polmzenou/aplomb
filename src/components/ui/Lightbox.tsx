"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { pad } from "@/lib/utils";
import { Chevron, Close } from "./Icons";

type Props = {
  images: { src: string; alt: string }[];
  index: number | null;
  onChange: (index: number | null) => void;
  labels: { close: string; prev: string; next: string };
};

/** Full-screen gallery with keyboard (← → Esc) and swipe navigation. */
export function Lightbox({ images, index, onChange, labels }: Props) {
  const open = index !== null;
  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, go, onChange]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={images[index].alt}
          className="fixed inset-0 z-[96] flex flex-col bg-ink text-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="mono text-xs tracking-widest">
              {pad(index + 1)} / {pad(images.length)}
            </span>
            <button type="button" onClick={() => onChange(null)} aria-label={labels.close} className="flex h-11 w-11 items-center justify-center border border-paper/30 transition-colors hover:bg-paper hover:text-ink" autoFocus>
              <Close className="h-4 w-4" />
            </button>
          </div>
          <div className="relative flex-1">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={index}
                className="absolute inset-0 mx-4 md:mx-24"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  if (info.offset.x > 80) go(-1);
                }}
              >
                <Image src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-paper/30 bg-ink/40 transition-colors hover:bg-paper hover:text-ink">
              <Chevron className="h-4 w-3 rotate-180" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={labels.next} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-paper/30 bg-ink/40 transition-colors hover:bg-paper hover:text-ink">
              <Chevron className="h-4 w-3" />
            </button>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4">
            {images.map((im, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange(i)}
                aria-label={`${i + 1}`}
                aria-current={i === index}
                className={`relative h-14 w-20 shrink-0 overflow-hidden transition-opacity ${i === index ? "opacity-100 outline outline-1 outline-offset-2 outline-terra" : "opacity-40 hover:opacity-80"}`}
              >
                <Image src={im.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
