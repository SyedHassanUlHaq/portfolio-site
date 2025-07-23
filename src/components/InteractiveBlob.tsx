'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function InteractiveBlob() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  const xTransform = useTransform(springX, (x) => x - dimensions.width / 2);
  const yTransform = useTransform(springY, (y) => y - dimensions.height / 2);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        style={{
          x: xTransform,
          y: yTransform,
        }}
        className="w-[40rem] h-[40rem] absolute bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full filter blur-3xl opacity-25 mix-blend-screen"
      />
    </div>
  );
}
