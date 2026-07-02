import { NextResponse } from "next/server";
import { fetchGithubStats } from "@/lib/github";

// Revalidate this route's response at most once per hour.
export const revalidate = 3600;

export async function GET() {
  const stats = await fetchGithubStats();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
