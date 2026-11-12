import Link from "next/link";
import { site } from "../../content/site";
import { ev } from "@/lib/analytics";
import { mailto } from "@/lib/contact";
import { withBase } from "@/lib/url";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/images/hassan-avatar.webp")} alt="" width={36} height={36} className="h-9 w-9 rounded-full border border-line object-cover" />
          <span className="font-display text-lg font-medium tracking-tight text-ink">{site.name}</span>
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
            className="ml-1 inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg transition hover:bg-accent"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
