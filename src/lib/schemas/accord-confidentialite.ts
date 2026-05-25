import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const ndaDetailsSchema = z.object({
  recipientName: z.string().min(2).max(120),
  recipientAddress: z.string().min(10).max(300),
  recipientRole: z.string().min(2).max(120),
  purpose: z.string().min(10).max(2000),
  confidentialScope: z.string().min(20).max(3000),
  durationYears: z.number().int().min(1).max(10),
  survivalYears: z.number().int().min(1).max(10),
});

export const accordConfidentialiteFormSchema =
  companySchema.merge(ndaDetailsSchema);

export type AccordConfidentialiteFormValues = z.infer<
  typeof accordConfidentialiteFormSchema
>;

export const NDA_STEPS = [
  { id: "company", title: "Divulgateur", description: "Partie qui partage l'information" },
  { id: "nda", title: "Destinataire & périmètre", description: "Confidentialité et durée" },
  { id: "review", title: "Vérification", description: "Contrôle avant génération" },
] as const;
