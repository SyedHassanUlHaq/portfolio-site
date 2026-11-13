import Link from "next/link";
import { NEEDS } from "../../content/taxonomy";
import { site } from "../../content/site";
import { getListedProjects } from "@/lib/projects";
import { Github, Linkedin } from "./Icons";

export default function Footer() {
  const c = site.contact;
  const projects = getListedProjects();
  const needs = Object.entries(NEEDS).filter(([id]) => projects.some((p) => p.needs.includes(id)));
  const link = "text-muted transition hover:text-ink";
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-sm sm:px-6 md:grid-cols-[1.2fr_1.4fr_1fr]">
        <div>
          <p className="font-display text-xl font-medium text-ink">{site.name}</p>
          <p className="mt-1 text-muted">{site.role}</p>
          <div className="mt-4 flex items-center gap-4 text-muted">
            <a aria-label="GitHub" className="hover:text-ink" href={c.github} target="_blank" rel="noopener noreferrer"><Github /></a>
            <a aria-label="LinkedIn" className="hover:text-ink" href={c.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /></a>
          </div>
        </div>
        <nav aria-label="What I build">
          <p className="text-xs font-semibold uppercase tracking-widest text-faint">What I build</p>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {needs.map(([id, n]) => (
              <li key={id}><Link href={`/solutions/${id}`} className={link}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Explore">
          <p className="text-xs font-semibold uppercase tracking-widest text-faint">Explore</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/projects" className={link}>All projects</Link></li>
            <li><Link href="/#work" prefetch={false} className={link}>Search my work</Link></li>
            <li><Link href="/#about" prefetch={false} className={link}>About</Link></li>
            {c.upwork && <li><a className={link} href={c.upwork} target="_blank" rel="noopener noreferrer">Upwork profile</a></li>}
            <li><a className={link} href={`mailto:${c.email}`}>{c.email}</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-faint sm:px-6">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
