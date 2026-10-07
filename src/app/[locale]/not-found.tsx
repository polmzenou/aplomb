import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/lib/nav";
import { ErrorView } from "@/components/sections/ErrorView";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("errors.notFound");
  const c = await getTranslations("common");
  const n = await getTranslations("nav");
  return (
    <ErrorView
      code={t("code")}
      eyebrow={t("eyebrow")}
      title={t("title")}
      accent={t("accent")}
      text={t("text")}
      mode="scattered"
      actions={
        <>
          <ButtonLink href="/biens">{t("cta")}</ButtonLink>
          <ButtonLink href="/" variant="ghost">
            {c("backHome")}
          </ButtonLink>
        </>
      }
    >
      <div className="mt-14 border-t border-line pt-6">
        <p className="eyebrow mb-4">{t("suggestions")}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {mainNav.map((item) => (
            <li key={item.key}>
              <Link href={item.href} className="link-underline">
                {n(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ErrorView>
  );
}
