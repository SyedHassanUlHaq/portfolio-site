import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-gradient-to-br from-purple-800 via-indigo-900 to-black">
      <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 opacity-20 rounded-full filter blur-2xl animate-bounce"></div>

      <h1 className="text-6xl font-extrabold tracking-tight z-10">
        Hey, I&apos;m <span className="text-pink-400">Hassan</span>
      </h1>
      <p className="text-lg mt-4 max-w-xl text-center z-10">
        I build creative, intelligent, and immersive web experiences using AI, Next.js, and a splash of chaos.
      </p>

      <div className="flex gap-6 mt-8 z-10">
        <a href="#projects" className="px-6 py-2 bg-white text-black font-bold rounded-full shadow-lg hover:scale-105 transition">
          View Projects
        </a>
        <a href="#contact" className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
          Contact Me
        </a>
      </div>

      <div className="flex gap-4 mt-6 z-10">
        <a href="https://github.com/yourusername" target="_blank"><FaGithub size={24} /></a>
        <a href="https://linkedin.com/in/yourusername" target="_blank"><FaLinkedin size={24} /></a>
      </div>
    </section>
  );
}
