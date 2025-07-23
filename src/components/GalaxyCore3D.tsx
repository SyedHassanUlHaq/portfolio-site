'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshWobbleMaterial, Points, PointMaterial, Effects } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function InteractiveCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const sensitivity = 3;
    const lerpSpeed = 0.06;

    camera.position.x += (mouse.current.x * sensitivity - camera.position.x) * lerpSpeed;
    camera.position.y += (mouse.current.y * sensitivity - camera.position.y) * lerpSpeed;
    camera.lookAt(0, 0, 0);
  });

  return null;
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
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function GalaxyCore() {
  const glowColor = new THREE.Color('#00ffff');
  const baseColor = new THREE.Color('#ec4899');
  const blendColor = baseColor.clone().lerp(glowColor, 0.4); // softer mix

  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1.0} />

        {/* Pulsing Core */}
        <mesh scale={1.3}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshWobbleMaterial
            factor={1.1}
            speed={1.7}
            color={blendColor}
            emissive={glowColor}
            emissiveIntensity={0.7} // ⬅️ Dimmed
            transparent
            opacity={0.45}         // ⬅️ Dimmed
            roughness={0.25}
            metalness={1}
          />
        </mesh>

        {/* Galaxy Particles */}
        <GalaxyParticles />

        {/* Bloom Effect */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.4} // ⬅️ Dimmed bloom
          />
        </EffectComposer>

        <Environment preset="sunset" />
        <InteractiveCamera />
      </Canvas>
    </div>
  );
}
