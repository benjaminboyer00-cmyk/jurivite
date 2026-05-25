import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const cgvCommercialSchema = z.object({
  activityDescription: z
    .string()
    .min(20, "Décrivez votre activité en quelques phrases")
    .max(2000),
  deliveryDelay: z
    .string()
    .min(3, "Précisez les délais de livraison ou d'exécution")
    .max(500),
  paymentTerms: z
    .string()
    .min(10, "Précisez les modalités de paiement")
    .max(1000),
  withdrawalPeriodDays: z
    .number()
    .int()
    .min(0, "Minimum 0 jour")
    .max(30, "Maximum 30 jours"),
});

export const cgvFormSchema = companySchema.merge(cgvCommercialSchema);

export type CgvFormValues = z.infer<typeof cgvFormSchema>;

export const CGV_FORM_STEPS = [
  {
    id: "company",
    title: "Votre entreprise",
    description: "Identité légale et coordonnées",
  },
  {
    id: "commercial",
    title: "Conditions commerciales",
    description: "Activité, délais et paiement",
  },
  {
    id: "review",
    title: "Vérification",
    description: "Contrôlez vos informations avant génération",
  },
] as const;
