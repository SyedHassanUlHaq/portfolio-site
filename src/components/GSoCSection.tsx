'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/images/gsoc/certificate.png",
    alt: "GSoC 2024 Certificate",
  },
  {
    src: "/images/gsoc/mentor-review.png",
    alt: "Mentor Feedback",
  }
];

export default function GSoCSection() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-black text-[var(--foreground)] z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center bg-black/40 backdrop-blur-md p-10 rounded-xl border border-white/10 shadow-xl"
      >
        {/* GSoC Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/gsoc/gsoc-logo.png"
            alt="Google Summer of Code Logo"
            width={140}
            height={60}
            className="object-contain"
          />
        </div>

        <h2 className="text-4xl font-bold text-white mb-4">
          Google Summer of Code 2024
        </h2>

        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Selected as a <span className="text-[#00ffaa] font-semibold">GSoC 2024 Mentee</span> under <strong>Chips Alliance</strong> for the project <strong>Support Zvk in T1 (RISC-V Vector coprocessor)</strong>, contributing to cutting-edge open-source tooling for chip design and silicon development.
        </p>

        <p className="text-sm text-gray-400 mt-3">
          Mentored by global experts, pushing low-level infrastructure forward with real-world impact.
        </p>

        {/* Images */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map(({ src, alt }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="overflow-hidden rounded-lg border border-white/10 shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <Image
                src={src}
                alt={alt}
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
