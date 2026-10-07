"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { PlumbMark } from "@/components/ui/Logo";

const KEY = "aplomb_intro";

/** First-visit intro: an elevation drawing traces itself while a counter runs. */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- shown only after checking session storage
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.7, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setShow(false);
          document.documentElement.style.overflow = "";
        }, 250);
      },
    });
    return () => {
      controls.stop();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="graph-paper fixed inset-0 z-[200] flex flex-col items-center justify-center bg-paper text-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 320 180" className="w-[min(70vw,520px)]" fill="none" stroke="currentColor" strokeWidth="1.2">
            {[
              "M10 160 H310",
              "M40 160 V100 H200 V160",
              "M120 100 V50 H290 V100 H200",
              "M200 100 V160",
              "M60 160 V120 H110 V160",
              "M140 70 H270 V95 H140 Z",
              "M215 110 H285 V160",
              "M290 50 L300 50",
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: [0.7, 0, 0.2, 1] }}
              />
            ))}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} stroke="var(--color-terra)" strokeWidth="0.8">
              <path d="M40 172 H290 M40 168 V176 M290 168 V176" />
              <path d="M302 50 V160 M298 50 H306 M298 160 H306" />
            </motion.g>
          </svg>
          <div className="mt-10 flex w-[min(70vw,520px)] items-center justify-between">
            <span className="flex items-center gap-2">
              <PlumbMark className="h-6 w-4" animated />
              <span className="text-lg font-semibold [font-variation-settings:'wdth'_125]">APLOMB</span>
            </span>
            <span className="mono text-sm tabular-nums">{String(count).padStart(3, "0")}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
