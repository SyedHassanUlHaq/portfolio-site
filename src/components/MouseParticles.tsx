"use client";

import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function MouseParticles() {
  async function particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 0 },
          color: { value: ["#ff00cc", "#00ffff", "#ffffff"] },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 5 } },
          move: {
            enable: true,
            speed: 5,
            direction: "none",
            outModes: "destroy",
            trail: {
              enable: true,
              length: 20,
              fillColor: "#000",
            },
          },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "trail" } },
        },
        background: { color: "#000" },
      }}
    />
  );
}
