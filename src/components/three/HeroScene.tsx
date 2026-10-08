"use client";
/* eslint-disable react-hooks/immutability -- the R3F frame loop mutates three.js objects and refs imperatively by design */

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { HouseParams } from "@/data/types";
import { clamp } from "@/lib/utils";
import { HouseModel, type LabelRefs } from "./HouseModel";
import { Stage } from "./Stage";

export const heroModel: HouseParams = {
  site: { w: 40, d: 30 },
  volumes: [
    { level: 0, w: 16, d: 10, glass: ["s", "e"], finish: "concrete" },
    { level: 1, w: 18, d: 8, x: 3, z: -1, glass: ["s"], finish: "white" },
    { level: 2, w: 8, d: 7, x: -3, z: -1.5, glass: ["s", "w"], finish: "wood" },
  ],
  pool: { w: 12, d: 4, x: -3, z: 9.5 },
  deck: { w: 18, d: 3.5, x: 0, z: 6.2 },
  trees: [[-15, -8, 1.3], [-14, 6, 1], [15, 10, 1.1], [16, -8, 1.4], [6, -12, 1.2]],
};

type Props = {
  progress: RefObject<number>;
  night: RefObject<number>;
  nightTarget: RefObject<number>;
  blueprint: boolean;
  labels: LabelRefs;
};

/** Hero model: rotates and explodes with scroll, tilts toward the pointer. */
export function HeroScene({ progress, night, nightTarget, blueprint, labels }: Props) {
  const rig = useRef<THREE.Group>(null);
  const explode = useRef(0);

  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    explode.current = clamp((p - 0.06) / 0.55);

    // Responsive framing: pull back on narrow screens, push the model right of the headline on wide ones.
    const aspect = state.size.width / state.size.height;
    const distance = aspect < 0.8 ? 2.1 : aspect < 1.3 ? 1.5 : 1;
    const look = aspect < 1.3 ? [0, 9 - p * 4, 0] : [-9, 3 - p * 2, 0];
    target.current.set(look[0], look[1], look[2]);
    state.camera.position.lerp(new THREE.Vector3(30 * distance, 22 * distance + p * 6, 34 * distance), 0.08);
    state.camera.lookAt(target.current);
    night.current = THREE.MathUtils.damp(night.current ?? 0, nightTarget.current ?? 0, 3, delta);
    if (rig.current) {
      const targetY = -0.55 + p * 1.25 + state.pointer.x * 0.12;
      const targetX = state.pointer.y * -0.04;
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, targetY, 4, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, targetX, 4, delta);
      rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, -3 - p * 2, 4, delta);
    }
  });

  return (
    <>
      <Stage night={night} blueprint={blueprint} />
      <group ref={rig} position={[0, -3, 0]}>
        <HouseModel params={heroModel} mode={{ night, explode, blueprint }} labels={labels} />
      </group>
    </>
  );
}
