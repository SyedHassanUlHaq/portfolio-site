import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="font-display text-4xl font-medium text-ink">That page doesn&apos;t exist.</h1>
      <p className="mt-3 text-muted">The project link may have changed. Everything is listed on the homepage.</p>
      <Link href="/#work" className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-6 font-medium text-accent-ink">Browse projects</Link>
    </div>
  );
}
