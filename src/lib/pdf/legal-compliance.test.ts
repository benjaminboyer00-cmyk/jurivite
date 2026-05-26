import { describe, expect, it } from "vitest";

import { enrichSlugSpecificData } from "@/lib/pdf/legal";
import { minimalPayloadForSlug } from "@/test/fixtures/pdf-payloads";
import { validatePdfPayload } from "@/lib/schemas/pdf-payloads";
import { documentSlugs } from "@/lib/documents/registry";

describe("enrichSlugSpecificData — CGV métier", () => {
  it("injecte les clauses pour un nicheSlug valide", () => {
    const data = {
      ...minimalPayloadForSlug("cgv"),
      nicheSlug: "sophrologue",
    };
    const enriched = enrichSlugSpecificData("cgv", data);
    expect(String(enriched.industryClausesHtml ?? "")).toContain("acte médical");
  });

  it("ignore un nicheSlug invalide", () => {
    const data = {
      ...minimalPayloadForSlug("cgv"),
      nicheSlug: "metier-invente",
    };
    const enriched = enrichSlugSpecificData("cgv", data);
    expect(enriched.industryClausesHtml).toBeUndefined();
  });
});

describe("validatePdfPayload — nicheSlug CGV", () => {
  it("rejette un slug métier inconnu", () => {
    const payload = {
      ...minimalPayloadForSlug("cgv"),
      nicheSlug: "pas-un-metier",
    };
    const result = validatePdfPayload("cgv", payload);
    expect(result.success).toBe(false);
  });

  it("accepte un slug métier valide", () => {
    const payload = {
      ...minimalPayloadForSlug("cgv"),
      nicheSlug: "photographe",
    };
    const result = validatePdfPayload("cgv", payload);
    expect(result.success).toBe(true);
  });
});

describe("référentiel conformité — 10 documents", () => {
  it("chaque slug du catalogue valide un payload minimal", () => {
    for (const slug of documentSlugs) {
      const result = validatePdfPayload(slug, minimalPayloadForSlug(slug));
      expect(result.success, slug).toBe(true);
    }
  });
});
