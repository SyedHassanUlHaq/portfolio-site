export function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12.5px] leading-5 ${
        tone === "accent" ? "border-accent/30 bg-accent-soft text-accent" : "border-line bg-surface text-muted"
      }`}
    >
      {children}
    </span>
  );
}
