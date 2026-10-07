"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ErrorMode } from "@/components/three/ErrorScene";
import { SceneCanvas } from "@/components/three/SceneCanvas";

const ErrorScene = dynamic(() => import("@/components/three/ErrorScene").then((m) => m.ErrorScene), { ssr: false });

type Props = {
  code: string;
  eyebrow: string;
  title: string;
  accent: string;
  text: string;
  mode: ErrorMode;
  actions: ReactNode;
  children?: ReactNode;
};

/** Full-height error layout: oversized code, a 3D scene and recovery links. */
export function ErrorView({ code, eyebrow, title, accent, text, mode, actions, children }: Props) {
  const reduce = useReducedMotion();
  return (
    <section className="drafting-grid relative flex min-h-svh items-center overflow-hidden pb-16 pt-[calc(var(--header-h)+2rem)]">
      <span aria-hidden="true" className="display pointer-events-none absolute -bottom-[4vw] right-0 select-none text-[34vw] leading-none text-ink/[0.045]">
        {code}
      </span>
      <div className="container-x relative grid w-full items-center gap-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6">
          <motion.p className="eyebrow mb-8 text-terra" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            {eyebrow}
          </motion.p>
          <motion.h1
            className="display text-[clamp(2.8rem,7vw,6.6rem)]"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
            <span className="accent mt-2 block text-[0.82em] leading-none text-terra">{accent}</span>
          </motion.h1>
          <motion.p className="mt-8 max-w-md text-lg leading-relaxed text-graphite" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            {text}
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap items-center gap-6" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }}>
            {actions}
          </motion.div>
          {children}
        </div>
        <div className="relative h-[42vh] lg:col-span-6 lg:h-[70vh]">
          <SceneCanvas className="absolute inset-0" label={`${eyebrow}. ${title} ${accent}`} shadows camera={{ position: [0, 2, 22], fov: 35 }} fallback={null}>
            <ErrorScene mode={mode} />
          </SceneCanvas>
          <span className="mono absolute bottom-0 left-0 text-[0.62rem] uppercase tracking-[0.14em] text-mute">ERR · {code} · 1:200</span>
        </div>
      </div>
    </section>
  );
}
