import { describe, expect, it, vi } from "vitest";

describe("withPdfConcurrency", () => {
  it("sérialise les tâches quand PDF_MAX_CONCURRENT=1", async () => {
    vi.resetModules();
    process.env.PDF_MAX_CONCURRENT = "1";
    const { withPdfConcurrency } = await import(
      "@/lib/security/pdf-concurrency"
    );

    const order: number[] = [];
    const delay = (ms: number, id: number) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          order.push(id);
          resolve();
        }, ms);
      });

    await Promise.all([
      withPdfConcurrency(() => delay(30, 1)),
      withPdfConcurrency(() => delay(10, 2)),
    ]);

    expect(order).toEqual([1, 2]);

    vi.resetModules();
    delete process.env.PDF_MAX_CONCURRENT;
  });
});
