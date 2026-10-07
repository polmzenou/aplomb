import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DrawLine, Reveal, RevealText } from "@/components/ui/Reveal";
import type { Href } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  crumbs: { label: string; href?: Href; url?: string }[];
  aside?: ReactNode;
  className?: string;
};

/** Inner-page title block: breadcrumbs, drafting rule, oversized title. */
export function PageHeader({ eyebrow, title, accent, intro, crumbs, aside, className }: Props) {
  return (
    <header className={cn("drafting-grid relative pb-14 pt-[calc(var(--header-h)+3rem)] md:pb-20 md:pt-[calc(var(--header-h)+5rem)]", className)}>
      <div className="container-x">
        <Breadcrumbs items={crumbs} className="mb-12" />
        <div className="mb-8 flex items-center gap-4">
          <span className="eyebrow">{eyebrow}</span>
          <DrawLine className="max-w-xs flex-1 text-ink" />
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
            <RevealText as="h1" text={title} immediate className="display text-[clamp(2.8rem,8.4vw,8.4rem)]" />
            {accent && (
              <Reveal delay={0.3}>
                <p className="accent mt-2 text-[clamp(1.8rem,4.2vw,4rem)] leading-none text-terra">{accent}</p>
              </Reveal>
            )}
            {intro && (
              <Reveal delay={0.45}>
                <div className="mt-10 max-w-2xl text-lg leading-relaxed text-graphite">{intro}</div>
              </Reveal>
            )}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
