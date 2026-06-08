import { describe, expect, it } from "vitest";

import {
  DEV_TEST_SIRET,
  isValidSiret,
  isValidSiretLuhn,
  siretSchema,
} from "@/lib/schemas/siret";

describe("isValidSiret", () => {
  it("accepte le SIRET de test 00000000000000", () => {
    expect(isValidSiret(DEV_TEST_SIRET)).toBe(true);
  });

  it("rejette un SIRET 14 chiffres avec clé Luhn invalide", () => {
    expect(isValidSiret("12345678900012")).toBe(false);
  });

  it("accepte un SIRET Luhn valide (La Poste)", () => {
    expect(isValidSiret("35600000000019")).toBe(true);
  });
});

describe("siretSchema", () => {
  it("valide 00000000000000 via Zod", () => {
    const result = siretSchema.safeParse(DEV_TEST_SIRET);
    expect(result.success).toBe(true);
  });

  it("rejette une clé Luhn incorrecte", () => {
    const result = siretSchema.safeParse("12345678900012");
    expect(result.success).toBe(false);
  });
});
