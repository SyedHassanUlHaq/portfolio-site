import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // supports toggling between hacker dark and clean light
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui'],
        mono: ['Geist Mono', 'Fira Code', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        hacker: {
          green: '#39ff14',
          cyan: '#00ffff',
          pink: '#ff0077',
          purple: '#9d00ff',
          bg: '#0a0a0a',
          fg: '#e0e0e0',
        },
      },
      backgroundImage: {
        'matrix-glow': 'radial-gradient(circle at 20% 20%, rgba(57, 255, 20, 0.1), transparent)',
      },
      boxShadow: {
        'neon-green': '0 0 5px #39ff14, 0 0 10px #39ff14',
        'neon-pink': '0 0 5px #ff0077, 0 0 10px #ff0077',
      },
      animation: {
        flicker: 'flicker 1.5s infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
          '75%': { opacity: 0.4 },
        },
      },
    },
  },
  plugins: [],
};

export default config;
