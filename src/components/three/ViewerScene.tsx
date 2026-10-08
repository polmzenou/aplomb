"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { HouseParams } from "@/data/types";
import { HouseModel, type LabelRefs } from "./HouseModel";
import { Stage } from "./Stage";

type Props = {
  params: HouseParams;
  nightTarget: RefObject<number>;
  explodeTarget: RefObject<number>;
  blueprint: boolean;
  labels: LabelRefs;
};

/** Orbitable model for a listing page. */
export function ViewerScene({ params, nightTarget, explodeTarget, blueprint, labels }: Props) {
  const night = useRef(0);
  const explode = useRef(0);

  useFrame((_, delta) => {
    night.current = THREE.MathUtils.damp(night.current, nightTarget.current ?? 0, 3, delta);
    explode.current = THREE.MathUtils.damp(explode.current, explodeTarget.current ?? 0, 4, delta);
  });

  const span = Math.max(params.site.w, params.site.d);

  return (
    <>
      <Stage night={night} blueprint={blueprint} shadowSize={span * 0.7} />
      <group position={[0, -2, 0]}>
        <HouseModel params={params} mode={{ night, explode, blueprint }} labels={labels} />
      </group>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={span * 0.75}
        maxDistance={span * 2}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 2.15}
        autoRotate
        autoRotateSpeed={0.5}
        target={[0, 1, 0]}
      />
    </>
  );
}
