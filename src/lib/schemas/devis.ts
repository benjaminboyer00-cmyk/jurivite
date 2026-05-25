import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const devisDetailsSchema = z.object({
  clientName: z.string().min(2, "Nom du client requis").max(120),
  clientEmail: z.string().max(120),
  quoteNumber: z.string().min(1, "Numéro de devis requis").max(40),
  quoteDate: z.string().min(8, "Date du devis requise").max(20),
  validityDays: z
    .number()
    .int()
    .min(1, "Minimum 1 jour")
    .max(90, "Maximum 90 jours"),
  serviceDescription: z
    .string()
    .min(10, "Décrivez la prestation")
    .max(3000),
  amountExclVat: z
    .number()
    .positive("Le montant HT doit être positif"),
  vatRate: z
    .number()
    .min(0)
    .max(100),
});

export const devisFormSchema = companySchema.merge(devisDetailsSchema);

export type DevisFormValues = z.infer<typeof devisFormSchema>;

export const DEVIS_STEPS = [
  {
    id: "company",
    title: "Votre entreprise",
    description: "Émetteur du devis",
  },
  {
    id: "quote",
    title: "Détails du devis",
    description: "Client, prestation et montants",
  },
  {
    id: "review",
    title: "Vérification",
    description: "Contrôlez vos informations avant génération",
  },
] as const;
