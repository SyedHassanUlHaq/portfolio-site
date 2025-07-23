'use client';

import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Environment, Points, PointMaterial } from '@react-three/drei';


function CoreSphere({ scale, color, opacity }: { scale: number; color: string; opacity: number }) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        emissive={color}
        emissiveIntensity={1.5}
        roughness={0.2}
        metalness={1}
      />
    </mesh>
  );
}

function GalaxyParticles() {
  const points = useRef<THREE.Points>(null!);

  useFrame(() => {
    points.current.rotation.y += 0.001;
  });

  const particles = Array.from({ length: 1000 }, () => [
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 6,
  ]);

  return (
    <Points ref={points} positions={new Float32Array(particles.flat())} stride={3}>
    <PointMaterial transparent color="#00ffff" size={0.03} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

export default function GalaxyCore3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#00ffff" />

        {/* Glowing Core */}
        <CoreSphere scale={1.0} color="#ec4899" opacity={0.5} />
        <CoreSphere scale={1.3} color="#00ffff" opacity={0.3} />
        <CoreSphere scale={1.6} color="#ffffff" opacity={0.2} />

        {/* Particle Halo */}
        <GalaxyParticles />

        {/* Lighting & FX */}
        <Environment preset="sunset" />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
