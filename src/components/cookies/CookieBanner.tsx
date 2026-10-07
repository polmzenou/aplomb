"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { useConsent } from "./ConsentProvider";

function Switch({ checked, onChange, disabled, label }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn("relative h-6 w-11 shrink-0 border transition-colors duration-300", checked ? "border-ink bg-ink" : "border-line bg-paper-2", disabled && "opacity-50")}
    >
      <span className={cn("absolute top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-300", checked ? "left-[22px] bg-terra" : "left-[3px] bg-mute")} />
    </button>
  );
}

function Preferences() {
  const t = useTranslations("cookies");
  const c = useTranslations("common");
  const { consent, save, preferencesOpen, closePreferences } = useConsent();
  const toast = useToast();
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  const commit = (a: boolean, m: boolean) => {
    save({ analytics: a, marketing: m });
    toast(t("saved"));
  };

  const rows = [
    { key: "necessary", value: true, set: undefined, locked: true },
    { key: "analytics", value: analytics, set: setAnalytics, locked: false },
    { key: "marketing", value: marketing, set: setMarketing, locked: false },
  ] as const;

  return (
    <Modal open={preferencesOpen} onClose={closePreferences} title={t("modalTitle")} closeLabel={c("close")}>
      <p className="eyebrow mb-4 text-terra">{t("title")}</p>
      <h2 className="display mb-4 pr-10 text-3xl">{t("modalTitle")}</h2>
      <p className="mb-8 text-sm leading-relaxed text-graphite">{t("modalText")}</p>
      <ul className="divide-y divide-line border-y border-ink">
        {rows.map((row) => (
          <li key={row.key} className="flex items-start justify-between gap-6 py-5">
            <div>
              <p className="font-semibold">{t(`categories.${row.key}.title`)}</p>
              <p className="mt-1 text-sm text-graphite">{t(`categories.${row.key}.text`)}</p>
              {row.locked && <p className="mono mt-2 text-[0.62rem] uppercase tracking-[0.14em] text-terra">{t("alwaysOn")}</p>}
            </div>
            <Switch checked={row.value} onChange={row.set} disabled={row.locked} label={t(`categories.${row.key}.title`)} />
          </li>
        ))}
      </ul>
      <div className="mono mt-8 grid gap-2 text-[0.68rem] uppercase tracking-[0.14em] sm:grid-cols-3">
        <button type="button" onClick={() => commit(false, false)} className="border border-ink px-4 py-3.5 transition-colors hover:bg-ink hover:text-paper">
          {t("rejectAll")}
        </button>
        <button type="button" onClick={() => commit(analytics, marketing)} className="border border-ink px-4 py-3.5 transition-colors hover:bg-ink hover:text-paper">
          {t("save")}
        </button>
        <button type="button" onClick={() => commit(true, true)} className="bg-ink px-4 py-3.5 text-paper transition-colors hover:bg-terra">
          {t("acceptAll")}
        </button>
      </div>
    </Modal>
  );
}

export function CookieBanner() {
  const t = useTranslations("cookies");
  const { bannerOpen, save, openPreferences, preferencesOpen, consent } = useConsent();

  return (
    <>
      <AnimatePresence>
        {bannerOpen && !preferencesOpen && (
          <motion.div
            role="region"
            aria-label={t("title")}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-[80] border border-ink bg-paper p-6 shadow-[8px_8px_0_0_var(--color-ink)] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-[26rem]"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="eyebrow text-terra">{t("title")}</p>
              <span className="mono text-[0.6rem] text-mute">RGPD · CNIL</span>
            </div>
            <p className="text-sm leading-relaxed text-graphite">
              {t("text")}{" "}
              <Link href="/politique-cookies" className="text-ink underline underline-offset-4">
                {t("learnMore")}
              </Link>
            </p>
            <div className="mono mt-6 grid grid-cols-2 gap-2 text-[0.66rem] uppercase tracking-[0.14em]">
              <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="border border-ink px-3 py-3 transition-colors hover:bg-paper-2">
                {t("rejectAll")}
              </button>
              <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="bg-ink px-3 py-3 text-paper transition-colors hover:bg-terra">
                {t("acceptAll")}
              </button>
              <button type="button" onClick={openPreferences} className="col-span-2 py-2 text-ink underline-offset-4 hover:underline">
                {t("customize")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Re-mount on open so toggles reflect the stored choice */}
      {preferencesOpen && <Preferences key={consent?.date ?? "new"} />}
    </>
  );
}
