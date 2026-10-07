"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn, pad } from "@/lib/utils";

export type AccordionItem = { title: string; content: ReactNode };

export function Accordion({ items, defaultOpen = -1, className, numbered = true }: { items: AccordionItem[]; defaultOpen?: number; className?: string; numbered?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={cn("border-t border-ink", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${id}-h-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-baseline gap-6 py-6 text-left"
                data-cursor="hover"
              >
                {numbered && <span className="mono w-8 shrink-0 text-xs text-terra">{pad(i + 1)}</span>}
                <span className="flex-1 text-lg font-medium leading-snug transition-colors group-hover:text-terra md:text-xl">{item.title}</span>
                <span className="relative h-3 w-3 shrink-0 self-center" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-3 bg-ink" />
                  <span className={cn("absolute left-1/2 top-0 h-3 w-px bg-ink transition-transform duration-500", isOpen && "rotate-90 scale-y-0")} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-p-${i}`}
                  role="region"
                  aria-labelledby={`${id}-h-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn("max-w-3xl pb-7 pr-8 leading-relaxed text-graphite", numbered && "pl-14")}>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
