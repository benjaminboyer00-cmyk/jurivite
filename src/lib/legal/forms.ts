/** Formes juridiques proposées dans les formulaires — pilote les clauses PDF */
export const LEGAL_FORM_OPTIONS = [
  "Micro-entreprise",
  "Auto-entrepreneur",
  "Entreprise individuelle (EI)",
  "EURL",
  "SARL",
  "SAS",
  "SASU",
  "SA",
  "Association loi 1901",
  "Autre",
] as const;

export type LegalFormOption = (typeof LEGAL_FORM_OPTIONS)[number];

export type LegalClassification = {
  legalForm: string;
  legalFormNormalized: string;
  isMicroEntreprise: boolean;
  isAutoEntrepreneur: boolean;
  isEntrepriseIndividuelle: boolean;
  isSociete: boolean;
  isAssociation: boolean;
  isProfessionLiberale: boolean;
  tvaMentionArticle293B: boolean;
  requiresShareCapital: boolean;
};

function normalizeForm(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function classifyLegalForm(legalForm: string): LegalClassification {
  const legalFormNormalized = normalizeForm(legalForm);

  const isMicroEntreprise =
    legalFormNormalized.includes("micro-entreprise") ||
    legalFormNormalized.includes("micro entreprise");

  const isAutoEntrepreneur =
    legalFormNormalized.includes("auto-entrepreneur") ||
    legalFormNormalized.includes("auto entrepreneur");

  const isEntrepriseIndividuelle =
    legalFormNormalized.includes("entreprise individuelle") ||
    /\bei\b/.test(legalFormNormalized);

  const isAssociation =
    legalFormNormalized.includes("association") ||
    legalFormNormalized.includes("loi 1901");

  const isSociete =
    !isMicroEntreprise &&
    !isAutoEntrepreneur &&
    !isAssociation &&
    (legalFormNormalized.includes("sarl") ||
      legalFormNormalized.includes("sas") ||
      legalFormNormalized.includes("eurl") ||
      legalFormNormalized.includes("sa") ||
      legalFormNormalized.includes("sci") ||
      legalFormNormalized.includes("snc") ||
      /\bsasu\b/.test(legalFormNormalized));

  const isProfessionLiberale =
    legalFormNormalized.includes("liberal") ||
    legalFormNormalized.includes("libérale");

  const tvaMentionArticle293B = isMicroEntreprise || isAutoEntrepreneur;

  return {
    legalForm,
    legalFormNormalized,
    isMicroEntreprise,
    isAutoEntrepreneur,
    isEntrepriseIndividuelle,
    isSociete,
    isAssociation,
    isProfessionLiberale,
    tvaMentionArticle293B,
    requiresShareCapital: isSociete,
  };
}
