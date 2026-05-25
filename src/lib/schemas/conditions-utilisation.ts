import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const cguDetailsSchema = z.object({
  websiteUrl: z.url("URL invalide"),
  siteName: z.string().min(2).max(120),
  serviceDescription: z.string().min(20).max(3000),
  liabilityClause: z.string().min(20).max(2000),
  applicableLaw: z.string().min(2).max(80),
});

export const conditionsUtilisationFormSchema =
  companySchema.merge(cguDetailsSchema);

export type ConditionsUtilisationFormValues = z.infer<
  typeof conditionsUtilisationFormSchema
>;

export const CGU_STEPS = [
  { id: "company", title: "Éditeur", description: "Structure qui publie le service" },
  { id: "service", title: "Service en ligne", description: "Description et responsabilité" },
  { id: "review", title: "Vérification", description: "Contrôle avant génération" },
] as const;
