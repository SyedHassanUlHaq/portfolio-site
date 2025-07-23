import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SeoHead from "@/components/SeoHead";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <SeoHead />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
