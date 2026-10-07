import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Article } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { img } from "@/lib/images";
import { cn, formatDate, tr } from "@/lib/utils";

export function ArticleCard({ article: a, large = false, className }: { article: Article; large?: boolean; className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const href = { pathname: "/journal/[slug]" as const, params: { slug: a.slug } };
  return (
    <article className={cn("group", className)}>
      <Link href={href} className="block" data-cursor-label={t("readMore")}>
        <span className={cn("relative mb-5 block overflow-hidden bg-paper-3", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
          <Image
            src={img(a.cover, large ? 1400 : 800)}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-arch)] group-hover:scale-105"
          />
          <span className="mono absolute left-3 top-3 bg-paper px-2 py-1 text-[0.6rem] uppercase tracking-[0.14em]">{tr(a.category, locale)}</span>
        </span>
        <p className="mono mb-3 text-[0.66rem] uppercase tracking-[0.12em] text-mute">
          {formatDate(a.date, locale)} · {t("minutesRead", { count: a.readingTime })}
        </p>
        <h3 className={cn("display-tight leading-tight transition-colors group-hover:text-terra", large ? "text-[clamp(1.8rem,3vw,2.8rem)]" : "text-2xl")}>{tr(a.title, locale)}</h3>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-graphite">{tr(a.excerpt, locale)}</p>
      </Link>
    </article>
  );
}
