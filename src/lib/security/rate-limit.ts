type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitConfig = {
  /** Nombre max de requêtes par fenêtre */
  limit: number;
  /** Fenêtre en millisecondes */
  windowMs: number;
};

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number };

/** Limiteur en mémoire (MVP). Pour multi-instances : Redis / Upstash. */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig,
): RateLimitResult {
  const now = Date.now();
  let bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + config.windowMs };
    buckets.set(key, bucket);
  }

  if (bucket.count >= config.limit) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return {
    ok: true,
    remaining: config.limit - bucket.count,
    resetAt: bucket.resetAt,
  };
}

export function rateLimitResponseHeaders(result: RateLimitResult): HeadersInit {
  const reset = "resetAt" in result ? result.resetAt : Date.now();
  return {
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(reset / 1000)),
  };
}

/** Présets alignés sur l'audit sécurité */
export const RATE_LIMITS = {
  auth: { limit: 10, windowMs: 15 * 60 * 1000 },
  register: { limit: 5, windowMs: 60 * 60 * 1000 },
  pdf: { limit: 30, windowMs: 60 * 1000 },
  checkout: { limit: 10, windowMs: 10 * 60 * 1000 },
  apiKey: { limit: 20, windowMs: 60 * 1000 },
} as const satisfies Record<string, RateLimitConfig>;

/** Réduit la fuite mémoire sur process long-running */
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now >= bucket.resetAt) buckets.delete(key);
    }
  }, CLEANUP_INTERVAL_MS).unref?.();
}
