import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";
import { billingPaymentRequiredSchema } from "@/lib/schemas/billing-payment";

export const factureDetailsSchema = z.object({
  clientName: z.string().min(2).max(120),
  clientAddress: z.string().min(10).max(300),
  invoiceNumber: z.string().min(1).max(40),
  invoiceDate: z.string().min(3).max(40),
  dueDate: z.string().min(3).max(40),
  serviceDescription: z.string().min(10).max(3000),
  amountExclVat: z.number().positive("Montant HT invalide"),
  vatRate: z.number().min(0).max(100),
  paymentTerms: z
    .string()
    .min(5, "Précisez le délai ou les conditions complémentaires")
    .max(1000),
}).merge(billingPaymentRequiredSchema);

export const factureFormSchema = companySchema.merge(factureDetailsSchema);

export type FactureFormValues = z.infer<typeof factureFormSchema>;

export const FACTURE_STEPS = [
  { id: "company", title: "Émetteur", description: "Vos informations légales" },
  { id: "invoice", title: "Facture & client", description: "Montants et destinataire" },
  { id: "review", title: "Vérification", description: "Contrôle avant génération" },
] as const;
