import { projects } from "../data/projects";

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug) {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null
  };
}

// Parse owner/repo from a GitHub URL for the REST API.
export function parseRepo(githubUrl) {
  const match = githubUrl?.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

// Format an ISO date string to a human-readable format (e.g., "Jan 1, 2023").
export function formatDate(iso) {
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