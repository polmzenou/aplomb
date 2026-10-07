"use client";
/* eslint-disable react-hooks/immutability -- the R3F frame loop mutates three.js objects and refs imperatively by design */

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Html } from "@react-three/drei";
import * as THREE from "three";
import type { Finish, HouseParams, Side, Volume } from "@/data/types";

export const LEVEL_H = 3.2;
const WALL = 0.28;
const SLAB = 0.32;

export type SceneMode = { night: RefObject<number>; explode: RefObject<number>; blueprint: boolean };

const FINISH: Record<Finish, string> = {
  concrete: "#cdc8bf",
  white: "#f2efe9",
  wood: "#a37a52",
  dark: "#34322e",
};

const BLUE_LINE = "#b7cde6";

function useMaterials(blueprint: boolean) {
  return useMemo(() => {
    const solid = (color: string, roughness = 0.85) =>
      blueprint
        ? new THREE.MeshBasicMaterial({ color: "#244672", transparent: true, opacity: 0.55 })
        : new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });
    return {
      finish: {
        concrete: solid(FINISH.concrete, 0.95),
        white: solid(FINISH.white, 0.75),
        wood: solid(FINISH.wood, 0.8),
        dark: solid(FINISH.dark, 0.7),
      } as Record<Finish, THREE.Material>,
      slab: solid("#e9e5dd", 0.9),
      frame: blueprint ? new THREE.MeshBasicMaterial({ color: BLUE_LINE }) : new THREE.MeshStandardMaterial({ color: "#1f1e1c", roughness: 0.5, metalness: 0.4 }),
      glass: blueprint
        ? new THREE.MeshBasicMaterial({ color: "#3a6aa0", transparent: true, opacity: 0.25 })
        : new THREE.MeshStandardMaterial({
            color: "#a9bfcc",
            roughness: 0.05,
            metalness: 0.3,
            transparent: true,
            opacity: 0.35,
            emissive: new THREE.Color("#ffb36b"),
            emissiveIntensity: 0,
          }),
      water: blueprint
        ? new THREE.MeshBasicMaterial({ color: "#3a6aa0", transparent: true, opacity: 0.4 })
        : new THREE.MeshStandardMaterial({ color: "#5fa8c9", roughness: 0.1, metalness: 0.2, emissive: new THREE.Color("#2f9fd6"), emissiveIntensity: 0 }),
      deck: solid("#b89470", 0.9),
      base: solid("#e6e0d5", 1),
      board: solid("#cdb48f", 0.9),
      foliage: blueprint ? new THREE.MeshBasicMaterial({ color: "#244672", transparent: true, opacity: 0.3 }) : new THREE.MeshStandardMaterial({ color: "#9aa592", roughness: 1 }),
      trunk: solid("#6b5a48", 1),
    };
  }, [blueprint]);
}

type Mats = ReturnType<typeof useMaterials>;

function Block({
  size,
  position,
  material,
  blueprint,
  edges = true,
  cast = true,
}: {
  size: [number, number, number];
  position: [number, number, number];
  material: THREE.Material;
  blueprint: boolean;
  edges?: boolean;
  cast?: boolean;
}) {
  return (
    <mesh position={position} material={material} castShadow={cast && !blueprint} receiveShadow={!blueprint}>
      <boxGeometry args={size} />
      {edges && <Edges color={blueprint ? BLUE_LINE : "#1d1c1a"} threshold={15} lineWidth={blueprint ? 1.2 : 1} transparent opacity={blueprint ? 1 : 0.18} />}
    </mesh>
  );
}

/** Glazed façade: glass pane with thin mullions every ~2.4 m. */
function GlassWall({ length, height, position, rotation, m, blueprint }: { length: number; height: number; position: [number, number, number]; rotation: number; m: Mats; blueprint: boolean }) {
  const count = Math.max(1, Math.round(length / 2.4));
  const step = length / count;
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh material={m.glass}>
        <boxGeometry args={[length, height, 0.06]} />
      </mesh>
      {Array.from({ length: count + 1 }, (_, i) => (
        <mesh key={i} position={[-length / 2 + i * step, 0, 0]} material={m.frame} castShadow={!blueprint}>
          <boxGeometry args={[0.08, height, 0.12]} />
        </mesh>
      ))}
    </group>
  );
}

