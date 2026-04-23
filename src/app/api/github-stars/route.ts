import { NextResponse } from "next/server";

const defaultOwner = "ameyalambat128";
const defaultRepo = "swiftui-skills";
const cacheControlHeader = "s-maxage=3600, stale-while-revalidate=300";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner =
    searchParams.get("username") || searchParams.get("owner") || defaultOwner;
  const repo = searchParams.get("repo") || defaultRepo;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { stars: 0 },
        { status: 200, headers: { "Cache-Control": cacheControlHeader } },
      );
    }

    const data = (await response.json()) as { stargazers_count?: number };
    const stars =
      typeof data.stargazers_count === "number" ? data.stargazers_count : 0;

    return NextResponse.json(
      { stars },
      { status: 200, headers: { "Cache-Control": cacheControlHeader } },
    );
  } catch {
    return NextResponse.json(
      { stars: 0 },
      { status: 200, headers: { "Cache-Control": cacheControlHeader } },
    );
  }
}
