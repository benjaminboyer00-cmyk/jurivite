import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const mentionsLegalesSiteSchema = z.object({
  websiteUrl: z.url("URL du site invalide"),
  siteName: z.string().min(2, "Nom du site requis").max(120),
  directorName: z.string().min(2, "Nom du responsable requis").max(120),
  hostingProvider: z
    .string()
    .min(2, "Nom de l'hébergeur requis")
    .max(120),
  hostingAddress: z
    .string()
    .min(10, "Adresse de l'hébergeur requise")
    .max(300),
});

export const mentionsLegalesFormSchema =
  companySchema.merge(mentionsLegalesSiteSchema);

export type MentionsLegalesFormValues = z.infer<typeof mentionsLegalesFormSchema>;

export const MENTIONS_LEGALES_STEPS = [
  {
    id: "company",
    title: "Votre entreprise",
    description: "Identité légale et coordonnées",
  },
  {
    id: "site",
    title: "Votre site web",
    description: "Informations obligatoires pour les mentions légales",
  },
  {
    id: "review",
    title: "Vérification",
    description: "Contrôlez vos informations avant génération",
  },
] as const;
