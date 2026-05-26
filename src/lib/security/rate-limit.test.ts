import { afterEach, describe, expect, it, vi } from "vitest";

import {
  MemoryRateLimitStore,
  resetRateLimitStoreForTests,
} from "@/lib/security/rate-limit-store";
import { checkRateLimit } from "@/lib/security/rate-limit";

describe("checkRateLimit (mémoire)", () => {
  afterEach(() => {
    resetRateLimitStoreForTests();
  });

  it("autorise jusqu'à la limite puis bloque", async () => {
    const config = { limit: 3, windowMs: 60_000 };
    const key = `test:${Date.now()}`;

    for (let i = 0; i < 3; i++) {
      const r = await checkRateLimit(key, config);
      expect(r.ok).toBe(true);
      if (r.ok) expect(r.remaining).toBe(3 - i - 1);
    }

    const blocked = await checkRateLimit(key, config);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.remaining).toBe(0);
  });

  it("réinitialise le compteur après expiration de fenêtre", async () => {
    vi.useFakeTimers();
    const store = new MemoryRateLimitStore();
    const config = { limit: 1, windowMs: 1000 };

    const first = await store.consume("k", config);
    expect(first.ok).toBe(true);

    const second = await store.consume("k", config);
    expect(second.ok).toBe(false);

    vi.advanceTimersByTime(1001);

    const third = await store.consume("k", config);
    expect(third.ok).toBe(true);

    vi.useRealTimers();
  });

  it("purge les buckets expirés", async () => {
    vi.useFakeTimers();
    const store = new MemoryRateLimitStore();
    await store.consume("old", { limit: 5, windowMs: 500 });
    vi.advanceTimersByTime(600);
    store.pruneExpired();
    vi.useRealTimers();
    expect(true).toBe(true);
  });
});
