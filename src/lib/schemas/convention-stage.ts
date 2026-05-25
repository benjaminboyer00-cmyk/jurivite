import { z } from "zod";

import { companySchema } from "@/lib/schemas/company";

export const stageDetailsSchema = z.object({
  traineeName: z.string().min(2).max(120),
  traineeAddress: z.string().min(10).max(300),
  schoolName: z.string().min(2).max(200),
  tutorName: z.string().min(2).max(120),
  startDate: z.string().min(3).max(40),
  endDate: z.string().min(3).max(40),
  weeklyHours: z.number().int().min(1).max(40),
  missionDescription: z.string().min(20).max(3000),
  gratificationAmount: z.string().max(200).optional().or(z.literal("")),
});

export const conventionStageFormSchema =
  companySchema.merge(stageDetailsSchema);

export type ConventionStageFormValues = z.infer<typeof conventionStageFormSchema>;

export const CONVENTION_STAGE_STEPS = [
  { id: "company", title: "Organisme", description: "Entreprise d'accueil" },
  { id: "stage", title: "Stagiaire & mission", description: "Période et activités" },
  { id: "review", title: "Vérification", description: "Contrôle avant génération" },
] as const;
