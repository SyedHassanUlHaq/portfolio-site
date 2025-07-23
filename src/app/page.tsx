import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import MouseParticles from "@/components/MouseParticles";

export default function Home() {
  return (
    <main className="bg-black text-white relative overflow-hidden">
      <MouseParticles />
      <SeoHead />
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
