'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
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

function PulsingSphere({ size, color, speed }: { size: number; color: string; speed: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const scale = 1 + 0.1 * Math.sin(clock.getElapsedTime() * speed);
    if (mesh.current) {
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default function Blob3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 2]} intensity={1.2} color="#00ffff" />
        <pointLight position={[-2, -2, -2]} intensity={1.2} color="#ff00ff" />

        {/* Core Glow Spheres */}
        <PulsingSphere size={0.6} color="#00ffff" speed={2.5} />
        <PulsingSphere size={0.9} color="#ff00ff" speed={1.8} />
        <PulsingSphere size={1.2} color="#ec4899" speed={1.2} />

        {/* Cosmic Environment */}
        <Environment preset="sunset" />
        <InteractiveCamera />
      </Canvas>
    </div>
  );
}
