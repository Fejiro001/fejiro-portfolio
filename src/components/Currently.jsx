import { motion } from "framer-motion";

const items = [
  {
    label: "Studying",
    text: "Software Development at MITT."
  },
  {
    label: "Building",
    text: "With React and .NET."
  },
  {
    label: "Exploring",
    text: "TypeScript and scalable frontend architecture."
  },
  {
    label: "Based in",
    text: "Winnipeg, Canada."
  }
];

export default function Currently() {
  return (
    <section className="relative px-6 md:px-10 py-20 md:py-32 border-t border-border grid-lines">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              05 — Currently
            </p>
            <h2
              className="font-display font-light tracking-tight leading-none"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              Now
            </h2>
          </div>

          <div className="md:col-span-9 relative">
            {/* Vertical pulse line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border md:left-1/2" />
            <ul className="space-y-10 md:space-y-16">
              {items.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative pl-8 md:pl-0 ${
                    i % 2 === 0 ? "md:pr-[52%] md:text-right" : "md:pl-[52%]"
                  }`}>
                  {/* Node */}
                  <span
                    className={`absolute top-2 w-2.5 h-2.5 rounded-full bg-accent left-0 md:left-1/2 -translate-x-1/2 ring-4 ring-background ${
                      i % 2 === 0
                        ? "md:-translate-x-1/2"
                        : "md:-translate-x-1/2"
                    }`}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-2">
                    {item.label}
                  </p>
                  <p className="text-lg md:text-2xl font-light leading-snug text-foreground">
                    {item.text}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
