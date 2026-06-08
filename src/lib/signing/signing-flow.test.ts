import { describe, expect, it } from "vitest";

import { buildSignatureWorkspace } from "@/lib/signing/workspace";
import { buildSigningUrl } from "@/lib/signing/urls";
import { isValidSignatureDataUrl } from "@/lib/signing/validate-signature";

/** Préfixes protégés par le middleware (src/middleware.ts) */
const AUTH_REQUIRED_PREFIXES = ["/dashboard", "/admin"] as const;

function isPublicClientPath(path: string): boolean {
  return !AUTH_REQUIRED_PREFIXES.some((prefix) => path.startsWith(prefix));
}

const PNG_SIGNATURE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

describe("flux signature public", () => {
  it("la page /sign/[token] reste publique (sans login)", () => {
    expect(isPublicClientPath("/sign/abc123token")).toBe(true);
    expect(isPublicClientPath("/dashboard/signatures")).toBe(false);
  });

  it("construit un lien client sans auth", () => {
    const url = buildSigningUrl("token-test", "https://jurivite.fr");
    expect(url).toBe("https://jurivite.fr/sign/token-test");
    expect(url).not.toContain("/login");
  });

  it("accepte la signature PNG du pad", () => {
    expect(isValidSignatureDataUrl(PNG_SIGNATURE)).toBe(true);
  });
});

describe("flux signature dashboard", () => {
  const baseDoc = {
    id: "doc-1",
    userId: "u1",
    companyId: null,
    slug: "contrat-prestation",
    title: "Contrat de Prestation",
    fileName: "contrat.pdf",
    formData: {
      clientName: "Client Vitre",
      price: "150 €",
      companyName: "jimo inc",
    },
    hasWatermark: 0,
    createdAt: new Date("2026-05-01"),
  };

  it("passe de brouillon → en attente → signé", () => {
    let items = buildSignatureWorkspace([baseDoc], [], "https://jurivite.fr");
    expect(items[0]?.status).toBe("draft");
    expect(items[0]?.signingUrl).toBeNull();

    items = buildSignatureWorkspace(
      [baseDoc],
      [
        {
          id: "sig-1",
          documentId: "doc-1",
          userId: "u1",
          token: "abc",
          clientName: "Client Vitre",
          clientEmail: null,
          status: "pending",
          signatureDataUrl: null,
          signedAt: null,
          expiresAt: new Date("2026-07-01"),
          createdAt: new Date("2026-05-02"),
        },
      ],
      "https://jurivite.fr",
    );
    expect(items[0]?.status).toBe("pending");
    expect(items[0]?.signingUrl).toContain("/sign/abc");

    items = buildSignatureWorkspace(
      [
        {
          ...baseDoc,
          formData: {
            ...baseDoc.formData,
            hasClientSignature: true,
            clientSignatureDataUrl: PNG_SIGNATURE,
            clientSignedAt: "01 juin 2026",
            clientSignerName: "Client Vitre",
          },
        },
      ],
      [
        {
          id: "sig-1",
          documentId: "doc-1",
          userId: "u1",
          token: "abc",
          clientName: "Client Vitre",
          clientEmail: null,
          status: "signed",
          signatureDataUrl: PNG_SIGNATURE,
          signedAt: new Date("2026-06-01"),
          expiresAt: new Date("2026-07-01"),
          createdAt: new Date("2026-05-02"),
        },
      ],
      "https://jurivite.fr",
    );
    expect(items[0]?.status).toBe("signed");
    expect(items[0]?.signingUrl).toBeNull();
    expect(items[0]?.signedAt).toBeTruthy();
  });
});
