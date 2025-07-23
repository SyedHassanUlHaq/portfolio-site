"use client";

import { projects } from "@/data/projects";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)] font-mono relative overflow-hidden"
    >
      {/* Subtle hacker-themed background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-purple-500/5 pointer-events-none" />

      <FadeInWhenVisible>
        <h2 className="text-4xl font-bold text-center mb-12 text-green-400">🚀 Projects</h2>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto relative z-10">
        {projects.map((project, index) => (
          <FadeInWhenVisible key={index} delay={index * 0.15}>
            <a
              href={project.link}
              target="_blank"
              className="group relative rounded-2xl overflow-hidden border border-green-600 shadow-xl transition-transform hover:scale-[1.02] hover:border-green-400"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-green-400/10 to-purple-600/10 group-hover:opacity-20 opacity-10 z-0 transition" />
              <div className="relative z-10 p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-green-300">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map((t, i) => (
                    <span key={i} className="bg-green-500/10 text-xs px-2 py-1 rounded-full border border-green-500/30 text-green-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}
