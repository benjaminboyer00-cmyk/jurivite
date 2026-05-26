import { z } from "zod";

import { classifyLegalForm, usesFranchiseTva } from "@/lib/legal/forms";
import { isValidRna, normalizeRna } from "@/lib/schemas/rna";
import { siretSchema } from "@/lib/schemas/siret";

export const companySchema = z.object({
  companyName: z
    .string()
    .min(2, "Le nom de l'entreprise est requis")
    .max(120),
  legalForm: z
    .string()
    .min(2, "La forme juridique est requise")
    .max(80),
  siret: siretSchema,
  address: z
    .string()
    .min(10, "L'adresse complète est requise")
    .max(300),
  email: z.email("Adresse e-mail invalide"),
  phone: z
    .string()
    .min(10, "Le téléphone est requis")
    .max(20),
  shareCapital: z.string().max(30).optional().or(z.literal("")),
  rcsCity: z.string().max(80).optional().or(z.literal("")),
  vatNumber: z.string().max(20).optional().or(z.literal("")),
  /** EI ou autre : cocher si franchise en base TVA (art. 293 B) */
  franchiseTva: z.boolean().optional(),
  /** Association loi 1901 : numéro RNA (W…) — obligatoire si association */
  rnaNumber: z.string().max(20).optional().or(z.literal("")),
});

export type CompanyFields = z.infer<typeof companySchema>;

export const companyDefaultValues: CompanyFields = {
  companyName: "",
  legalForm: "Micro-entreprise",
  siret: "",
  address: "",
  email: "",
  phone: "",
  shareCapital: "",
  rcsCity: "",
  vatNumber: "",
  franchiseTva: true,
  rnaNumber: "",
};

export function validateCompanyLegalFields(
  data: Record<string, unknown>,
): string | null {
  const classification = classifyLegalForm(String(data.legalForm ?? ""));

  if (classification.requiresShareCapital && !String(data.shareCapital ?? "").trim()) {
    return "Le capital social est requis pour une société (SARL, SAS, EURL, SA…)";
  }

  if (classification.requiresRcs && !String(data.rcsCity ?? "").trim()) {
    return "La ville du greffe (RCS) est obligatoire pour une société commerciale";
  }

  const franchise = usesFranchiseTva(
    classification,
    data.franchiseTva as boolean | string | undefined,
  );
  if (
    !franchise &&
    !classification.isSociete &&
    !String(data.vatNumber ?? "").trim() &&
    (classification.isEntrepriseIndividuelle ||
      classification.isProfessionLiberale)
  ) {
    return "Indiquez votre n° de TVA intracommunautaire ou cochez « Franchise en base TVA (art. 293 B) »";
  }

  if (classification.isAssociation) {
    const rna = normalizeRna(String(data.rnaNumber ?? ""));
    if (!rna) {
      return "Le numéro RNA est obligatoire pour une association (ex. W751234567)";
    }
    if (!isValidRna(rna)) {
      return "Format RNA invalide — 9 chiffres après la lettre W (ex. W751234567)";
    }
  }

  return null;
}
