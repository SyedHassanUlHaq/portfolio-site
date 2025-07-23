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
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md transition-all duration-300 ${
        scrolled ? "bg-black/70 shadow-lg" : "bg-transparent"
      }`}
    >
      <Link href="/">
        <span className="text-2xl font-extrabold text-pink-400 tracking-wide hover:scale-105 transition cursor-pointer">
          Hassan
        </span>
      </Link>

      <div className="flex items-center gap-6 text-white text-sm font-semibold">
        <Link href="#projects" className="hover:text-pink-400 transition">Projects</Link>
        <Link href="#contact" className="hover:text-pink-400 transition">Contact</Link>
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
    <button onClick={toggleTheme} className="text-xl hover:text-yellow-300 transition">
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
