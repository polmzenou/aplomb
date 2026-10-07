"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  priority?: boolean;
  sizes?: string;
  overlay?: "none" | "bottom" | "full";
  reveal?: boolean;
};

/** Image that drifts against the scroll, optionally uncovered by a wipe on first view. */
export function ParallaxImage({ src, alt, className, strength = 10, priority, sizes = "100vw", overlay = "none", reveal = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-paper-3", className)}>
      <motion.div className="absolute inset-x-0 -inset-y-[14%]" style={reduce ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
      {overlay === "bottom" && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />}
      {overlay === "full" && <div className="pointer-events-none absolute inset-0 bg-ink/35" />}
      {reveal && !reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 origin-right bg-paper"
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.3, ease: [0.7, 0, 0.2, 1] }}
        />
      )}
    </div>
  );
}
