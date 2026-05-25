import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const contratClientSchema = z.object({
  clientName: z.string().min(2, "Nom du client requis").max(120),
  clientAddress: z
    .string()
    .min(10, "Adresse du client requise")
    .max(300),
  serviceDescription: z
    .string()
    .min(20, "Décrivez la prestation")
    .max(3000),
  price: z.string().min(1, "Montant ou forfait requis").max(200),
  paymentTerms: z
    .string()
    .min(10, "Précisez les modalités de paiement")
    .max(1000),
  deliveryDate: z
    .string()
    .min(3, "Date ou délai de livraison requis")
    .max(200),
});

export const contratPrestationFormSchema =
  companySchema.merge(contratClientSchema);

export type ContratPrestationFormValues = z.infer<
  typeof contratPrestationFormSchema
>;

export const CONTRAT_PRESTATION_STEPS = [
  {
    id: "company",
    title: "Prestataire",
    description: "Vos informations légales",
  },
  {
    id: "contract",
    title: "Prestation & client",
    description: "Détails du contrat",
  },
  {
    id: "review",
    title: "Vérification",
    description: "Contrôlez vos informations avant génération",
  },
] as const;
