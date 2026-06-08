import { describe, expect, it } from "vitest";

import {
  searchAllModels,
  searchCatalogModels,
} from "@/lib/documents/model-search";

describe("searchCatalogModels", () => {
  it("trouve le contrat de prestation pour « contrat »", () => {
    const hits = searchCatalogModels("contrat", 5);
    const titles = hits.map((h) => h.title.toLowerCase());
    expect(titles.some((t) => t.includes("contrat"))).toBe(true);
    expect(hits[0]?.href).toMatch(/contrat/);
  });

  it("trouve devis et facture", () => {
    expect(searchCatalogModels("devis", 1)[0]?.href).toBe("/generate/devis");
    expect(searchCatalogModels("facture", 1)[0]?.href).toBe("/generate/facture");
  });

  it("trouve la landing contrat freelance", () => {
    const hit = searchCatalogModels("contrat freelance", 3).find((h) =>
      h.href.includes("contrat-freelance"),
    );
    expect(hit).toBeDefined();
  });

  it("priorise contrat-freelance-norme pour « contrat freelance norme »", () => {
    const hits = searchCatalogModels("contrat freelance norme", 5);
    expect(hits[0]?.href).toBe("/generate/contrat-freelance-norme");
  });
});

describe("searchAllModels", () => {
  it("priorise les modèles juridiques avant les niches CGV", () => {
    const results = searchAllModels("contrat", 5);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.type).toBe("catalog");
  });

  it("trouve encore les métiers CGV", () => {
    const results = searchAllModels("photographe", 3);
    expect(results.some((r) => r.type === "niche")).toBe(true);
  });
});
