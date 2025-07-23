'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshWobbleMaterial } from '@react-three/drei';
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
    const sensitivity = 4;
    const lerpSpeed = 0.08;

    camera.position.x += (mouse.current.x * sensitivity - camera.position.x) * lerpSpeed;
    camera.position.y += (mouse.current.y * sensitivity - camera.position.y) * lerpSpeed;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Blob3D() {
  const glowColor = new THREE.Color('#00ffff');
  const baseColor = new THREE.Color('#ec4899');
  const blendColor = baseColor.clone().lerp(glowColor, 0.5);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-[-10] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />

        <mesh scale={1.3}>
          <icosahedronGeometry args={[1, 5]} />
          <MeshWobbleMaterial
            factor={1.1}
            speed={2.0}
            color={blendColor}
            emissive={glowColor}
            emissiveIntensity={1.5}
            transparent
            opacity={0.65}
            roughness={0.2}
            metalness={1}
          />
        </mesh>

        <Environment preset="sunset" />
        <InteractiveCamera />
      </Canvas>
    </div>
  );
}
