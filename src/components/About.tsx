'use client';

import { useEffect, useState } from "react";

export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="about"
      className="relative py-24 px-6 bg-gradient-to-b from-black to-purple-950 text-white overflow-hidden"
    >
      {/* Abstract blob background */}
      <div className="absolute -top-32 left-1/3 w-[30rem] h-[30rem] bg-indigo-500 opacity-20 rounded-full filter blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 opacity-10 rounded-full filter blur-2xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-700 opacity-10 rounded-full filter blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">🧠 About Me</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          I&apos;m Hassan, a creative technologist focused on building intelligent systems with personality.
          I specialize in AI Agents, Full Stack web apps, and anything that makes users go “whoa.”
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["AI", "LLMs", "Next.js", "Tailwind", "Framer Motion", "Supabase", "VAPI", "Node.js"].map((tech, i) => (
            <span
              key={i}
              className="bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
