import { z } from "zod";

export const companySchema = z.object({
  companyName: z
    .string()
    .min(2, "Le nom de l'entreprise est requis")
    .max(120),
  legalForm: z
    .string()
    .min(2, "La forme juridique est requise")
    .max(80),
  siret: z
    .string()
    .regex(/^\d{14}$/, "Le SIRET doit contenir 14 chiffres"),
  address: z
    .string()
    .min(10, "L'adresse complète est requise")
    .max(300),
  email: z.email("Adresse e-mail invalide"),
  phone: z
    .string()
    .min(10, "Le téléphone est requis")
    .max(20),
});

export type CompanyFields = z.infer<typeof companySchema>;

export const companyDefaultValues: CompanyFields = {
  companyName: "",
  legalForm: "Micro-entreprise",
  siret: "",
  address: "",
  email: "",
  phone: "",
};
