import { describe, expect, it } from "vitest";

import {
  cgvNicheSlugs,
  cgvNiches,
  getCgvNiche,
  searchCgvNiches,
} from "@/lib/documents/niches-seo";

describe("searchCgvNiches", () => {
  it("trouve les métiers par mot-clé courant", () => {
    expect(searchCgvNiches("sophrologue", 1)[0]?.slug).toBe("sophrologue");
    expect(searchCgvNiches("photographe", 1)[0]?.slug).toBe("photographe");
    expect(searchCgvNiches("developpeur", 2).map((n) => n.slug)).toEqual([
      "developpeur-web",
      "developpeur-mobile",
    ]);
  });

  it("ne confond pas une requête courte avec un sous-mot (ex. nda / mandataire)", () => {
    const results = searchCgvNiches("nda", 5);
    expect(results.some((n) => n.slug === "agent-immobilier")).toBe(false);
  });

  it("trouve les métiers avec requête multi-mots", () => {
    const slugs = searchCgvNiches("auto entrepreneur", 5).map((n) => n.slug);
    expect(slugs.length).toBeGreaterThan(0);
  });

  it("retourne vide si aucune correspondance", () => {
    expect(searchCgvNiches("xyznone")).toHaveLength(0);
    expect(searchCgvNiches("")).toHaveLength(0);
  });
});

describe("catalogue niches", () => {
  it("expose 50 modèles uniques", () => {
    expect(cgvNiches).toHaveLength(50);
    expect(new Set(cgvNicheSlugs).size).toBe(50);
  });

  it("chaque niche a des clauses et une intro", () => {
    for (const niche of cgvNiches) {
      expect(niche.industrySpecificClauses.length).toBeGreaterThan(0);
      expect(niche.activityDescriptionDefault.length).toBeGreaterThan(20);
      expect(getCgvNiche(niche.slug)).toBeDefined();
    }
  });
});
