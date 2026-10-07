"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

export function Reveal({ children, delay = 0, y = 32, className, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Splits a heading into words that slide up from a mask. */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.05,
  immediate = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={cn(className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "105%" }}
            {...(immediate ? { animate: { y: "0%" } } : { whileInView: { y: "0%" } })}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 1, delay: delay + i * stagger, ease }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** A horizontal rule that draws itself from left to right. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-px origin-left bg-current", className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease }}
    />
  );
}
