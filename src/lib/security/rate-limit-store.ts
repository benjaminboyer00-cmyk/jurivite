import type { RateLimitConfig, RateLimitResult } from "@/lib/security/rate-limit";

export interface RateLimitStore {
  consume(key: string, config: RateLimitConfig): Promise<RateLimitResult>;
}

type Bucket = {
  count: number;
  resetAt: number;
};

export class MemoryRateLimitStore implements RateLimitStore {
  private readonly buckets = new Map<string, Bucket>();

  consume(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket || now >= bucket.resetAt) {
      bucket = { count: 0, resetAt: now + config.windowMs };
      this.buckets.set(key, bucket);
    }

    if (bucket.count >= config.limit) {
      return Promise.resolve({
        ok: false,
        remaining: 0,
        resetAt: bucket.resetAt,
      });
    }

    bucket.count += 1;
    return Promise.resolve({
      ok: true,
      remaining: config.limit - bucket.count,
      resetAt: bucket.resetAt,
    });
  }

  /** Tests uniquement */
  clear(): void {
    this.buckets.clear();
  }

  pruneExpired(): void {
    const now = Date.now();
    for (const [key, bucket] of this.buckets) {
      if (now >= bucket.resetAt) this.buckets.delete(key);
    }
  }
}

let memorySingleton: MemoryRateLimitStore | null = null;

function getMemoryStore(): MemoryRateLimitStore {
  if (!memorySingleton) {
    memorySingleton = new MemoryRateLimitStore();
    if (typeof setInterval !== "undefined") {
      setInterval(() => memorySingleton?.pruneExpired(), 10 * 60 * 1000).unref?.();
    }
  }
  return memorySingleton;
}

type UpstashLimiter = {
  limit: (key: string) => Promise<{
    success: boolean;
    remaining: number;
    reset: number;
  }>;
};

let upstashStore: RateLimitStore | null = null;

function createUpstashStore(): RateLimitStore | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const limiterCache = new Map<string, UpstashLimiter>();

  return {
    async consume(key, config) {
      const cacheKey = `${config.limit}:${config.windowMs}`;
      let limiter = limiterCache.get(cacheKey);

      if (!limiter) {
        const { Ratelimit } = await import("@upstash/ratelimit");
        const { Redis } = await import("@upstash/redis");
        const redis = new Redis({ url, token });
        limiter = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(
            config.limit,
            `${config.windowMs} ms`,
          ),
          prefix: "jurivite:rl",
        });
        limiterCache.set(cacheKey, limiter);
      }

      const result = await limiter.limit(key);
      const resetAt = result.reset;

      if (!result.success) {
        return { ok: false, remaining: 0, resetAt };
      }

      return {
        ok: true,
        remaining: result.remaining,
        resetAt,
      };
    },
  };
}

export function getRateLimitStore(): RateLimitStore {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    if (!upstashStore) {
      const store = createUpstashStore();
      if (!store) {
        throw new Error(
          "UPSTASH_REDIS_REST_* défini mais initialisation Upstash impossible",
        );
      }
      upstashStore = store;
    }
    return upstashStore;
  }
  return getMemoryStore();
}

/** Réinitialise le store mémoire entre les tests */
export function resetRateLimitStoreForTests(): void {
  memorySingleton?.clear();
  upstashStore = null;
}
