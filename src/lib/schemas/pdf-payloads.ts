import { z } from "zod";

import type { DocumentSlug } from "@/lib/documents/registry";
import { cgvFormSchema } from "@/lib/schemas/cgv";
import { contratPrestationFormSchema } from "@/lib/schemas/contrat-prestation";
import { devisFormSchema } from "@/lib/schemas/devis";
import { mentionsLegalesFormSchema } from "@/lib/schemas/mentions-legales";
import { politiqueConfidentialiteFormSchema } from "@/lib/schemas/politique-confidentialite";

const schemas: Record<DocumentSlug, z.ZodType<Record<string, unknown>>> = {
  cgv: cgvFormSchema,
  "mentions-legales": mentionsLegalesFormSchema,
  "politique-confidentialite": politiqueConfidentialiteFormSchema,
  "contrat-prestation": contratPrestationFormSchema,
  devis: devisFormSchema,
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
  return { success: true, data: result.data as Record<string, unknown> };
}
