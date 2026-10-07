"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/** Drafting crosshair cursor with live coordinates. Fine pointers only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability check runs client-side only
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setHover(!!target?.closest("a, button, [data-cursor='hover'], input, select, textarea, label, summary"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300] mix-blend-difference"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2 text-white">
        {label ? (
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mono flex h-20 w-20 items-center justify-center rounded-full bg-white text-[0.62rem] uppercase tracking-[0.14em] text-black"
          >
            {label}
          </motion.span>
        ) : (
          <>
            <span className={cn("absolute left-1/2 top-1/2 h-px -translate-x-1/2 bg-current transition-all duration-300", hover ? "w-12" : "w-6")} />
            <span className={cn("absolute left-1/2 top-1/2 w-px -translate-y-1/2 bg-current transition-all duration-300", hover ? "h-12" : "h-6")} />
            <span className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-current transition-all duration-300", hover ? "h-8 w-8 opacity-100" : "h-2 w-2 opacity-0")} />
            <span className="mono absolute left-4 top-3 whitespace-nowrap text-[0.55rem] tabular-nums opacity-70">
              {String(coords.x).padStart(4, "0")} · {String(coords.y).padStart(4, "0")}
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
}