function VolumeMesh({ v, m, blueprint, labels, labelRef }: { v: Volume; m: Mats; blueprint: boolean; labels?: string; labelRef?: (el: HTMLDivElement | null) => void }) {
  const h = v.h ?? LEVEL_H;
  const wallH = h - SLAB;
  const glass = new Set<Side>(v.glass ?? []);
  const mat = m.finish[v.finish ?? "white"];
  const sides: { side: Side; len: number; pos: [number, number, number]; rot: number }[] = [
    { side: "s", len: v.w, pos: [0, SLAB + wallH / 2, v.d / 2 - WALL / 2], rot: 0 },
    { side: "n", len: v.w, pos: [0, SLAB + wallH / 2, -v.d / 2 + WALL / 2], rot: 0 },
    { side: "e", len: v.d - WALL * 2, pos: [v.w / 2 - WALL / 2, SLAB + wallH / 2, 0], rot: Math.PI / 2 },
    { side: "w", len: v.d - WALL * 2, pos: [-v.w / 2 + WALL / 2, SLAB + wallH / 2, 0], rot: Math.PI / 2 },
  ];
  return (
    <group position={[v.x ?? 0, 0, v.z ?? 0]}>
      {/* floor slab */}
      <Block size={[v.w + 0.3, SLAB, v.d + 0.3]} position={[0, SLAB / 2, 0]} material={m.slab} blueprint={blueprint} />
      {sides.map(({ side, len, pos, rot }) =>
        glass.has(side) ? (
          <GlassWall key={side} length={len} height={wallH} position={pos} rotation={rot} m={m} blueprint={blueprint} />
        ) : (
          <Block
            key={side}
            size={rot ? [WALL, wallH, len] : [len, wallH, WALL]}
            position={pos}
            material={mat}
            blueprint={blueprint}
          />
        ),
      )}
      {/* roof slab */}
      <Block size={[v.w + 0.5, SLAB, v.d + 0.5]} position={[0, h + SLAB / 2, 0]} material={m.finish[v.finish === "wood" || v.finish === "dark" ? v.finish : "white"]} blueprint={blueprint} />
      {labels && (
        <Html position={[v.w / 2 + 0.6, h / 2, v.d / 2]} center={false} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div ref={labelRef} className="mono flex items-center gap-2 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-ink opacity-0 transition-opacity duration-500">
            <span className="h-px w-8 bg-terra" />
            <span className="bg-paper/90 px-1.5 py-0.5">{labels}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function Tree({ x, z, s, m, blueprint }: { x: number; z: number; s: number; m: Mats; blueprint: boolean }) {
  return (
    <group position={[x, 0, z]} scale={s}>
      <mesh position={[0, 1.2, 0]} material={m.trunk} castShadow={!blueprint}>
        <cylinderGeometry args={[0.08, 0.12, 2.4, 6]} />
      </mesh>
      <mesh position={[0, 3.1, 0]} material={m.foliage} castShadow={!blueprint}>
        <icosahedronGeometry args={[1.5, 1]} />
        {blueprint && <Edges color={BLUE_LINE} threshold={1} />}
      </mesh>
    </group>
  );
}

/**
 * Architectural scale model generated from a HouseParams description.
 * `mode.explode` (0–1) lifts each level apart; `mode.night` (0–1) lights the interior.
 */
export function HouseModel({ params, mode, levelLabels }: { params: HouseParams; mode: SceneMode; levelLabels?: string[] }) {
  const m = useMaterials(mode.blueprint);
  const levels = useMemo(() => {
    const byLevel = new Map<number, Volume[]>();
    params.volumes.forEach((v) => byLevel.set(v.level, [...(byLevel.get(v.level) ?? []), v]));
    // Base height of each level: stacked heights of the levels below.
    let y = params.pilotis ? 1.2 : 0;
    return [...byLevel.entries()]
      .sort(([a], [b]) => a - b)
      .map(([level, vols]) => {
        const base = y;
        y += Math.max(...vols.map((v) => v.h ?? LEVEL_H)) + SLAB;
        return { level, base, vols };
      });
  }, [params]);

  const groups = useRef<(THREE.Group | null)[]>([]);
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);
  const lights = useRef<(THREE.PointLight | null)[]>([]);

  useFrame(() => {
    const e = mode.explode.current ?? 0;
    const n = mode.night.current ?? 0;
    levels.forEach((l, i) => {
      const g = groups.current[i];
      if (g) g.position.y = THREE.MathUtils.lerp(g.position.y, l.base + i * e * 3.4, 0.12);
      const label = labelEls.current[i];
      if (label) label.style.opacity = e > 0.25 ? String(Math.min(1, (e - 0.25) * 3)) : "0";
      const light = lights.current[i];
      if (light) light.intensity = n * 14;
    });
    const glass = m.glass as THREE.MeshStandardMaterial;
    if ("emissiveIntensity" in glass) glass.emissiveIntensity = n * 1.1;
    const water = m.water as THREE.MeshStandardMaterial;
    if ("emissiveIntensity" in water) water.emissiveIntensity = n * 0.9;
  });

  return (
    <group>
      {/* model board */}
      <Block size={[params.site.w + 1.2, 0.5, params.site.d + 1.2]} position={[0, -0.55, 0]} material={m.board} blueprint={mode.blueprint} edges={mode.blueprint} cast={false} />
      <Block size={[params.site.w, 0.3, params.site.d]} position={[0, -0.15, 0]} material={m.base} blueprint={mode.blueprint} edges={mode.blueprint} cast={false} />

      {params.pilotis &&
        params.volumes
          .filter((v) => v.level === 0)
          .flatMap((v) =>
            [-1, 1].flatMap((sx) =>
              [-1, 0, 1].map((k) => (
                <mesh key={`${sx}${k}${v.w}`} position={[(v.x ?? 0) + (sx * (v.w - 1)) / 2, 0.6, (v.z ?? 0) + (k * (v.d - 1)) / 2]} material={m.frame}>
                  <cylinderGeometry args={[0.12, 0.12, 1.2, 8]} />
                </mesh>
              )),
            ),
          )}

      {levels.map((l, i) => (
        <group key={l.level} ref={(el) => void (groups.current[i] = el)} position={[0, l.base, 0]}>
          {l.vols.map((v, j) => (
            <VolumeMesh
              key={j}
              v={v}
              m={m}
              blueprint={mode.blueprint}
              labels={j === 0 ? levelLabels?.[i] : undefined}
              labelRef={j === 0 ? (el) => void (labelEls.current[i] = el) : undefined}
            />
          ))}
          {!mode.blueprint && (
            <pointLight
              ref={(el) => void (lights.current[i] = el)}
              position={[l.vols[0].x ?? 0, 1.8, l.vols[0].z ?? 0]}
              color="#ffb36b"
              intensity={0}
              distance={14}
              decay={1.6}
            />
          )}
        </group>
      ))}

      {params.deck && <Block size={[params.deck.w, 0.2, params.deck.d]} position={[params.deck.x, 0.1, params.deck.z]} material={m.deck} blueprint={mode.blueprint} />}
      {params.pool && (
        <group position={[params.pool.x, 0, params.pool.z]}>
          <Block size={[params.pool.w + 0.8, 0.18, params.pool.d + 0.8]} position={[0, 0.09, 0]} material={m.slab} blueprint={mode.blueprint} />
          <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.water} receiveShadow>
            <planeGeometry args={[params.pool.w, params.pool.d]} />
          </mesh>
        </group>
      )}
      {params.trees?.map(([x, z, s], i) => <Tree key={i} x={x} z={z} s={s} m={m} blueprint={mode.blueprint} />)}
    </group>
  );
}
