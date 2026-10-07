"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Property } from "@/data/types";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { Blueprint, Cube, Layers, Moon, Sun } from "@/components/ui/Icons";

const ViewerScene = dynamic(() => import("@/components/three/ViewerScene").then((m) => m.ViewerScene), { ssr: false });

function Btn({ active, onClick, children, dark }: { active: boolean; onClick: () => void; children: React.ReactNode; dark: boolean }) {
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

export function ModelViewer({ property: p }: { property: Property }) {
  const t = useTranslations("property");
  const [night, setNight] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const nightTarget = useRef(0);
  const explodeTarget = useRef(0);
  const dark = night || blueprint;

  useEffect(() => {
    nightTarget.current = night ? 1 : 0;
    explodeTarget.current = exploded ? 1 : 0;
  }, [night, exploded]);

  const levelCount = new Set(p.model.volumes.map((v) => v.level)).size;
  const labels = Array.from({ length: levelCount }, (_, i) => t("levelLabel", { n: i }));

  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden border border-ink transition-colors duration-700 md:aspect-[16/9]", blueprint ? "blueprint-paper" : night ? "bg-[#14161b]" : "graph-paper bg-paper-2")}>
      <SceneCanvas
        className="absolute inset-0"
        label={t("modelLabel", { title: p.title })}
        shadows
        camera={{ position: [32, 24, 36], fov: 30, near: 1, far: 300 }}
        fallback={<Image src={img(p.cover, 1400)} alt="" fill sizes="100vw" className="object-cover" />}
      >
        <ViewerScene params={p.model} nightTarget={nightTarget} explodeTarget={explodeTarget} blueprint={blueprint} labels={labels} />
      </SceneCanvas>
      <div className={cn("absolute left-3 top-3 flex flex-wrap border backdrop-blur-sm", dark ? "border-paper/30 bg-ink/40 text-paper" : "border-ink/20 bg-paper/70")}>
        <Btn active={!night} onClick={() => setNight(false)} dark={dark}>
          <Sun className="h-3.5 w-3.5" /> {t("controls.day")}
        </Btn>
        <Btn active={night} onClick={() => setNight(true)} dark={dark}>
          <Moon className="h-3.5 w-3.5" /> {t("controls.night")}
        </Btn>
        <Btn active={exploded} onClick={() => setExploded((e) => !e)} dark={dark}>
          <Layers className="h-3.5 w-3.5" /> {exploded ? t("controls.assemble") : t("controls.explode")}
        </Btn>
        <Btn active={blueprint} onClick={() => setBlueprint((b) => !b)} dark={dark}>
          {blueprint ? <Cube className="h-3.5 w-3.5" /> : <Blueprint className="h-3.5 w-3.5" />} {blueprint ? t("controls.model") : t("controls.blueprint")}
        </Btn>
      </div>
      <p className={cn("mono pointer-events-none absolute bottom-3 right-3 text-[0.6rem] uppercase tracking-[0.12em]", dark ? "text-paper/60" : "text-mute")}>
        {p.ref} · 1:200
      </p>
    </div>
  );
}
