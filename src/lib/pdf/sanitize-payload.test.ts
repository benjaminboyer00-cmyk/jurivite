import { describe, expect, it } from "vitest";

import {
  sanitizePdfPayload,
  sanitizeTextInput,
} from "@/lib/pdf/sanitize-payload";

describe("sanitizeTextInput", () => {
  it("supprime les balises script et HTML", () => {
    const raw = '<script>alert(1)</script>Hello <b>world</b>';
    expect(sanitizeTextInput(raw)).toBe("Hello world");
  });

  it("tronque les champs trop longs", () => {
    const long = "a".repeat(6000);
    const out = sanitizeTextInput(long, "companyName");
    expect(out.length).toBeLessThanOrEqual(120);
    expect(out).toContain("tronqué");
  });
});

describe("sanitizePdfPayload", () => {
  it("retire les délimiteurs Handlebars des champs texte", () => {
    const out = sanitizePdfPayload({
      companyName: "{{evil}}",
      siret: "00000000000000",
    });
    expect(out.companyName).toBe("evil");
    expect(out.siret).toBe("00000000000000");
  });

  it("conserve un SIRET de test à 14 chiffres", () => {
    const out = sanitizePdfPayload({
      siret: "00000000000000",
      companyName: "Test",
    });
    expect(out.siret).toBe("00000000000000");
  });
});
