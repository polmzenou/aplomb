"use client";

import { useTranslations } from "next-intl";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";
import { Bookmark, Compare } from "@/components/ui/Icons";
import { useToast } from "@/components/ui/Toast";
import { useCompare } from "./CompareProvider";

export function FavoriteButton({ slug, title, className, withLabel = false }: { slug: string; title: string; className?: string; withLabel?: boolean }) {
  const t = useTranslations("common");
  const { has, toggle } = useFavorites();
  const toast = useToast();
  const active = has(slug);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? t("removeSelection") : t("addSelection")}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        toast(active ? t("removedSelection", { title }) : t("addedSelection", { title }));
      }}
      className={cn("group/fav inline-flex items-center gap-3 transition-colors", className)}
      data-cursor="hover"
    >
      <Bookmark filled={active} className={cn("h-4 w-3.5 transition-transform group-hover/fav:-translate-y-0.5", active && "text-terra")} />
      {withLabel && <span className="mono text-[0.68rem] uppercase tracking-[0.14em]">{active ? t("removeSelection") : t("addSelection")}</span>}
    </button>
  );
}

export function CompareButton({ slug, className, withLabel = false }: { slug: string; className?: string; withLabel?: boolean }) {
  const t = useTranslations("common");
  const { has, toggle } = useCompare();
  const active = has(slug);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? t("removeCompare") : t("addCompare")}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={cn("inline-flex items-center gap-3 transition-colors", active && "text-terra", className)}
      data-cursor="hover"
    >
      <Compare className="h-3.5 w-4" />
      {withLabel && <span className="mono text-[0.68rem] uppercase tracking-[0.14em]">{active ? t("removeCompare") : t("addCompare")}</span>}
    </button>
  );
}
