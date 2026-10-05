import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Star,
  GitBranch,
  Clock,
  Code
} from "feather-icons-react";
import CodeBlock from "../components/CodeBlock";
import {
  getProjectBySlug,
  getAdjacentProjects,
  parseRepo
} from "../data/projects";

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border border-border px-5 py-4">
      <Icon className="h-4 w-4 text-accent" />
      <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-light text-foreground">{value}</span>
      </div>
    </div>
  );
}

function useRepoStats(githubUrl) {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    let cancelled = false;
    const repo = parseRepo(githubUrl);
    if (!repo) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}`)
      .then((res) => {
        if (!res.ok) throw new Error("rate-limited");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setStats({
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          language: data.language,
          updated: data.pushed_at,
          description: data.description
        });
        setStatus("ok");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [githubUrl]);

  return { stats, status };
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return "—";
  }
}

export default function WorkDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const { stats, status } = useRepoStats(project?.github);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          404 — Not Found
        </p>
        <h1 className="font-display text-4xl font-light mb-8">
          That project doesn't exist.
        </h1>
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <ArrowLeft className="h-4 w-4" />
          Back to Selected Work
        </Link>
      </div>
    );
  }

  const { prev, next } = getAdjacentProjects(slug);
  const n = project.narrative;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <main className="pt-24">
        {/* Header */}
        <section className="px-6 md:px-10 pb-12 md:pb-16">
          <div className="mx-auto max-w-[1400px]">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mb-10">
              <ArrowLeft className="h-4 w-4" />
              Back to Selected Work
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-accent">
                {project.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {project.category}
              </span>
              {project.award && (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 px-2 py-0.5">
                  ★ {project.award}
                </span>
              )}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display font-light leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}>
              {project.title}
            </motion.h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 h-12 bg-foreground text-background font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-colors">
                View Live Project
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 h-12 border border-border font-mono text-xs uppercase tracking-[0.2em] hover:border-foreground transition-colors">
                <Github className="h-4 w-4" />
                Repository
              </a>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="border border-border overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} — ${project.category}`}
                className="w-full aspect-[16/9] object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Meta + repo stats */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-border mt-16 md:mt-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-3">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
                  Project Details
                </p>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Role
                    </dt>
                    <dd className="text-sm font-light">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Year
                    </dt>
                    <dd className="text-sm font-light">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Stack
                    </dt>
                    <dd className="text-sm font-light">
                      {project.tech.join(" · ")}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="md:col-span-9">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
                  Live Repository Stats
                </p>
                {status === "loading" && (
                  <div className="flex flex-wrap gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-[72px] w-40 border border-border animate-pulse bg-secondary"
                      />
                    ))}
                  </div>
                )}
                {status === "ok" && stats && (
                  <div className="flex flex-wrap gap-3">
                    <StatPill icon={Star} label="Stars" value={stats.stars} />
                    <StatPill
                      icon={GitBranch}
                      label="Forks"
                      value={stats.forks}
                    />
                    <StatPill
                      icon={Code}
                      label="Language"
                      value={stats.language ?? "—"}
                    />
                    <StatPill
                      icon={Clock}
                      label="Last Push"
                      value={formatDate(stats.updated)}
                    />
                  </div>
                )}
                {status === "error" && (
                  <p className="font-mono text-xs text-muted-foreground border border-border px-5 py-4 max-w-md">
                    Live stats temporarily unavailable (GitHub rate limit).{" "}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-4">
                      View repo on GitHub →
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Narrative */}
        <section className="px-6 md:px-10 py-16 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-3">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Case Study
                </p>
              </div>
              <div className="md:col-span-9 space-y-16">
                {[
                  { label: "The Problem", text: n.problem },
                  { label: "The Approach", text: n.approach }
                ].map((sec) => (
                  <motion.div
                    key={sec.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
                      {sec.label}
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed text-foreground/90 max-w-3xl">
                      {sec.text}
                    </p>
                  </motion.div>
                ))}

                {/* Technical hurdles */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-8">
                    Technical Hurdles
                  </p>
                  <div className="grid gap-px bg-border border border-border">
                    {n.hurdles.map((h, i) => (
                      <div
                        key={h.title}
                        className="bg-background p-6 md:p-8 flex gap-6">
                        <span className="font-mono text-xs text-muted-foreground shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-display text-xl md:text-2xl font-light mb-2">
                            {h.title}
                          </h3>
                          <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
                            {h.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
                    The Solution
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-foreground/90 max-w-3xl">
                    {n.solution}
                  </p>
                </motion.div>

                {/* Code snippets */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-8">
                    Code Excerpts
                  </p>
                  <div className="space-y-6">
                    {n.snippets.map((s) => (
                      <CodeBlock
                        key={s.label}
                        label={s.label}
                        language={s.language}
                        code={s.code}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-t border-border">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
              {prev ? (
                <Link
                  to={`/work/${prev.slug}`}
                  className="group bg-background p-8 md:p-10 flex flex-col gap-3 hover:bg-secondary transition-colors">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    ← Previous Project
                  </span>
                  <span className="font-display text-2xl md:text-3xl font-light group-hover:text-accent transition-colors">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div className="bg-background p-8 md:p-10 flex items-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Start of selected work
                  </span>
                </div>
              )}
              {next ? (
                <Link
                  to={`/work/${next.slug}`}
                  className="group bg-background p-8 md:p-10 flex flex-col gap-3 items-end text-right hover:bg-secondary transition-colors">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Next Project →
                  </span>
                  <span className="font-display text-2xl md:text-3xl font-light group-hover:text-accent transition-colors">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div className="bg-background p-8 md:p-10 flex items-center justify-end">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    End of selected work
                  </span>
                </div>
              )}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                to="/#work"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Selected Work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
