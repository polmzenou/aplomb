"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { img } from "@/lib/images";
import { cn, pad } from "@/lib/utils";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { LevelLabels } from "@/components/three/LevelLabels";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { ButtonLink } from "@/components/ui/Button";
import { Blueprint, Cube, Moon, Sun } from "@/components/ui/Icons";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

function Toggle({ active, onClick, children, dark }: { active: boolean; onClick: () => void; children: React.ReactNode; dark: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "mono flex items-center gap-2 px-3 py-2 text-[0.64rem] uppercase tracking-[0.14em] transition-colors",
        active ? (dark ? "bg-paper text-ink" : "bg-ink text-paper") : dark ? "text-paper/70 hover:text-paper" : "text-ink/60 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function Hero() {
  const t = useTranslations("home.hero");
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const night = useRef(0);
  const nightTarget = useRef(0);
  const labelRefs = useRef<(HTMLElement | null)[]>([]);
  const [isNight, setIsNight] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [explodePct, setExplodePct] = useState(0);
  const { setDark } = useHeaderTheme();
  const dark = isNight || blueprint;

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
    setExplodePct(Math.round(Math.min(1, Math.max(0, (v - 0.06) / 0.55)) * 100));
  });
  const textY = useTransform(scrollYProgress, [0, 0.35], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  useEffect(() => {
    nightTarget.current = isNight ? 1 : 0;
  }, [isNight]);

  useEffect(() => {
    setDark(dark);
    return () => setDark(false);
  }, [dark, setDark]);

  const levels = t.raw("levels") as string[];

  return (
    <section ref={section} className="relative h-[230vh] md:h-[280vh]" aria-label={t("eyebrow")}>
      <div
        className={cn(
          "sticky top-0 h-svh overflow-hidden transition-colors duration-1000",
          blueprint ? "blueprint-paper text-paper" : isNight ? "bg-[#14161b] text-paper" : "drafting-grid bg-paper text-ink",
        )}
      >
        {/* night sky gradient */}
        <div className={cn("pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,#2a3550_0%,transparent_65%)] transition-opacity duration-1000", isNight && !blueprint ? "opacity-100" : "opacity-0")} />

        <SceneCanvas
          className="absolute inset-0"
          label={t("sceneLabel")}
          shadows
          camera={{ position: [30, 22, 34], fov: 30, near: 1, far: 200 }}
          fallback={<Image src={img("villaPoolTerrace", 1800)} alt="" fill priority sizes="100vw" className="object-cover" />}
        >
          <HeroScene progress={progress} night={night} nightTarget={nightTarget} blueprint={blueprint} labels={labelRefs} />
        </SceneCanvas>
        <LevelLabels labels={levels} refs={labelRefs} />

        {/* headline */}
        <motion.div className="pointer-events-none relative z-10 flex h-full flex-col justify-between pb-24 pt-[calc(var(--header-h)+1.5rem)] sm:pb-28" style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <div className="container-x">
            <motion.p className="eyebrow mb-6 text-current opacity-70" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.3, duration: 1 }}>
              {t("eyebrow")}
            </motion.p>
            <h1 className="display text-[clamp(3.4rem,13vw,13rem)] leading-[0.85]">
              <span className="block overflow-hidden">
                <motion.span className="block" initial={reduce ? false : { y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease }}>
                  {t("title")}
                </motion.span>
              </span>{" "}
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={cn("accent block text-[1.08em] leading-[0.9]", dark ? "text-terra-soft" : "text-terra")}
                  initial={reduce ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.35, ease }}
                >
                  {t("accent")}
                </motion.span>
              </span>
            </h1>
          </div>
          <div className="container-x grid items-end gap-6 md:grid-cols-12">
            <motion.div className="pointer-events-auto md:col-span-5 lg:col-span-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease }}>
              <p className={cn("mb-6 hidden max-w-sm text-[0.98rem] leading-relaxed sm:block", dark ? "text-paper/75" : "text-graphite")}>{t("intro")}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/biens" variant={dark ? "light" : "ink"}>
                  {t("cta")}
                </ButtonLink>
                <ButtonLink href="/vendre" variant="ghost" className={dark ? "text-paper" : ""}>
                  {t("cta2")}
                </ButtonLink>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* scene controls + title block */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="container-x flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-3">
              <div className={cn("flex border backdrop-blur-sm", dark ? "border-paper/30 bg-ink/30" : "border-ink/20 bg-paper/60")} role="group" aria-label={`${t("day")} / ${t("night")}`}>
                <Toggle active={!isNight} onClick={() => setIsNight(false)} dark={dark}>
                  <Sun className="h-3.5 w-3.5" /> {t("day")}
                </Toggle>
                <Toggle active={isNight} onClick={() => setIsNight(true)} dark={dark}>
                  <Moon className="h-3.5 w-3.5" /> {t("night")}
                </Toggle>
                <span className={cn("w-px", dark ? "bg-paper/30" : "bg-ink/20")} />
                <Toggle active={!blueprint} onClick={() => setBlueprint(false)} dark={dark}>
                  <Cube className="h-3.5 w-3.5" /> {t("model")}
                </Toggle>
                <Toggle active={blueprint} onClick={() => setBlueprint(true)} dark={dark}>
                  <Blueprint className="h-3.5 w-3.5" /> {t("blueprint")}
                </Toggle>
              </div>
              <p className="mono hidden items-center gap-3 text-[0.62rem] uppercase tracking-[0.14em] opacity-60 sm:flex">
                <span className="relative block h-6 w-px overflow-hidden bg-current/30">
                  <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-current" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
                </span>
                {t("scroll")}
              </p>
            </div>
            <dl
              className={cn(
                "mono hidden grid-cols-[auto_auto] gap-x-6 gap-y-1 border p-3 text-[0.6rem] uppercase tracking-[0.12em] backdrop-blur-sm md:grid",
                dark ? "border-paper/30 bg-ink/30" : "border-ink/25 bg-paper/60",
              )}
            >
              <dt className="opacity-50">{t("sheet.project")}</dt>
              <dd>{t("sheet.projectValue")}</dd>
              <dt className="opacity-50">{t("sheet.scale")}</dt>
              <dd>1:200</dd>
              <dt className="opacity-50">{t("sheet.levels")}</dt>
              <dd>{pad(levels.length)}</dd>
              <dt className="opacity-50">{t("sheet.exploded")}</dt>
              <dd className="tabular-nums">{String(explodePct).padStart(3, "0")}%</dd>
              <dt className="opacity-50">{t("sheet.sheet")}</dt>
              <dd>01 / 01</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
