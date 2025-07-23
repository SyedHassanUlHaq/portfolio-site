import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SeoHead from "@/components/SeoHead";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative bg-black text-white">
      <SeoHead />
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
