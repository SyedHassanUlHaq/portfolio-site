'use client';

import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";

export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="about"
      className="relative py-24 px-6 bg-[var(--background)] text-[var(--foreground)] font-mono overflow-hidden"
    >
      {/* Abstract parallax blobs */}
      <Parallax speed={-10}>
        <div className="absolute -top-32 left-1/3 w-[30rem] h-[30rem] bg-green-500 opacity-10 rounded-full filter blur-3xl" />
      </Parallax>

      <Parallax speed={15}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full filter blur-2xl" />
      </Parallax>

      <Parallax speed={8}>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 opacity-10 rounded-full filter blur-2xl" />
      </Parallax>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-6 text-green-400">🧠 About Me</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            I&apos;m Hassan, a creative technologist focused on building intelligent systems with personality.
            I specialize in AI Agents, Full Stack web apps, and anything that makes users go “whoa.”
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["AI", "LLMs", "Next.js", "Tailwind", "Framer Motion", "Supabase", "VAPI", "Node.js"].map((tech, i) => (
              <span
                key={i}
                className="bg-[var(--foreground)]/10 text-[var(--foreground)] px-4 py-2 rounded-full text-sm hover:bg-[var(--foreground)]/20 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
