"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const daySun = new THREE.Color("#fff3e2");
const nightSun = new THREE.Color("#7d8fb8");

/** Sun, sky and reflections, blended between day and night by `night` (0–1). */
export function Stage({ night, blueprint = false, shadowSize = 26 }: { night: RefObject<number>; blueprint?: boolean; shadowSize?: number }) {
  const sun = useRef<THREE.DirectionalLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const n = night.current ?? 0;
    if (sun.current) {
      sun.current.intensity = THREE.MathUtils.lerp(2.6, 0.35, n);
      sun.current.color.copy(daySun).lerp(nightSun, n);
      sun.current.position.set(THREE.MathUtils.lerp(18, -14, n), THREE.MathUtils.lerp(26, 14, n), THREE.MathUtils.lerp(14, 10, n));
    }
    if (hemi.current) hemi.current.intensity = THREE.MathUtils.lerp(0.9, 0.18, n);
    if (ambient.current) ambient.current.intensity = THREE.MathUtils.lerp(0.35, 0.08, n);
  });

  if (blueprint) return <ambientLight intensity={1} />;

  return (
    <>
      <ambientLight ref={ambient} intensity={0.35} />
      <hemisphereLight ref={hemi} args={["#f6f1e8", "#9a8f80", 0.9]} />
      <directionalLight
        ref={sun}
        castShadow
        position={[18, 26, 14]}
        intensity={2.6}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-left={-shadowSize}
        shadow-camera-right={shadowSize}
        shadow-camera-top={shadowSize}
        shadow-camera-bottom={-shadowSize}
        shadow-camera-near={1}
        shadow-camera-far={90}
      />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={1.6} position={[0, 10, -12]} scale={[30, 8, 1]} color="#ffffff" />
        <Lightformer intensity={0.8} position={[-14, 4, 6]} rotation-y={Math.PI / 2} scale={[20, 6, 1]} color="#f3e6d4" />
        <Lightformer intensity={0.6} position={[14, 4, 6]} rotation-y={-Math.PI / 2} scale={[20, 6, 1]} color="#dfe8f0" />
      </Environment>
    </>
  );
}
