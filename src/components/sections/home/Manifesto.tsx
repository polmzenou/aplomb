"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useTranslations } from "next-intl";
import { PlumbMark } from "@/components/ui/Logo";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/** Statement whose words ink in one by one as it scrolls through the viewport. */
export function Manifesto() {
  const t = useTranslations("home.manifesto");
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = t("text").split(" ");

  return (
    <section className="container-x grid gap-10 py-28 md:grid-cols-12 md:py-40">
      <div className="md:col-span-3">
        <p className="eyebrow flex items-center gap-3">
          <PlumbMark className="h-5 w-3" animated />
          {t("eyebrow")}
        </p>
      </div>
      <div className="md:col-span-9">
        <p ref={ref} className="display-tight text-[clamp(1.7rem,3.6vw,3.4rem)] leading-[1.12]" aria-label={t("text")}>
          <span aria-hidden="true">
            {reduce
              ? t("text")
              : words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
          </span>
        </p>
        <p className="accent mt-10 text-2xl text-terra">— {t("signature")}</p>
      </div>
    </section>
  );
}
