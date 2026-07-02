"use client";

import { useEffect, useState } from "react";
import type { GithubStats as GithubStatsType } from "@/types/project";

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github/stats")
      .then((r) => r.json())
      .then((data: GithubStatsType) => {
        if (!cancelled) setStats(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-white border border-border rounded-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-[0.75rem] tracking-[0.1em] uppercase text-sky font-medium">
          Proof of work
        </div>
        {stats && (
          <a
            href={`https://github.com/${stats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.78rem] text-mid no-underline font-medium"
          >
            @{stats.username} ↗
          </a>
        )}
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-4 bg-off rounded w-2/3" />
          <div className="h-4 bg-off rounded w-1/2" />
          <div className="h-4 bg-off rounded w-3/4" />
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <Stat label="Repositories" value={stats.totalRepos} />
            <Stat label="Followers" value={stats.followers} />
            <Stat label="Day streak" value={stats.currentStreak} />
            <Stat label="Contributions / yr" value={stats.contributionsLastYear} />
          </div>
          <div className="text-[0.72rem] tracking-[0.1em] uppercase text-sky font-medium mb-2">
            Language breakdown
          </div>
          <div className="flex flex-col gap-2">
            {stats.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-3">
                <span className="text-[0.8rem] text-muted w-24 flex-shrink-0 font-mono">{lang.name}</span>
                <div className="flex-1 h-1.5 bg-off rounded-full overflow-hidden">
                  <div
                    className="h-full bg-mid rounded-full"
                    style={{ width: `${lang.pct}%` }}
                  />
                </div>
                <span className="text-[0.75rem] text-light w-9 text-right">{lang.pct}%</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-[0.85rem] text-light italic">Couldn&apos;t load GitHub stats right now.</p>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-serif text-2xl text-navy">{value}</div>
      <div className="text-[0.72rem] text-light">{label}</div>
    </div>
  );
}
