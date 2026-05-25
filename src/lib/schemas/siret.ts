import { z } from "zod";

/** Retire espaces, tirets, points — garde uniquement les chiffres */
export function normalizeSiretInput(value: unknown): string {
  return String(value ?? "").replace(/\D/g, "");
}

export const siretSchema = z
  .string()
  .transform(normalizeSiretInput)
  .pipe(
    z.string().superRefine((digits, ctx) => {
      if (digits.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Le SIRET est requis",
        });
        return;
      }
      if (digits.length === 9) {
        ctx.addIssue({
          code: "custom",
          message:
            "9 chiffres détectés : entrez le SIRET complet (14 chiffres), pas le SIREN seul",
        });
        return;
      }
      if (digits.length !== 14) {
        ctx.addIssue({
          code: "custom",
          message: `Le SIRET doit contenir 14 chiffres (${digits.length} détectés après nettoyage)`,
        });
      }
    }),
  );
