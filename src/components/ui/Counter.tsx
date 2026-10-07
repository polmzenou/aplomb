"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export function Counter({ value, locale, className, suffix = "" }: { value: number; locale: string; className?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const fmt = (n: number) => new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR").format(Math.round(n));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip the animation for reduced motion
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: setDisplay });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {fmt(display)}
      {suffix}
    </span>
  );
}
