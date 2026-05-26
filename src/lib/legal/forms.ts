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
  "Profession libérale (SEL / EI)",
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
  /** Franchise en base art. 293 B du CGI (micro, AE, ou EI en franchise) */
  tvaMentionArticle293B: boolean;
  requiresShareCapital: boolean;
  /** RCS obligatoire (sociétés commerciales, pas associations) */
  requiresRcs: boolean;
  /** Libellé du responsable de publication (mentions légales) */
  publicationRoleLabel: string;
};

function normalizeForm(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/**
 * Détermine si la mention TVA art. 293 B s'applique.
 * L'EI peut être en franchise ou assujettie : le champ `franchiseTva` tranche.
 */
export function usesFranchiseTva(
  classification: Pick<
    LegalClassification,
    "isMicroEntreprise" | "isAutoEntrepreneur" | "isEntrepriseIndividuelle"
  >,
  franchiseTvaExplicit?: boolean | string,
): boolean {
  if (franchiseTvaExplicit === true || franchiseTvaExplicit === "true") {
    return true;
  }
  if (franchiseTvaExplicit === false || franchiseTvaExplicit === "false") {
    return false;
  }
  return classification.isMicroEntreprise || classification.isAutoEntrepreneur;
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

  const isProfessionLiberale =
    legalFormNormalized.includes("liberal") ||
    legalFormNormalized.includes("libérale") ||
    legalFormNormalized.includes("sel");

  const isSociete =
    !isMicroEntreprise &&
    !isAutoEntrepreneur &&
    !isAssociation &&
    !isProfessionLiberale &&
    (legalFormNormalized.includes("sarl") ||
      legalFormNormalized.includes("sas") ||
      legalFormNormalized.includes("eurl") ||
      legalFormNormalized.includes("sa") ||
      legalFormNormalized.includes("sci") ||
      legalFormNormalized.includes("snc") ||
      /\bsasu\b/.test(legalFormNormalized));

  const tvaMentionArticle293B =
    isMicroEntreprise || isAutoEntrepreneur;

  let publicationRoleLabel = "représentant légal de l'éditeur";
  if (isAssociation) {
    publicationRoleLabel = "président(e) ou responsable de l'association";
  } else if (isMicroEntreprise || isAutoEntrepreneur || isEntrepriseIndividuelle) {
    publicationRoleLabel = "entrepreneur / gérant";
  } else if (isSociete) {
    publicationRoleLabel = "représentant légal (gérant, président, etc.)";
  }

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
    requiresRcs: isSociete,
    publicationRoleLabel,
  };
}
