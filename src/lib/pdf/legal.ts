import type { DocumentSlug } from "@/lib/documents/registry";
import { classifyLegalForm } from "@/lib/legal/forms";

export function safeFilePart(value: unknown, maxLength = 48): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";

  return raw
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, maxLength);
}

function pickPart(...candidates: unknown[]): string {
  for (const c of candidates) {
    const part = safeFilePart(c);
    if (part) return part;
  }
  return "Document";
}

export function buildDocumentFileName(
  slug: DocumentSlug,
  data: Record<string, unknown>,
): string {
  const company = pickPart(data.companyName);
  const client = pickPart(data.clientName ?? data.recipientName);
  const date = new Date().toISOString().slice(0, 10);

  const names: Record<DocumentSlug, string> = {
    cgv: `CGV_${company}`,
    "mentions-legales": `Mentions_Legales_${pickPart(data.siteName, company)}`,
    "politique-confidentialite": `Politique_Confidentialite_${pickPart(data.siteName, company)}`,
    "contrat-prestation": `Contrat_Prestation_${client !== "Document" ? client : company}`,
    devis: `Devis_${pickPart(data.quoteNumber)}_${client}`,
    facture: `Facture_${pickPart(data.invoiceNumber)}_${client}`,
    "cession-droits-auteur": `Cession_Droits_${pickPart(data.workTitle, client)}`,
    "conditions-utilisation": `CGU_${pickPart(data.siteName, company)}`,
    "accord-confidentialite": `NDA_${client !== "Document" ? client : company}`,
    "convention-stage": `Convention_Stage_${pickPart(data.traineeName)}`,
  };

  return `${names[slug]}_${date}.pdf`;
}

export function enrichLegalContext(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const legalForm = String(data.legalForm ?? "");
  const classification = classifyLegalForm(legalForm);
  const shareCapital = String(data.shareCapital ?? "").trim();
  const rcsCity = String(data.rcsCity ?? "").trim();
  const vatNumber = String(data.vatNumber ?? "").trim();

  const now = new Date();
  const dateDuJour = now.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateDuJourCourt = now.toLocaleDateString("fr-FR");

  return {
    ...data,
    ...classification,
    shareCapital: shareCapital || null,
    rcsCity: rcsCity || null,
    vatNumber: vatNumber || null,
    hasShareCapital: Boolean(shareCapital),
    hasRcs: Boolean(rcsCity),
    hasVatNumber: Boolean(vatNumber),
    dateDuJour,
    dateDuJourCourt,
    anneeCourante: now.getFullYear(),
    documentYear: now.getFullYear(),
    generatedAt: now.toISOString(),
  };
}

export function enrichSlugSpecificData(
  slug: DocumentSlug,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const enriched = { ...data };

  if (slug === "devis" || slug === "facture") {
    const amount = Number(data.amountExclVat) || 0;
    const vat = Number(data.vatRate) || 0;
    const vatAmount = (amount * vat) / 100;
    enriched.amountHtFormatted = amount.toFixed(2);
    enriched.vatAmountFormatted = vatAmount.toFixed(2);
    enriched.amountTtc = (amount + vatAmount).toFixed(2);
    enriched.amountTtcFormatted = enriched.amountTtc;
  }

  if (slug === "politique-confidentialite") {
    const dpo = String(data.dpoEmail ?? "").trim();
    enriched.contactEmail = dpo || data.email;
  }

  if (slug === "accord-confidentialite") {
    const years = Number(data.durationYears) || 1;
    const survival = Number(data.survivalYears) || 2;
    enriched.durationLabel = `${years} an${years > 1 ? "s" : ""}`;
    enriched.survivalYears = survival;
  }

  if (slug === "convention-stage") {
    enriched.hasGratification = Boolean(
      String(data.gratificationAmount ?? "").trim(),
    );
  }

  return enriched;
}
