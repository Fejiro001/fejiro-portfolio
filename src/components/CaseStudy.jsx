import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "feather-icons-react";
import { Link } from "react-router-dom";

export default function CaseStudy({ project, index }) {
  const reversed = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-border py-10 md:py-16">
      <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
        {/* Meta column */}
        <div
          className={`md:col-span-5 ${
            reversed ? "md:order-2 md:col-start-8" : ""
          }`}>
          <div className="flex items-baseline gap-4 mb-5">
            <span className="font-mono text-xs text-accent">{project.num}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {project.category}
            </span>
            {project.award && (
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-2 py-0.5">
                ★ {project.award}
              </span>
            )}
          </div>

          <Link to={`/work/${project.slug}`}>
            <h3
              className="font-display font-light tracking-tight leading-none mb-6 hover:text-accent transition-colors"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              {project.title}
            </h3>
          </Link>

          <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6 max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-2 mb-8 font-mono text-xs text-foreground/70">
            {project.tech.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {t}
                {i < project.tech.length - 1 && (
                  <span className="text-border">·</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link
              to={`/work/${project.slug}`}
              className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors">
              View Case Study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
              Code
            </a>
          </div>
        </div>

        {/* Image column */}
        <div
          className={`md:col-span-7 ${reversed ? "md:order-1" : "md:col-start-7"}`}>
          <Link
            to={`/work/${project.slug}`}
            className="relative block overflow-hidden border border-border group/img">
            <img
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              className="w-full aspect-[16/10] object-cover transition-transform duration-[500ms] ease-out group-hover/img:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-background/10 group-hover/img:bg-background/0 transition-colors duration-500" />
            <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent px-2 py-1 rounded-md bg-foreground/70 font-bold">
              {project.num} / {project.title}
            </div>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
