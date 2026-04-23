"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GitHubIcon, StarIcon } from "@/components/icons";

async function fetchGitHubStars(username: string, repo: string) {
  const response = await fetch(
    `/api/github-stars?username=${username}&repo=${repo}`,
  );
  const data = (await response.json()) as { stars: number };
  return data.stars;
}

function GitHubStars({ username, repo }: { username: string; repo: string }) {
  const { data: stars } = useQuery({
    queryKey: ["github-stars", username, repo],
    queryFn: () => fetchGitHubStars(username, repo),
    staleTime: 5 * 60 * 1000,
  });

  if (stars === undefined) return null;

  return (
    <Link
      href={`https://github.com/${username}/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-1.5 text-sm text-gray-400 hover:text-white transition-colors"
    >
      <GitHubIcon size={18} />
      <StarIcon size={14} className="text-yellow-500" />
      <span>{stars.toLocaleString()}</span>
    </Link>
  );
}

export { GitHubStars };
