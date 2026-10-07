"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Property } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { img } from "@/lib/images";
import { cn, formatNumber, formatPriceShort, tr } from "@/lib/utils";
import { CompareButton, FavoriteButton } from "./PropertyActions";

export function StatusBadge({ status, className }: { status: Property["status"]; className?: string }) {
  const t = useTranslations("common.status");
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-1.5 px-2 py-1 text-[0.6rem] uppercase tracking-[0.14em]",
        status === "exclusive" && "bg-terra text-paper",
        status === "available" && "bg-paper text-ink",
        status === "underOffer" && "bg-sage text-paper",
        status === "sold" && "bg-ink text-paper",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5", status === "available" ? "bg-success" : "bg-current")} />
      {t(status)}
    </span>
  );
}

type Props = {
  property: Property;
  index?: number;
  layout?: "grid" | "list" | "rail";
  highlighted?: boolean;
  onHover?: (slug: string | null) => void;
  priority?: boolean;
};

export function PropertyCard({ property: p, index, layout = "grid", highlighted, onHover, priority }: Props) {
  const locale = useLocale();
  const t = useTranslations("common");
  const href = { pathname: "/biens/[slug]" as const, params: { slug: p.slug } };

  if (layout === "list") {
    return (
      <article
        onMouseEnter={() => onHover?.(p.slug)}
        onMouseLeave={() => onHover?.(null)}
        className={cn("group relative grid gap-5 border-t border-line py-6 transition-colors sm:grid-cols-[220px_1fr_auto] sm:items-center", highlighted && "bg-paper-2")}
      >
        <Link href={href} className="relative block aspect-[4/3] overflow-hidden" data-cursor-label={t("view")}>
          <Image src={img(p.cover, 600)} alt={p.title} fill sizes="(min-width: 640px) 220px, 100vw" className={cn("object-cover transition-transform duration-1000 group-hover:scale-105", p.status === "sold" && "grayscale")} />
        </Link>
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <StatusBadge status={p.status} className="border border-line" />
            <span className="eyebrow">
              {p.city} · {tr(p.area, locale)}
            </span>
          </div>
          <h3 className="display-tight text-2xl">
            <Link href={href} className="link-underline">
              {p.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite">{tr(p.excerpt, locale)}</p>
          <p className="mono mt-3 text-[0.7rem] text-mute">
            {formatNumber(p.surface, locale)} m² · {t("bedrooms", { count: p.bedrooms })} · {p.year}
          </p>
        </div>
        <div className="flex items-center gap-5 sm:flex-col sm:items-end">
          <p className="mono text-lg">{formatPriceShort(p.price, locale)}</p>
          <div className="flex gap-4">
            <CompareButton slug={p.slug} />
            <FavoriteButton slug={p.slug} title={p.title} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onMouseEnter={() => onHover?.(p.slug)}
      onMouseLeave={() => onHover?.(null)}
      className={cn("group relative", layout === "rail" && "w-[78vw] shrink-0 sm:w-[46vw] lg:w-[34vw]")}
    >
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-paper-3" data-cursor-label={t("view")}>
        <Image
          src={img(p.cover, 1100)}
          alt={p.title}
          fill
          priority={priority}
          sizes={layout === "rail" ? "(min-width: 1024px) 34vw, 78vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className={cn("object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-arch)] group-hover:scale-[1.06]", p.status === "sold" && "grayscale")}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80" />
        {/* drafting corner marks */}
        <span className="pointer-events-none absolute inset-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-paper" />
          <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-paper" />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-paper" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-paper" />
        </span>
        <div className="absolute left-4 top-4 flex gap-2">
          <StatusBadge status={p.status} />
        </div>
        {index !== undefined && <span className="mono absolute right-4 top-4 text-[0.7rem] text-paper">{String(index + 1).padStart(2, "0")}</span>}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-paper">
          <p className="mono text-[0.7rem]">
            {formatNumber(p.surface, locale)} m²
            <span className="mx-2 opacity-50">/</span>
            {t("bedrooms", { count: p.bedrooms })}
          </p>
          <p className="mono text-base">{formatPriceShort(p.price, locale)}</p>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-1.5">
            {p.city} · {tr(p.area, locale)}
          </p>
          <h3 className="display-tight text-[1.6rem] leading-tight">
            <Link href={href}>{p.title}</Link>
          </h3>
          <p className="accent mt-1 text-lg text-graphite">{tr(p.tagline, locale)}</p>
        </div>
        <div className="flex shrink-0 gap-4 pt-1">
          <CompareButton slug={p.slug} />
          <FavoriteButton slug={p.slug} title={p.title} />
        </div>
      </div>
    </article>
  );
}
