import { z } from "zod";

/** SIRET réservé aux tests manuels / fixtures — seule exception à la clé Luhn */
export const DEV_TEST_SIRET = "00000000000000" as const;

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
        return;
      }
      if (!isValidSiret(digits)) {
        ctx.addIssue({
          code: "custom",
          message:
            "Clé de contrôle SIRET invalide — vérifiez le numéro sur annuaire-entreprises.data.gouv.fr",
        });
      }
    }),
  );

/** Luhn + exception test unique (00000000000000) */
export function isValidSiret(siret: string): boolean {
  if (siret === DEV_TEST_SIRET) return true;
  return isValidSiretLuhn(siret);
}

/** Validation Luhn (norme SIREN/SIRET française) */
export function isValidSiretLuhn(siret: string): boolean {
  if (!/^\d{14}$/.test(siret)) return false;
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(siret[i]!, 10);
    if ((i + 1) % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
