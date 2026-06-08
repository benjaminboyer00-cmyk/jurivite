import { describe, expect, it } from "vitest";

import { buildSigningUrl } from "@/lib/db/signing";
import {
  isSignableDocumentSlug,
  SIGNABLE_DOCUMENT_SLUGS,
  SIGNING_LINK_TTL_DAYS,
} from "@/lib/signing/constants";
import { isValidSignatureDataUrl } from "@/lib/signing/validate-signature";

describe("signing constants", () => {
  it("inclut contrat-prestation et devis", () => {
    expect(SIGNABLE_DOCUMENT_SLUGS).toContain("contrat-prestation");
    expect(SIGNABLE_DOCUMENT_SLUGS).toContain("devis");
    expect(SIGNING_LINK_TTL_DAYS).toBeGreaterThanOrEqual(7);
  });

  it("rejette les slugs non signables", () => {
    expect(isSignableDocumentSlug("cgv")).toBe(false);
    expect(isSignableDocumentSlug("contrat-prestation")).toBe(true);
  });
});

describe("buildSigningUrl", () => {
  it("construit une URL sans slash final", () => {
    expect(buildSigningUrl("abc123", "https://jurivite.fr/")).toBe(
      "https://jurivite.fr/sign/abc123",
    );
  });
});

describe("isValidSignatureDataUrl", () => {
  it("accepte un PNG data URL court", () => {
    expect(
      isValidSignatureDataUrl("data:image/png;base64,iVBORw0KGgo="),
    ).toBe(true);
  });

  it("rejette les formats non PNG", () => {
    expect(
      isValidSignatureDataUrl("data:image/jpeg;base64,abc"),
    ).toBe(false);
  });
});
