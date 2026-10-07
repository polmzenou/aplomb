"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Icons";

type Variant = "ink" | "terra" | "outline" | "light" | "ghost";

const base =
  "group relative isolate inline-flex items-center justify-center gap-4 overflow-hidden px-7 py-4 mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-500 ease-[var(--ease-arch)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, { cls: string; fill: string }> = {
  ink: { cls: "bg-ink text-paper", fill: "bg-terra" },
  terra: { cls: "bg-terra text-paper", fill: "bg-ink" },
  outline: { cls: "border border-ink text-ink hover:text-paper", fill: "bg-ink" },
  light: { cls: "border border-paper/60 text-paper hover:text-ink", fill: "bg-paper" },
  ghost: { cls: "px-0 py-2 text-ink", fill: "" },
};

function Inner({ children, variant, arrow }: { children: ReactNode; variant: Variant; arrow: boolean }) {
  if (variant === "ghost") {
    return (
      <span className="relative inline-flex items-center gap-3">
        <span className="relative">
          {children}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-700 ease-[var(--ease-arch)] group-hover:origin-left group-hover:scale-x-100" />
        </span>
        {arrow && <ArrowRight className="h-2.5 w-5 transition-transform duration-500 group-hover:translate-x-1" />}
      </span>
    );
  }
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-arch)] group-hover:scale-x-100",
          variants[variant].fill,
        )}
      />
      <span className="relative inline-flex items-center gap-4">
        {children}
        {arrow && <ArrowRight className="h-2.5 w-5 transition-transform duration-500 group-hover:translate-x-1" />}
      </span>
    </>
  );
}

/** Subtle magnetic pull toward the cursor. */
export function Magnetic({ children, className, strength = 0.25 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength * 1.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

type LinkProps = ComponentProps<typeof Link>;

export function ButtonLink({
  variant = "ink",
  arrow = true,
  className,
  children,
  ...rest
}: LinkProps & { variant?: Variant; arrow?: boolean }) {
  return (
    <Magnetic>
      <Link className={cn(base, variants[variant].cls, className)} data-cursor="hover" {...rest}>
        <Inner variant={variant} arrow={arrow}>
          {children}
        </Inner>
      </Link>
    </Magnetic>
  );
}

export function Button({
  variant = "ink",
  arrow = false,
  className,
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <Magnetic>
      <button className={cn(base, variants[variant].cls, className)} data-cursor="hover" {...rest}>
        <Inner variant={variant} arrow={arrow}>
          {children}
        </Inner>
      </button>
    </Magnetic>
  );
}
