import type { GithubStats } from "@/types/project";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      followers { totalCount }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        totalCount
        nodes { primaryLanguage { name } }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

type ContributionDay = { date: string; contributionCount: number };

/**
 * Fetches live stats from GitHub's GraphQL API (needed for the contribution
 * calendar — REST doesn't expose it) using a server-side token. Falls back
 * to realistic mock data if GITHUB_TOKEN is missing or the request fails,
 * so the section never breaks the page.
 */
export async function fetchGithubStats(): Promise<GithubStats> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "anikabhutani";

  if (!token) return mockStats(username);

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return mockStats(username);

    const json = await res.json();
    const user = json?.data?.user;
    if (!user) return mockStats(username);

    const langCounts: Record<string, number> = {};
    user.repositories.nodes.forEach((r: { primaryLanguage: { name: string } | null }) => {
      const lang = r.primaryLanguage?.name;
      if (lang) langCounts[lang] = (langCounts[lang] || 0) + 1;
    });
    const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const topLanguages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }));

    const days: ContributionDay[] = user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (w: { contributionDays: ContributionDay[] }) => w.contributionDays
    );

    return {
      username,
      totalRepos: user.repositories.totalCount,
      followers: user.followers.totalCount,
      currentStreak: computeCurrentStreak(days),
      topLanguages,
      contributionsLastYear: user.contributionsCollection.contributionCalendar.totalContributions,
      cached: false,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return mockStats(username);
  }
}

/**
 * Walks the contribution calendar backwards from today, counting consecutive
 * days with at least one contribution. Today itself doesn't break the streak
 * if it's still at zero — the day isn't over yet.
 */
function computeCurrentStreak(days: ContributionDay[]): number {
  if (!days.length) return 0;
  const sorted = [...days].sort((a, b) => (a.date < b.date ? 1 : -1)); // most recent first

  let streak = 0;
  for (let i = 0; i < sorted.length; i++) {
    const { contributionCount } = sorted[i];
    if (contributionCount > 0) {
      streak++;
    } else if (i === 0) {
      continue; // today, still in progress
    } else {
      break;
    }
  }
  return streak;
}

function mockStats(username: string): GithubStats {
  return {
    username,
    totalRepos: 12,
    followers: 8,
    currentStreak: 6,
    topLanguages: [
      { name: "Python", pct: 48 },
      { name: "TypeScript", pct: 22 },
      { name: "Java", pct: 15 },
      { name: "JavaScript", pct: 10 },
      { name: "R", pct: 5 },
    ],
    contributionsLastYear: 412,
    cached: true,
    fetchedAt: new Date().toISOString(),
  };
}
