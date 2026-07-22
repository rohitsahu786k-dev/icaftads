"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SignalSceneProps = {
  active: boolean;
  mobile: boolean;
};

export function HeroSignalScene({ active, mobile }: SignalSceneProps) {
  return (
    <Canvas
      camera={{ fov: 42, position: [0, 0, 7] }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false
      }}
    >
      <color attach="background" args={["#050505"]} />
      <SignalSculpture active={active} mobile={mobile} />
    </Canvas>
  );
}

function SignalSculpture({ active, mobile }: SignalSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = mobile ? 68 : 144;

  const { linePositions, organizedPositions, scatteredPositions } = useMemo(() => {
    const scattered: number[] = [];
    const organized: number[] = [];
    const lines: number[] = [];

    for (let index = 0; index < particleCount; index += 1) {
      const angle = index * 0.72;
      const radius = 1.1 + (index % 18) * 0.045;
      const layer = (index % 7) - 3;
      const x = Math.cos(angle) * radius + layer * 0.08;
      const y = Math.sin(angle * 0.86) * radius * 0.58;
      const z = Math.sin(angle * 0.4) * 0.72;

      organized.push(x, y, z);
      scattered.push(
        x + Math.sin(index * 1.7) * 2.2,
        y + Math.cos(index * 0.9) * 1.35,
        z + Math.sin(index * 0.31) * 1.4
      );
    }

    const anchors = [
      new THREE.Vector3(-2.35, -1.1, 0),
      new THREE.Vector3(-1.45, 0.95, 0.15),
      new THREE.Vector3(0, 0.05, 0.25),
      new THREE.Vector3(1.25, 0.85, 0.1),
      new THREE.Vector3(2.35, -0.75, 0)
    ];

    for (let index = 0; index < anchors.length - 1; index += 1) {
      const current = anchors[index];
      const next = anchors[index + 1];
      if (!current || !next) continue;
      lines.push(current.x, current.y, current.z, next.x, next.y, next.z);
    }

    return {
      linePositions: new Float32Array(lines),
      organizedPositions: new Float32Array(organized),
      scatteredPositions: new Float32Array(scattered)
    };
  }, [particleCount]);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(scatteredPositions.slice(), 3));
    return geometry;
  }, [scatteredPositions]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geometry;
  }, [linePositions]);

  useEffect(() => {
    return () => {
      particleGeometry.dispose();
      lineGeometry.dispose();
    };
  }, [lineGeometry, particleGeometry]);

  useFrame(({ clock }) => {
    if (!active) return;

    const elapsed = clock.getElapsedTime();
    const position = particleGeometry.attributes.position;
    if (!(position instanceof THREE.BufferAttribute)) return;

    const positions = position.array;
    const progress = Math.min(1, elapsed * 0.16);

    for (let index = 0; index < positions.length; index += 3) {
      const scatteredX = scatteredPositions[index] ?? 0;
      const scatteredY = scatteredPositions[index + 1] ?? 0;
      const scatteredZ = scatteredPositions[index + 2] ?? 0;
      const organizedX = organizedPositions[index] ?? 0;
      const organizedY = organizedPositions[index + 1] ?? 0;
      const organizedZ = organizedPositions[index + 2] ?? 0;

      positions[index] = THREE.MathUtils.lerp(scatteredX, organizedX, progress);
      positions[index + 1] =
        THREE.MathUtils.lerp(scatteredY, organizedY, progress) +
        Math.sin(elapsed + index * 0.05) * 0.012;
      positions[index + 2] = THREE.MathUtils.lerp(scatteredZ, organizedZ, progress);
    }

    position.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.18) * 0.18;
      groupRef.current.rotation.x = Math.cos(elapsed * 0.14) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={particleGeometry}>
        <pointsMaterial
          color="#d6a34a"
          opacity={0.78}
          size={mobile ? 0.038 : 0.032}
          sizeAttenuation
          transparent
        />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#f4efe7" opacity={0.28} transparent />
      </lineSegments>
      <mesh position={[0, 0.02, -0.22]}>
        <torusGeometry args={[1.82, 0.006, 8, 96]} />
        <meshBasicMaterial color="#d6a34a" opacity={0.3} transparent />
      </mesh>
      <mesh position={[0, 0.02, -0.28]}>
        <torusGeometry args={[0.68, 0.008, 8, 96]} />
        <meshBasicMaterial color="#f4efe7" opacity={0.16} transparent />
      </mesh>
    </group>
  );
}
