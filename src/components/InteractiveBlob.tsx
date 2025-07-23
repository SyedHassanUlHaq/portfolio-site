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

    // Add idle floating motion
    const idleMotion = () => {
      mouseX.set(mouseX.get() + (Math.random() - 0.5) * 20);
      mouseY.set(mouseY.get() + (Math.random() - 0.5) * 20);
    };

    const interval = setInterval(idleMotion, 2000);

    window.addEventListener('mousemove', updateMouse);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-[-10] pointer-events-none"
    >
      {/* Main neon blob */}
      <motion.div
        style={{ x: xTransform, y: yTransform }}
        className="w-[50rem] h-[50rem] absolute bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-700 rounded-full blur-[120px] opacity-30 mix-blend-screen transition-all duration-1000 shadow-[0_0_200px_60px_rgba(255,0,255,0.1)]"
      />

      {/* Secondary blob for depth */}
      <motion.div
        style={{
          x: useTransform(springX, (x) => x - dimensions.width / 2 + 120),
          y: useTransform(springY, (y) => y - dimensions.height / 2 + 100),
        }}
        className="w-[30rem] h-[30rem] absolute bg-gradient-to-tr from-cyan-400 to-sky-600 rounded-full blur-[100px] opacity-20 mix-blend-lighten transition-all duration-1000"
      />
    </div>
  );
}
