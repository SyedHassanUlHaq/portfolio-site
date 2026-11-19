import Link from "next/link";
import { site } from "../../content/site";
import { ev } from "@/lib/analytics";
import { book } from "@/lib/contact";
import { withBase } from "@/lib/url";
import ChapterNav from "./ChapterNav";

export const CHAPTERS = [
  { id: "solve", n: "01", label: "Services" },
  { id: "work", n: "02", label: "Work" },
  { id: "reviews", n: "03", label: "Reviews" },
  { id: "about", n: "04", label: "About" },
  { id: "faq", n: "05", label: "Q&A" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" prefetch={false} className="flex shrink-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/images/hassan-avatar.webp")} alt="" width={36} height={36} className="h-9 w-9 rounded-full border border-line object-cover" />
          <span className="font-display text-lg font-medium tracking-tight text-ink">{site.name}</span>
        </Link>
        <ChapterNav items={CHAPTERS} />
        <a
          href={book().href}
          {...(book().external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...ev("cta-click", { where: "header" })}
          className="inline-flex h-10 shrink-0 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg transition hover:bg-accent"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}
