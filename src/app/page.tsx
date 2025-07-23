import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";
import MouseParticles from "@/components/MouseParticles";
import ParallaxWrapper from "@/components/ParallaxWrapper";

export default function Home() {
  return (
    <main className="bg-black text-white relative overflow-hidden">
      <ParallaxWrapper>
        <MouseParticles />
        <SeoHead />
        <Navbar />
        <Hero />
        <Projects />
        <About />
        <Contact />
      </ParallaxWrapper>
    </main>
  );
}
