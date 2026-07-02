/**
 * Minimal in-memory rate limiter, good enough for a single-instance Vercel
 * deployment on the Hobby/Pro plan. Because serverless functions can spin up
 * multiple instances, this is a best-effort layer, not a hard guarantee —
 * if you outgrow it, swap this module for Upstash Redis's rate-limit SDK
 * without touching any calling code (same function signature).
 */
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 3;

const hits = new Map<string, number[]>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(identifier) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(identifier, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(identifier, timestamps);
  return false;
}
