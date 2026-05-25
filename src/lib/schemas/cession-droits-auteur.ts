import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const cessionDetailsSchema = z.object({
  clientName: z.string().min(2).max(120),
  clientAddress: z.string().min(10).max(300),
  workTitle: z.string().min(2).max(200),
  workDescription: z.string().min(20).max(3000),
  exploitationMedia: z.string().min(5).max(500),
  territory: z.string().min(2).max(200),
  duration: z.string().min(2).max(200),
  assignmentPrice: z.string().min(1).max(200),
  paymentTerms: z.string().min(10).max(1000),
});

export const cessionDroitsFormSchema =
  companySchema.merge(cessionDetailsSchema);

export type CessionDroitsFormValues = z.infer<typeof cessionDroitsFormSchema>;

export const CESSION_DROITS_STEPS = [
  { id: "company", title: "Cédant", description: "Auteur / titulaire des droits" },
  { id: "cession", title: "Œuvre & cession", description: "Périmètre et rémunération" },
  { id: "review", title: "Vérification", description: "Contrôle avant génération" },
] as const;
