import { Link } from "@/i18n/navigation";
import type { Href } from "@/lib/metadata";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: Href; url?: string };

/** Visible trail plus BreadcrumbList structured data. */
export function Breadcrumbs({ items, className, dark = false }: { items: Crumb[]; className?: string; dark?: boolean }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.url ? { item: `${site.url}${item.url}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={cn("mono text-[0.66rem] uppercase tracking-[0.14em]", dark ? "text-paper/60" : "text-mute", className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className={cn("link-underline", dark ? "hover:text-paper" : "hover:text-ink")}>
                {item.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined} className={dark ? "text-paper" : "text-ink"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
