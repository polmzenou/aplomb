import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DrawLine, RevealText } from "./Reveal";

/** Section header styled like a drawing title block: index, label, rule, title. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  intro,
  className,
  align = "left",
  as = "h2",
  dark = false,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  dark?: boolean;
}) {
  return (
    <header className={cn(align === "center" && "mx-auto text-center", className)}>
      <div className={cn("mb-6 flex items-center gap-4", align === "center" && "justify-center")}>
        {index && <span className={cn("mono text-[0.68rem]", dark ? "text-terra-soft" : "text-terra")}>{index}</span>}
        <span className={cn("eyebrow", dark && "text-paper/60")}>{eyebrow}</span>
        {align === "left" && <DrawLine className={cn("max-w-40 flex-1", dark ? "text-paper/25" : "text-line")} />}
      </div>
      <RevealText as={as} text={title} className={cn("display text-[clamp(2.2rem,5.6vw,5.2rem)]", dark && "text-paper")} />
      {accent && (
        <p className={cn("accent mt-2 text-[clamp(1.6rem,3.4vw,3rem)] leading-none", dark ? "text-terra-soft" : "text-terra")}>{accent}</p>
      )}
      {intro && (
        <div className={cn("mt-8 max-w-xl text-[1.02rem] leading-relaxed", dark ? "text-paper/70" : "text-graphite", align === "center" && "mx-auto")}>
          {intro}
        </div>
      )}
    </header>
  );
}
