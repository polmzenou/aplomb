"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import * as THREE from "three";

export type ErrorMode = "scattered" | "sealed";

const palette = ["#cdc8bf", "#f2efe9", "#a37a52", "#34322e"];

/** Pseudo-random but stable layout of model pieces. */
function pieces(count: number) {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, (_, i) => {
    const kind = i % 4;
    const size: [number, number, number] =
      kind === 0 ? [3 + rnd() * 3, 0.25, 2 + rnd() * 2] : kind === 1 ? [2 + rnd() * 2, 2.2, 0.2] : kind === 2 ? [0.2, 2 + rnd(), 1.5 + rnd() * 2] : [1 + rnd(), 1 + rnd(), 1 + rnd()];
    return {
      size,
      position: [(rnd() - 0.5) * 16, (rnd() - 0.5) * 8, (rnd() - 0.5) * 6] as [number, number, number],
      rotation: [rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI] as [number, number, number],
      color: palette[Math.floor(rnd() * palette.length)],
      glass: kind === 2 && rnd() > 0.4,
      speed: 0.6 + rnd() * 1.2,
    };
  });
}

function Scattered() {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => pieces(18), []);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * 0.2, 2, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, state.pointer.x * 0.8, 2, delta);
  });
  return (
    <group ref={group}>
      {items.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh position={p.position} rotation={p.rotation} castShadow>
            <boxGeometry args={p.size} />
            {p.glass ? (
              <meshStandardMaterial color="#a9bfcc" transparent opacity={0.4} roughness={0.05} metalness={0.3} />
            ) : (
              <meshStandardMaterial color={p.color} roughness={0.85} />
            )}
            <Edges color="#1d1c1a" threshold={15} transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Sealed() {
  const group = useRef<THREE.Group>(null);
  const slit = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.5 + state.pointer.x * 0.35, 3, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.12 + state.pointer.y * -0.08, 3, delta);
    }
    if (slit.current) slit.current.emissiveIntensity = 1.6 + Math.sin(state.clock.elapsedTime * 1.4) * 0.6;
  });
  return (
    <group ref={group} scale={1.45}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[6, 7, 6]} />
        <meshStandardMaterial color="#cdc8bf" roughness={0.95} />
        <Edges color="#1d1c1a" transparent opacity={0.35} />
      </mesh>
      {/* closed door outline */}
      <mesh position={[0, -1.6, 3.01]}>
        <planeGeometry args={[1.6, 3.6]} />
        <meshStandardMaterial color="#34322e" roughness={0.6} />
      </mesh>
      {/* light leaking under the door */}
      <mesh position={[0, -3.42, 3.02]}>
        <planeGeometry args={[1.6, 0.06]} />
        <meshStandardMaterial ref={slit} color="#ffb36b" emissive="#ffb36b" emissiveIntensity={2} />
      </mesh>
      {/* vertical light slit */}
      <mesh position={[3.01, 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.12, 5]} />
        <meshStandardMaterial color="#ffb36b" emissive="#ffb36b" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0, -3.6, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.12} />
      </mesh>
    </group>
  );
}

export function ErrorScene({ mode }: { mode: ErrorMode }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight args={["#f6f1e8", "#9a8f80", 0.8]} />
      <directionalLight position={[8, 12, 10]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      {mode === "sealed" ? <Sealed /> : <Scattered />}
    </>
  );
}
