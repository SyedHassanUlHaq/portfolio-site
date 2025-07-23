"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md font-mono transition-all duration-300 border-b border-green-400/10 ${
        scrolled ? "bg-black/70 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo with scale effect */}
      <Link href="/">
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: scrolled ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-2xl font-bold text-green-400 tracking-widest hover:glitch cursor-pointer"
        >
          Syed Hassan Ul Haq
        </motion.span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm text-[var(--foreground)] font-semibold">
        <GlitchLink href="#projects">Projects</GlitchLink>
        <GlitchLink href="#contact">Contact</GlitchLink>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}

// Glitch Link component
function GlitchLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="relative transition-all duration-300 hover:text-green-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-green-400 after:transition-all after:duration-300"
    >
      {children}
    </Link>
  );
}

// Theme Toggle with glowing pulse
function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    setDark(html.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setDark(html.classList.contains("dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl text-green-300 hover:text-green-400 transition animate-pulse hover:animate-none"
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
