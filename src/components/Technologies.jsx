import { motion } from "framer-motion";

const groups = [
  {
    label: "Frontend",
    items: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"]
  },
  {
    label: "Backend",
    items: ["C#", ".NET", "SQL", "Laravel", "xUnit", "PHP", "REST APIs"]
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Figma", "Vite"]
  }
];

const exploring = ["TypeScript", "Next.js", "Scalable Frontend Architecture", "AWS"];

export default function Technologies() {
  return (
    <section className="section-block border-top">
      <div className="section-width">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              04 — Technologies
            </p>
          </div>

          <div className="md:col-span-9">
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {groups.map((g) => (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-background p-8 md:p-10">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
                    {g.label}
                  </h3>
                  <ul className="space-y-3">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="text-lg md:text-xl font-light text-foreground/90 hover:text-accent transition-colors cursor-default">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border-t border-border pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">
                Currently exploring
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-foreground/70">
                {exploring.map((e, i) => (
                  <span key={e} className="flex items-center gap-3">
                    <span className="text-accent">→</span>
                    {e}
                    {i < exploring.length - 1 && (
                      <span className="text-border">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
