'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, MeshWobbleMaterial } from '@react-three/drei';
import { Suspense } from 'react';

export default function Blob3D() {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <mesh scale={1.2}>
            <icosahedronGeometry args={[1, 4]} />
            <MeshWobbleMaterial
              factor={0.8}
              speed={1.2}
              color="#ec4899"
              transparent
              opacity={0.7}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}
