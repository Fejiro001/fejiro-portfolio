import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "feather-icons-react";

const stack = ["React", "JavaScript", "C#", ".NET", "Tailwind CSS"];

const lines = ["FEJIRO", "ABERE"];

const letterParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } }
};
const letterChild = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-end pt-24 pb-12 px-6 md:px-10 grid-lines overflow-hidden">
      {/* Decorative oversized index */}
      <div className="absolute top-28 right-6 md:right-10 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        01 — Index
      </div>

      <div className="mx-auto max-w-[1600px] w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6 md:mb-10">
          Frontend Developer
        </motion.p>

        <motion.h1
          className="font-display font-light leading-[0.88] tracking-tight text-foreground"
          style={{ fontSize: "clamp(3.5rem, 13vw, 12rem)" }}>
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="flex"
                variants={letterParent}
                initial="hidden"
                animate="visible">
                {line.split("").map((ch, i) => (
                  <span key={i} className="overflow-hidden">
                    <motion.span className="block" variants={letterChild}>
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="mt-8 md:mt-12 grid md:grid-cols-12 gap-6 md:gap-10 items-end">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-6 lg:col-span-5 text-lg md:text-xl leading-relaxed text-muted-foreground">
            Building thoughtful digital experiences at the intersection of
            high-fidelity aesthetics and performant logic — with React,
            TypeScript, and modern web technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="md:col-span-5 md:col-start-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 h-12 bg-foreground text-background font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-colors">
              View Work
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 h-12 border border-border font-mono text-xs uppercase tracking-[0.2em] hover:border-foreground transition-colors">
              Let's Connect
            </a>
            <div className="flex items-center gap-4 ml-auto md:ml-0">
              <a
                href="https://github.com/Fejiro001"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/oghenefejiro-abere-487b08161/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
          {stack.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              <span className="text-foreground/60">{s}</span>
              {i < stack.length - 1 && <span className="text-border">·</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
