import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { articles, getArticle, team } from "@/data/content";
import { routing } from "@/i18n/routing";
import { img, portrait } from "@/lib/images";
import { localizedUrl, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { formatDate, tr } from "@/lib/utils";
import Image from "next/image";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ReadingProgress } from "@/components/sections/ReadingProgress";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    locale,
    href: { pathname: "/journal/[slug]", params: { slug } },
    title: tr(a.title, locale),
    description: tr(a.excerpt, locale),
    image: img(a.cover, 1200),
  });
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const a = getArticle(slug);
  if (!a) notFound();
  const t = await getTranslations("journal");
  const n = await getTranslations("nav");
  const c = await getTranslations("common");
  const author = team.find((m) => m.name === a.author);
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tr(a.title, locale),
    description: tr(a.excerpt, locale),
    image: img(a.cover, 1600),
    datePublished: a.date,
    author: { "@type": "Person", name: a.author },
    publisher: { "@type": "Organization", name: site.fullName },
    mainEntityOfPage: `${site.url}${localizedUrl({ pathname: "/journal/[slug]", params: { slug } }, locale)}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress label={t("progress")} />
      <header className="container-x pb-12 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <Breadcrumbs items={[{ label: n("home"), href: "/" }, { label: n("journal"), href: "/journal" }, { label: tr(a.title, locale) }]} className="mb-12" />
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-6 text-terra">
            {tr(a.category, locale)} · {c("minutesRead", { count: a.readingTime })}
          </p>
          <h1 className="display text-[clamp(2.4rem,6vw,5.6rem)]">{tr(a.title, locale)}</h1>
          <p className="accent mx-auto mt-6 max-w-2xl text-[clamp(1.3rem,2.2vw,1.9rem)] leading-snug text-graphite">{tr(a.excerpt, locale)}</p>
          <div className="mt-10 flex items-center justify-center gap-4">
            {author && (
              <span className="relative h-11 w-11 overflow-hidden rounded-full">
                <Image src={portrait(author.portrait, 120)} alt="" fill sizes="44px" className="object-cover grayscale" />
              </span>
            )}
            <div className="text-left">
              <p className="text-sm font-semibold">{a.author}</p>
              <p className="mono text-[0.64rem] uppercase tracking-[0.12em] text-mute">{t("published", { date: formatDate(a.date, locale) })}</p>
            </div>
          </div>
        </div>
      </header>

      <ParallaxImage src={img(a.cover, 2200)} alt="" className="mx-[var(--gutter)] h-[50vh] md:h-[75vh]" priority sizes="100vw" />

      <div className="container-x py-16 md:py-24">
        <div className="prose-arch mx-auto max-w-2xl text-[1.1rem]">
          {a.body.map((block, i) =>
            block.quote ? (
              <Reveal key={i}>
                <blockquote className="accent my-14 border-y border-ink py-10 text-center text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight text-terra">{tr(block.text, locale)}</blockquote>
              </Reveal>
            ) : (
              <Reveal key={i}>
                {block.heading && <h2 className="display-tight text-[1.8rem]">{tr(block.heading, locale)}</h2>}
                <p className={i === 0 ? "text-[1.3rem] !text-ink" : undefined}>{tr(block.text, locale)}</p>
              </Reveal>
            ),
          )}
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl justify-between border-t border-ink pt-6">
          <ButtonLink href="/journal" variant="ghost">
            {t("back")}
          </ButtonLink>
        </div>
      </div>

      <section className="border-t border-line bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <h2 className="display mb-12 text-[clamp(1.8rem,3.4vw,3rem)]">{t("related")}</h2>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} article={r} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
