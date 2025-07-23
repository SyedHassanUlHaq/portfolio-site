'use client';

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Parallax } from "react-scroll-parallax";
import InteractiveBlob from "@/components/InteractiveBlob";
import GalaxyCore3D from "@/components/GalaxyCore3D";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center bg-[var(--background)] text-[var(--foreground)] font-mono overflow-hidden z-0">

      <GalaxyCore3D />
      <InteractiveBlob />

      {/* === Neon Blobs === */}
      <div className="absolute animate-[blob_22s_infinite] bg-purple-600 opacity-20 w-[30rem] h-[30rem] rounded-full filter blur-3xl top-[-15%] left-[60%] z-0" />
      <div className="absolute animate-[blob_28s_infinite] bg-pink-500 opacity-15 w-[25rem] h-[25rem] rounded-full filter blur-2xl top-[50%] left-[-10%] z-0" />

      {/* === Parallax Blobs === */}
      <Parallax speed={-20}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-pink-500 rounded-full filter blur-3xl animate-pulse"
        />
      </Parallax>

      <Parallax speed={10}>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
          className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full filter blur-2xl animate-bounce"
        />
      </Parallax>

      {/* === Content Overlay === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-black/50 backdrop-blur-md p-8 rounded-xl shadow-lg text-center max-w-2xl w-full border border-white/10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
          Hey, I&apos;m <span className="text-green-400">Hassan</span>
        </h1>
        <p className="text-lg text-gray-200">
          I design systems that think, automate, and scale — from backend APIs to AI agents and post-quantum silicon cores
        </p>

        <div className="flex gap-6 justify-center mt-6 flex-wrap">
          <a
            href="#projects"
            className="px-6 py-2 rounded-full font-semibold shadow-md transition bg-gradient-to-br from-green-500/30 to-green-400/20 text-green-300 hover:from-green-400/50 hover:to-green-300/30 hover:text-white backdrop-blur-md border border-green-300/30"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-2 rounded-full font-semibold shadow-md transition bg-gradient-to-br from-green-500/20 to-green-400/10 text-green-300 hover:from-green-400/40 hover:to-green-300/20 hover:text-white backdrop-blur-md border border-green-300/20"
          >
            Contact Me
          </a>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <a
            href="https://github.com/SyedHassanUlHaq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffffff] hover:text-[#cccccc] transition"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/syed-hassan-ul-haq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0077B5] hover:text-[#3399cc] transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
