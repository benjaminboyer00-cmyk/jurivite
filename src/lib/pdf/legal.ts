import type { DocumentSlug } from "@/lib/documents/registry";
import { getCgvNiche } from "@/lib/documents/niches-seo";
import { classifyLegalForm, usesFranchiseTva } from "@/lib/legal/forms";
import { juriviteLegal, PDF_LEGAL_NOTICE } from "@/lib/legal/jurivite-site";
import { formatIbanDisplay, normalizeIban } from "@/lib/schemas/iban";

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
  const siretRaw = String(data.siret ?? "").replace(/\D/g, "");
  const siren =
    siretRaw.length >= 9
      ? `${siretRaw.slice(0, 3)} ${siretRaw.slice(3, 6)} ${siretRaw.slice(6, 9)}`
      : "";
  const franchiseTva = usesFranchiseTva(
    classification,
    data.franchiseTva as boolean | string | undefined,
  );

  const now = new Date();
  const dateDuJour = now.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateDuJourCourt = now.toLocaleDateString("fr-FR");

  const iban = normalizeIban(String(data.iban ?? ""));
  const bic = String(data.bic ?? "").trim().toUpperCase();
  const bankAccountHolder = String(data.bankAccountHolder ?? "").trim();
  const paymentTermsRaw = String(data.paymentTerms ?? "").trim();
  const paymentTermsFormatted = buildPaymentTermsBlock({
    iban,
    bic,
    bankAccountHolder,
    paymentTerms: paymentTermsRaw,
  });

  return {
    ...data,
    ...classification,
    iban: iban || null,
    ibanFormatted: iban ? formatIbanDisplay(iban) : null,
    bic: bic || null,
    bankAccountHolder: bankAccountHolder || null,
    hasIban: Boolean(iban),
    hasBic: Boolean(bic),
    paymentTermsFormatted,
    tvaMentionArticle293B: franchiseTva,
    franchiseTva,
    showVatBreakdown: !franchiseTva,
    shareCapital: shareCapital || null,
    rcsCity: rcsCity || null,
    vatNumber: vatNumber || null,
    rnaNumber: String(data.rnaNumber ?? "").trim() || null,
    hasRna: Boolean(String(data.rnaNumber ?? "").trim()),
    siren,
    hasShareCapital: Boolean(shareCapital),
    hasRcs: Boolean(rcsCity),
    hasVatNumber: Boolean(vatNumber),
    publicationRoleLabel: classification.publicationRoleLabel,
    dateDuJour,
    dateDuJourCourt,
    anneeCourante: now.getFullYear(),
    documentYear: now.getFullYear(),
    generatedAt: now.toISOString(),
    pdfLegalDisclaimer: PDF_LEGAL_NOTICE,
  };
}

export function enrichSlugSpecificData(
  slug: DocumentSlug,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const enriched = { ...data };

  if (slug === "politique-confidentialite") {
    enriched.hostingProvider =
      String(data.hostingProvider ?? "").trim() || null;
    enriched.hostingAddress =
      String(data.hostingAddress ?? "").trim() || null;
    enriched.hasHosting =
      Boolean(enriched.hostingProvider) && Boolean(enriched.hostingAddress);
  }

  if (slug === "devis" || slug === "facture") {
    const amount = Number(data.amountExclVat) || 0;
    const franchise = Boolean(enriched.franchiseTva ?? enriched.tvaMentionArticle293B);
    const vat = franchise ? 0 : Number(data.vatRate) || 0;
    const vatAmount = franchise ? 0 : (amount * vat) / 100;
    const ttc = franchise ? amount : amount + vatAmount;
    enriched.amountHtFormatted = amount.toFixed(2);
    enriched.vatAmountFormatted = vatAmount.toFixed(2);
    enriched.vatRateDisplay = franchise ? "N/A" : String(vat);
    enriched.amountTtc = ttc.toFixed(2);
    enriched.amountTtcFormatted = enriched.amountTtc;
    enriched.showVatBreakdown = !franchise;
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

  if (slug === "cgv") {
    enriched.mediatorName =
      String(data.mediatorName ?? "").trim() || juriviteLegal.mediatorName;
    enriched.mediatorUrl =
      String(data.mediatorUrl ?? "").trim() || juriviteLegal.mediatorUrl;
    enriched.mediatorContact =
      String(data.mediatorContact ?? "").trim() || juriviteLegal.mediatorContact;

    const nicheSlug = String(data.nicheSlug ?? "").trim();
    if (nicheSlug) {
      const niche = getCgvNiche(nicheSlug);
      if (niche?.industryClausesHtml) {
        enriched.industryClausesHtml = niche.industryClausesHtml;
      }
    }
  }

  return enriched;
}

function buildPaymentTermsBlock({
  iban,
  bic,
  bankAccountHolder,
  paymentTerms,
}: {
  iban: string;
  bic: string;
  bankAccountHolder: string;
  paymentTerms: string;
}): string {
  const lines: string[] = [];

  if (iban) {
    lines.push("Paiement par virement bancaire.");
    if (bankAccountHolder) {
      lines.push(`Titulaire du compte : ${bankAccountHolder}`);
    }
    lines.push(`IBAN : ${formatIbanDisplay(iban)}`);
    if (bic) {
      lines.push(`BIC : ${bic}`);
    }
  }

  if (paymentTerms) {
    lines.push(paymentTerms);
  }

  return lines.join("\n");
}
