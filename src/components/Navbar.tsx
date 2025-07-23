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
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md font-mono transition-all duration-300 ${
        scrolled ? "bg-black/80 shadow-xl" : "bg-transparent"
      }`}
    >
      <Link href="/">
        <span className="text-2xl font-bold text-green-400 tracking-widest hover:scale-105 transition cursor-pointer">
          Syed Hassan Ul Haq
        </span>
      </Link>

      <div className="flex items-center gap-6 text-[var(--foreground)] text-sm font-semibold">
        <Link href="#projects" className="hover:text-green-300 transition">Projects</Link>
        <Link href="#contact" className="hover:text-green-300 transition">Contact</Link>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}

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
    <button onClick={toggleTheme} className="text-xl hover:text-green-300 transition">
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
