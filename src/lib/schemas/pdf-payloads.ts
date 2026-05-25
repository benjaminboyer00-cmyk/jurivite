import { z } from "zod";

import type { DocumentSlug } from "@/lib/documents/registry";
import { accordConfidentialiteFormSchema } from "@/lib/schemas/accord-confidentialite";
import { cessionDroitsFormSchema } from "@/lib/schemas/cession-droits-auteur";
import { cgvFormSchema } from "@/lib/schemas/cgv";
import { conditionsUtilisationFormSchema } from "@/lib/schemas/conditions-utilisation";
import { contratPrestationFormSchema } from "@/lib/schemas/contrat-prestation";
import { conventionStageFormSchema } from "@/lib/schemas/convention-stage";
import { devisFormSchema } from "@/lib/schemas/devis";
import { factureFormSchema } from "@/lib/schemas/facture";
import { mentionsLegalesFormSchema } from "@/lib/schemas/mentions-legales";
import { politiqueConfidentialiteFormSchema } from "@/lib/schemas/politique-confidentialite";
import { validateCompanyLegalFields } from "@/lib/schemas/company";

const schemas: Record<DocumentSlug, z.ZodType<Record<string, unknown>>> = {
  cgv: cgvFormSchema,
  "mentions-legales": mentionsLegalesFormSchema,
  "politique-confidentialite": politiqueConfidentialiteFormSchema,
  "contrat-prestation": contratPrestationFormSchema,
  devis: devisFormSchema,
  facture: factureFormSchema,
  "cession-droits-auteur": cessionDroitsFormSchema,
  "conditions-utilisation": conditionsUtilisationFormSchema,
  "accord-confidentialite": accordConfidentialiteFormSchema,
  "convention-stage": conventionStageFormSchema,
};

export function validatePdfPayload(
  slug: DocumentSlug,
  data: unknown,
): { success: true; data: Record<string, unknown> } | { success: false; error: string } {
  const schema = schemas[slug];
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "Données invalides",
    };
  }

  const parsed = result.data as Record<string, unknown>;
  const companyError = validateCompanyLegalFields(parsed);
  if (companyError) {
    return { success: false, error: companyError };
  }

  return { success: true, data: parsed };
}
