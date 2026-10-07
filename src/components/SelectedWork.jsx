import { projects } from "../data/projects";
import CaseStudy from "./CaseStudy";

export default function SelectedWork() {
  return (
    <section id="work" className="section-block">
      <div className="section-width">
        <div className="flex items-end justify-between mb-12 md:mb-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              02 — Selected Work
            </p>
            <h2
              className="font-display font-light tracking-tight leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Case Studies
            </h2>
          </div>
          <span className="hidden md:block font-mono text-xs text-muted-foreground">
            {projects.length} Projects
          </span>
        </div>

        <div>
          {projects.map((p, i) => (
            <CaseStudy key={p.num} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
