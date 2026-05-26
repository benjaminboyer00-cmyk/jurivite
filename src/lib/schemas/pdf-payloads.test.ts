import { describe, expect, it } from "vitest";

import { documentSlugs } from "@/lib/documents/registry";
import { validatePdfPayload } from "@/lib/schemas/pdf-payloads";
import {
  allDocumentSlugFixtures,
  minimalPayloadForSlug,
} from "@/test/fixtures/pdf-payloads";

describe("validatePdfPayload", () => {
  it("rejette un slug inconnu via isDocumentSlug en amont", () => {
    const result = validatePdfPayload("cgv", { companyName: "" });
    expect(result.success).toBe(false);
  });

  it.each(allDocumentSlugFixtures())(
    "valide le payload minimal pour %s",
    (slug) => {
      const payload = minimalPayloadForSlug(slug);
      const result = validatePdfPayload(slug, payload);
      expect(result.success, JSON.stringify(result)).toBe(true);
    },
  );

  it("couvre les 10 slugs du catalogue", () => {
    expect(documentSlugs).toHaveLength(10);
    expect(allDocumentSlugFixtures()).toHaveLength(10);
  });
});
