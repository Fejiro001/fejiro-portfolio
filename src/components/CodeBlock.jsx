export default function CodeBlock({ label, language, code }) {
  return (
    <div className="border border-border">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-5 md:p-6 bg-background">
        <code className="font-mono text-xs md:text-sm leading-relaxed text-foreground/80">
          {code}
        </code>
      </pre>
    </div>
  );
}
