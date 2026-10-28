import { site } from "../../content/site";
import { Github, Linkedin } from "./Icons";

export default function Footer() {
  const c = site.contact;
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.role}
        </p>
        <div className="flex items-center gap-5">
          {c.upwork && <a className="hover:text-ink" href={c.upwork} target="_blank" rel="noopener noreferrer">Upwork</a>}
          <a className="hover:text-ink" href={`mailto:${c.email}`}>{c.email}</a>
          <a aria-label="GitHub" className="hover:text-ink" href={c.github} target="_blank" rel="noopener noreferrer"><Github /></a>
          <a aria-label="LinkedIn" className="hover:text-ink" href={c.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /></a>
        </div>
      </div>
    </footer>
  );
}
