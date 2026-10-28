export function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[12px] leading-5 ${
        tone === "accent" ? "border-accent/30 bg-accent/10 text-accent" : "border-line bg-surface text-muted"
      }`}
    >
      {children}
    </span>
  );
}
