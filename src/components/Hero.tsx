'use client';

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-gradient-to-br from-purple-800 via-indigo-900 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-pink-500 rounded-full filter blur-3xl animate-pulse"
      />

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
        className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full filter blur-2xl animate-bounce"
      />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold tracking-tight z-10"
      >
        Hey, I&apos;m <span className="text-pink-400">Hassan</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-lg mt-4 max-w-xl text-center z-10"
      >
        I build creative, intelligent, and immersive web experiences using AI, Next.js, and a splash of chaos.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.4 }}
        className="flex gap-6 mt-8 z-10"
      >
        <a href="#projects" className="px-6 py-2 bg-white text-black font-bold rounded-full shadow-lg hover:scale-105 transition">
          View Projects
        </a>
        <a href="#contact" className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
          Contact Me
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="flex gap-4 mt-6 z-10"
      >
        <a href="https://github.com/SyedHassanUlHaq" target="_blank"><FaGithub size={24} /></a>
        <a href="https://linkedin.com/in/syed-hassan-ul-haq" target="_blank"><FaLinkedin size={24} /></a>
      </motion.div>
    </section>
  );
}
