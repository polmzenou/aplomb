import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Label + control + error message, wired for screen readers. */
export function Field({
  id,
  label,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="eyebrow block">
        {label}
        {required && <span className="ml-1 text-terra">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mono mt-1.5 text-[0.66rem] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function fieldProps(id: string, error?: string) {
  return {
    id,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: "field",
  };
}
