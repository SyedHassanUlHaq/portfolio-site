import Link from "next/link";
import { site } from "../../content/site";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#capabilities", label: "What I build" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight text-ink">
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hidden rounded px-3 py-2 text-sm text-muted transition hover:text-ink sm:block">
              {n.label}
            </Link>
          ))}
          <a
            href={mailto("Project inquiry")}
            {...ev("cta-click", { where: "header" })}
            className="ml-1 inline-flex h-9 items-center rounded-md bg-accent px-3.5 text-sm font-medium text-accent-ink transition hover:brightness-110"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
