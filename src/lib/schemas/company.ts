import { z } from "zod";

import { classifyLegalForm } from "@/lib/legal/forms";

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
  shareCapital: z.string().max(30).optional().or(z.literal("")),
  rcsCity: z.string().max(80).optional().or(z.literal("")),
  vatNumber: z.string().max(20).optional().or(z.literal("")),
});

export type CompanyFields = z.infer<typeof companySchema>;

export const companyDefaultValues: CompanyFields = {
  companyName: "",
  legalForm: "Micro-entreprise",
  siret: "",
  address: "",
  email: "",
  phone: "",
  shareCapital: "",
  rcsCity: "",
  vatNumber: "",
};

export function validateCompanyLegalFields(
  data: Record<string, unknown>,
): string | null {
  const { requiresShareCapital } = classifyLegalForm(String(data.legalForm ?? ""));
  if (requiresShareCapital && !String(data.shareCapital ?? "").trim()) {
    return "Le capital social est requis pour une société (SARL, SAS, EURL…)";
  }
  return null;
}
