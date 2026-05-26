import { beforeEach, describe, expect, it, vi } from "vitest";

import { generateDocument } from "@/lib/pdf/document-service";
import { minimalPayloadForSlug } from "@/test/fixtures/pdf-payloads";

vi.mock("@/lib/db/usage", () => ({
  canGeneratePdf: vi.fn().mockResolvedValue({ allowed: true }),
}));

vi.mock("@/lib/pdf/generate", () => ({
  generatePdfBuffer: vi.fn().mockResolvedValue(Buffer.from("%PDF-1.4 mock")),
}));

vi.mock("@/db", () => ({
  db: null,
}));

describe("generateDocument", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejette un slug inconnu", async () => {
    const result = await generateDocument({
      slug: "inconnu",
      data: {},
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(400);
  });

  it("génère un PDF pour chaque slug avec mock Puppeteer", async () => {
    const { generatePdfBuffer } = await import("@/lib/pdf/generate");

    for (const slug of [
      "cgv",
      "mentions-legales",
      "facture",
    ] as const) {
      const result = await generateDocument({
        slug,
        data: minimalPayloadForSlug(slug),
        plan: "business",
      });
      expect(result.ok, slug).toBe(true);
    }

    expect(generatePdfBuffer).toHaveBeenCalled();
  });

  it("renvoie 400 si Zod échoue", async () => {
    const result = await generateDocument({
      slug: "cgv",
      data: { companyName: "" },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(400);
  });
});
