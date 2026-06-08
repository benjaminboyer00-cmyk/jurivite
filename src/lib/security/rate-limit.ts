import { getRateLimitStore } from "@/lib/security/rate-limit-store";

export type RateLimitConfig = {
  /** Nombre max de requêtes par fenêtre */
  limit: number;
  /** Fenêtre en millisecondes */
  windowMs: number;
};

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number };

/** Limiteur : mémoire (mono-instance) ou Upstash si UPSTASH_REDIS_REST_* est défini. */
export async function checkRateLimit(
  key: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  return getRateLimitStore().consume(key, config);
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
  sign: { limit: 30, windowMs: 10 * 60 * 1000 },
} as const satisfies Record<string, RateLimitConfig>;
