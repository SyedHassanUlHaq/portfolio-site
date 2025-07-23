import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import MouseParticles from "@/components/MouseParticles";
import ParallaxWrapper from "@/components/ParallaxWrapper";
import GSoCSection from "@/components/GSoCSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden min-h-screen bg-[var(--background)] text-[var(--foreground)] font-mono">
      <ParallaxWrapper>
        <MouseParticles />
        <SeoHead />
        <Navbar />
        <Hero />
        <GSoCSection />
        <Projects />
        <About />
        <Contact />
      </ParallaxWrapper>
    </main>
  );
}
