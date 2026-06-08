import { describe, expect, it } from "vitest";

import {
  buildSignatureWorkspace,
  computeSignatureStats,
  filterSignatureItems,
} from "@/lib/signing/workspace";

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
  },
  hasWatermark: 1,
  createdAt: new Date("2026-05-01"),
};

describe("buildSignatureWorkspace", () => {
  it("ignore les devis et factures", () => {
    const items = buildSignatureWorkspace(
      [
        baseDoc,
        { ...baseDoc, id: "doc-2", slug: "devis", title: "Devis" },
        { ...baseDoc, id: "doc-3", slug: "facture", title: "Facture" },
      ],
      [],
      "https://jurivite.fr",
    );
    expect(items).toHaveLength(1);
    expect(items[0]?.status).toBe("draft");
    expect(items[0]?.clientName).toBe("Client Vitre");
  });

  it("expose un lien pour une signature en attente", () => {
    const items = buildSignatureWorkspace(
      [baseDoc],
      [
        {
          id: "sig-1",
          documentId: "doc-1",
          userId: "u1",
          token: "tok123",
          clientName: "Client Vitre",
          clientEmail: null,
          status: "pending",
          signatureDataUrl: null,
          signedAt: null,
          expiresAt: new Date("2099-12-31"),
          createdAt: new Date("2026-05-02"),
        },
      ],
      "https://jurivite.fr",
    );
    expect(items[0]?.status).toBe("pending");
    expect(items[0]?.signingUrl).toBe("https://jurivite.fr/sign/tok123");
  });

  it("marque expiré un lien pending dépassé sans ouvrir /sign", () => {
    const items = buildSignatureWorkspace(
      [baseDoc],
      [
        {
          id: "sig-1",
          documentId: "doc-1",
          userId: "u1",
          token: "tok123",
          clientName: "Client Vitre",
          clientEmail: null,
          status: "pending",
          signatureDataUrl: null,
          signedAt: null,
          expiresAt: new Date("2020-01-01"),
          createdAt: new Date("2026-05-02"),
        },
      ],
      "https://jurivite.fr",
    );
    expect(items[0]?.status).toBe("expired");
    expect(items[0]?.signingUrl).toBeNull();
  });

  it("filtre et compte par statut", () => {
    const items = buildSignatureWorkspace([baseDoc], [], "https://jurivite.fr");
    const stats = computeSignatureStats(items);
    expect(stats.draft).toBe(1);
    expect(filterSignatureItems(items, "draft")).toHaveLength(1);
  });
});
