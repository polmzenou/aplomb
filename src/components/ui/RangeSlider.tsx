"use client";

import { cn } from "@/lib/utils";

type DualProps = {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  labels: [string, string];
  className?: string;
};

/** Two-thumb range built from two native inputs, so it stays keyboard- and screen-reader-friendly. */
export function DualRange({ min, max, step, value, onChange, labels, className }: DualProps) {
  const [lo, hi] = value;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className={cn("range relative h-6", className)}>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
      <div className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-ink" style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={lo}
        aria-label={labels[0]}
        onChange={(e) => onChange([Math.min(Number(e.target.value), hi - step), hi])}
        className="range-input"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={hi}
        aria-label={labels[1]}
        onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + step)])}
        className="range-input"
      />
    </div>
  );
}

type SingleProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
  className?: string;
};

export function Range({ min, max, step, value, onChange, label, className }: SingleProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={cn("range relative h-6", className)}>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
      <div className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-terra" style={{ width: `${pct}%` }} />
      <input type="range" min={min} max={max} step={step} value={value} aria-label={label} onChange={(e) => onChange(Number(e.target.value))} className="range-input" />
    </div>
  );
}
