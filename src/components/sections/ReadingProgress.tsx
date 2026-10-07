"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress({ label }: { label: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div role="presentation" aria-label={label} className="fixed inset-x-0 top-0 z-[71] h-[3px] origin-left bg-terra" style={{ scaleX }} />;
}
