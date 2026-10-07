"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Close } from "./Icons";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
  side?: "center" | "right";
};

const FOCUSABLE = 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Accessible dialog: focus trap, Escape to close, focus restored on close. */
export function Modal({ open, onClose, title, children, className, closeLabel = "Fermer", side = "center" }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("input, button:not([data-close])")?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      prev?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn("fixed inset-0 z-[95] flex p-3 sm:p-4", side === "right" ? "justify-end" : "items-end justify-center sm:items-center")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
        >
          <button type="button" tabIndex={-1} aria-label={closeLabel} className="absolute inset-0 bg-ink/55 backdrop-blur-[3px]" onClick={onClose} />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={side === "right" ? { x: "100%" } : { y: 40, opacity: 0 }}
            animate={side === "right" ? { x: 0 } : { y: 0, opacity: 1 }}
            exit={side === "right" ? { x: "100%" } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative w-full overflow-y-auto bg-paper p-7 shadow-2xl md:p-10",
              side === "right" ? "h-full max-w-xl" : "max-h-[90vh] max-w-xl",
              className,
            )}
          >
            <button
              type="button"
              data-close
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <Close className="h-3.5 w-3.5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
