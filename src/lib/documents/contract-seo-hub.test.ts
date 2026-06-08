import { describe, expect, it } from "vitest";

import {
  CONTRACT_HUB_PATH,
  getContractLandings,
  getContractLandingSitemapPriority,
  isContractRelatedLanding,
  PRIORITY_CONTRACT_LANDING_SLUGS,
} from "@/lib/documents/contract-seo-hub";
import { getSeoLanding } from "@/lib/documents/seo-landings";

describe("contract-seo-hub", () => {
  it("expose toutes les landings prioritaires", () => {
    for (const slug of PRIORITY_CONTRACT_LANDING_SLUGS) {
      expect(getSeoLanding(slug)).toBeDefined();
    }
  });

  it("place contrat-freelance-norme en tête du hub", () => {
    const landings = getContractLandings();
    expect(landings[0]?.slug).toBe("contrat-freelance-norme");
  });

  it("priorise contrat-freelance-norme dans le sitemap", () => {
    expect(getContractLandingSitemapPriority("contrat-freelance-norme")).toBe(0.98);
    expect(getContractLandingSitemapPriority("contrat-freelance")).toBeGreaterThan(0.9);
  });

  it("détecte les landings liées aux contrats", () => {
    expect(isContractRelatedLanding("contrat-freelance-norme")).toBe(true);
    expect(isContractRelatedLanding("nda-freelance")).toBe(true);
    expect(isContractRelatedLanding("cgv-auto-entrepreneur")).toBe(false);
  });

  it("définit le chemin du hub", () => {
    expect(CONTRACT_HUB_PATH).toBe("/modeles/contrats");
  });
});
