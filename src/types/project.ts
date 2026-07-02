export type Project = {
  key: string;
  title: string;
  award: string | null;
  stack: string[];
  github: string | null;
  overview: string;
  details: string[];
  image: string | null;
  imageAlt: string;
  snippet: string | null;
};

export type ExperienceItem = {
  date: string;
  badge: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  tech: string[];
};

export type ReadingItem = {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  progress_pct: number;
  takeaway: string;
};

export type GithubStats = {
  username: string;
  totalRepos: number;
  followers: number;
  currentStreak: number;
  topLanguages: { name: string; pct: number }[];
  contributionsLastYear: number;
  cached: boolean;
  fetchedAt: string;
};
