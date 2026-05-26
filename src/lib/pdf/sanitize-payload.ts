/** Limites de sécurité PDF (au-delà de Zod) — évite les romans et la casse mise en page */
const FIELD_MAX_LENGTH: Record<string, number> = {
  companyName: 120,
  legalForm: 80,
  siret: 14,
  address: 300,
  email: 120,
  phone: 20,
  shareCapital: 30,
  rcsCity: 80,
  vatNumber: 20,
  clientName: 120,
  clientAddress: 300,
  recipientName: 120,
  recipientAddress: 300,
  serviceDescription: 8000,
  workDescription: 8000,
  missionDescription: 8000,
  activityDescription: 4000,
  paymentTerms: 2000,
  deliveryDelay: 500,
  deliveryDate: 200,
  price: 200,
  purpose: 2000,
  confidentialScope: 4000,
  dataCollected: 4000,
  processingPurpose: 2000,
  retentionPeriod: 500,
  liabilityClause: 3000,
  exploitationMedia: 500,
  default: 5000,
};

const TRUNCATION_SUFFIX = " [… texte tronqué pour mise en page PDF]";

/**
 * Supprime HTML, scripts, caractères de contrôle dangereux (champs formulaire).
 * Dernière barrière HTML complète : `sanitizePdfHtml()` dans `generate.ts` avant Puppeteer.
 */
export function sanitizeTextInput(value: unknown, fieldKey?: string): string {
  let text = String(value ?? "");

  text = text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\uFEFF/g, "");

  text = text.replace(/\s+/g, " ").trim();

  const maxLen = FIELD_MAX_LENGTH[fieldKey ?? ""] ?? FIELD_MAX_LENGTH.default;
  if (text.length > maxLen) {
    text = text.slice(0, maxLen - TRUNCATION_SUFFIX.length) + TRUNCATION_SUFFIX;
  }

  return text;
}

/** Empêche l'injection de blocs Handlebars {{ }} dans les champs utilisateur */
function stripHandlebarsDelimiters(value: string): string {
  return value.replace(/[{}]/g, "");
}

export function sanitizePdfPayload(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      let cleaned = sanitizeTextInput(value, key);
      if (key !== "email" && key !== "websiteUrl") {
        cleaned = stripHandlebarsDelimiters(cleaned);
      }
      out[key] = cleaned;
    } else if (typeof value === "number") {
      out[key] = value;
    } else if (value !== null && value !== undefined) {
      out[key] = value;
    }
  }

  if (typeof out.siret === "string") {
    out.siret = String(out.siret).replace(/\D/g, "").slice(0, 14);
  }

  if (typeof out.nicheSlug === "string") {
    out.nicheSlug = String(out.nicheSlug).trim().slice(0, 80);
  }

  return out;
}
