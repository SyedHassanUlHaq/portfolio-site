"use client";

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

/**
 * 💻 MouseParticles - Hacker Mode:
 * Adds interactive particles in a neon, coder-style aesthetic.
 */
export default function MouseParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // load lightweight engine
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: {
      enable: true,
      zIndex: -1, // Keep it behind everything
    },
    particles: {
      number: {
        value: 80,
      },
      color: {
        value: ["#00ffcc", "#ff0077", "#39ff14"], // green, cyan, pink — matrix/dev vibes
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 3.5 },
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        outModes: {
          default: "bounce",
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: { enable: true },
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.35,
        },
      },
    },
    detectRetina: true,
  };

  return init ? <Particles id="tsparticles" options={options} /> : null;
}
