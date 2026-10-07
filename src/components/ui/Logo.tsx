import { cn } from "@/lib/utils";

/** Plumb bob mark: a hanging line with a faceted weight. */
export function PlumbMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 20 32" className={cn("shrink-0", className)} aria-hidden="true">
      <g className={cn("origin-[10px_0px]", animated && "animate-plumb")}>
        <path d="M10 0v13" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 14h12l-6 17z" fill="currentColor" />
        <path d="M10 14v17" stroke="var(--color-terra)" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

export function Logo({ className, withTagline = false, animated = false }: { className?: string; withTagline?: boolean; animated?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <PlumbMark className="h-7 w-[18px]" animated={animated} />
      <span className="flex flex-col leading-none">
        <span className="text-[1.35rem] font-semibold tracking-[-0.02em] [font-variation-settings:'wdth'_125]">APLOMB</span>
        {withTagline && <span className="mono mt-1 text-[0.5rem] uppercase tracking-[0.3em] opacity-70">Immobilier d&apos;architecture</span>}
      </span>
    </span>
  );
}
