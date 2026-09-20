import { motion } from "framer-motion";
import img from "../assets/profile.webp";

const PROFILE_IMAGE = img;

const achievements = [
  {
    num: "01",
    org: "Skills Manitoba",
    title: "2026 Web Design & Development Competition",
    result: "Winner",
    detail:
      "Built a full 7-page website from scratch in 5.25 hours under real-time constraints."
  },
  {
    num: "02",
    org: "Frontend Mentor",
    title: "Weather Now",
    result: "Challenge Winner",
    detail:
      "Recognized for real-time data integration and interactive UI experiences."
  }
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-10 py-20 md:py-32 border-t border-border">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Left: label + portrait */}
          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              03 — About
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[360px] overflow-hidden border border-border">
              <img
                src={PROFILE_IMAGE}
                alt="Portrait of Fejiro Abere"
                className="w-full "
              />
            </motion.div>
          </div>

          {/* Center: story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-8">
            <p
              className="font-display font-light leading-[1.15] tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}>
              I'm a frontend developer focused on building fast, scalable, and
              user-centered web applications. I build clean, performant
              interfaces and enjoy solving real-world problems through
              thoughtful frontend architecture and design.
            </p>

            <div className="mt-10 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground space-y-4">
              <p>
                Currently expanding into TypeScript and scalable frontend
                systems, open to building impactful digital products with modern
                engineering teams.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <div className="mt-16 md:mt-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-8">
            Selected Achievements
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {achievements.map((a) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="bg-background p-8 md:p-10 flex flex-col gap-4 group hover:bg-secondary transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {a.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-2 py-1">
                    {a.result}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {a.org}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-light tracking-tight group-hover:text-accent transition-colors">
                    {a.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mt-auto">
                  {a.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
