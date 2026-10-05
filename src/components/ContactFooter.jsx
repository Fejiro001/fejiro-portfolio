import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "feather-icons-react";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="relative border-t border-border px-6 md:px-10 pt-20 md:pt-32 pb-10 bg-accent text-accent-foreground overflow-hidden">
      <div className="section-width">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-foreground/70 mb-6">
          06 — Let's Work Together
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-light tracking-tight leading-[0.9]"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}>
          Have a project
          <br />
          or opportunity?
        </motion.h2>

        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10">
          {/* Direct contact + socials */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground/60 mb-3">
                Direct
              </p>
              <a
                href="mailto:fejiroabere@gmail.com"
                className="inline-flex items-center gap-2 text-lg md:text-xl font-light hover:opacity-80 transition-opacity">
                <Mail className="h-5 w-5" />
                aberefejiro@gmail.com
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground/60 mb-3">
                Elsewhere
              </p>
              <div className="flex flex-col gap-3">
                {[
                  {
                    label: "GitHub",
                    href: "https://github.com/Fejiro001",
                    icon: Github
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/oghenefejiro-abere-487b08161/",
                    icon: Linkedin
                  },
                  {
                    label: "Frontend Mentor",
                    href: "https://www.frontendmentor.io/profile/Fejiro001",
                    icon: ArrowUpRight
                  }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between border-b border-accent-foreground/20 py-3 group">
                    <span className="font-mono text-sm uppercase tracking-[0.2em]">
                      {s.label}
                    </span>
                    <s.icon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-accent-foreground/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground/60">
            © {new Date().getFullYear()} Fejiro Abere
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground/60">
            Built with React · Tailwind CSS
          </p>
          <a
            href="#top"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground/60 hover:text-accent-foreground">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
