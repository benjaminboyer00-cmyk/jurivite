import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const rgpdDetailsSchema = z.object({
  websiteUrl: z.url("URL du site invalide"),
  hostingProvider: z
    .string()
    .min(2, "Nom de l'hébergeur requis (sous-traitant RGPD)")
    .max(120),
  hostingAddress: z
    .string()
    .min(10, "Adresse postale de l'hébergeur requise")
    .max(300),
  dataCollected: z
    .string()
    .min(20, "Listez les données collectées (formulaire, cookies…)")
    .max(2000),
  processingPurpose: z
    .string()
    .min(10, "Précisez la finalité du traitement")
    .max(1000),
  retentionPeriod: z
    .string()
    .min(5, "Indiquez la durée de conservation")
    .max(500),
  dpoEmail: z.union([
    z.literal(""),
    z.email("E-mail DPO / contact données invalide"),
  ]),
});

export const politiqueConfidentialiteFormSchema =
  companySchema.merge(rgpdDetailsSchema);

export type PolitiqueConfidentialiteFormValues = z.infer<
  typeof politiqueConfidentialiteFormSchema
>;

export const POLITIQUE_CONFIDENTIALITE_STEPS = [
  {
    id: "company",
    title: "Votre entreprise",
    description: "Responsable du traitement",
  },
  {
    id: "rgpd",
    title: "Traitement des données",
    description: "Données collectées et finalités",
  },
  {
    id: "review",
    title: "Vérification",
    description: "Contrôlez vos informations avant génération",
  },
] as const;
