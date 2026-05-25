import path from "path";

import type { DocumentSlug } from "@/lib/documents/registry";

const TEMPLATE_FILES: Record<DocumentSlug, string> = {
  cgv: "cgv.html",
  "mentions-legales": "mentions-legales.html",
  "politique-confidentialite": "politique-confidentialite.html",
  "contrat-prestation": "contrat-prestation.html",
  devis: "devis.html",
};

export function getTemplatePath(slug: DocumentSlug): string {
  const file = TEMPLATE_FILES[slug];
  return path.join(process.cwd(), "templates", file);
}

export function enrichTemplateData(
  slug: DocumentSlug,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const enriched = { ...data };

  if (slug === "devis") {
    const amount = Number(data.amountExclVat) || 0;
    const vat = Number(data.vatRate) || 0;
    enriched.amountTtc = (amount * (1 + vat / 100)).toFixed(2);
  }

  if (slug === "politique-confidentialite") {
    const dpo = String(data.dpoEmail ?? "").trim();
    enriched.contactEmail = dpo || data.email;
  }

  return enriched;
}
