import { fetcher } from "../utils/fetcher";
import { parseRepo } from "../utils/projectUtils";
import useSWR from "swr";

// Custom hook to fetch GitHub repository statistics using the GitHub API.
export function useGithubStats(githubUrl) {
  const repo = parseRepo(githubUrl);
  const apiUrl = repo
    ? `https://api.github.com/repos/${repo.owner}/${repo.repo}`
    : null;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false
  });

  const stats = data
    ? {
        stars: data.stargazers_count ?? 0,
        forks: data.forks_count ?? 0,
        language: data.language,
        updated: data.pushed_at,
        description: data.description
      }
    : null;

  let status = "ok";
  if (isLoading || !repo) status = "loading";
  if (error) status = "error";

  return { stats, status };
}
