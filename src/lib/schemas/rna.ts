import { z } from "zod";

/** RNA — Répertoire national des associations (ex. W751234567) */
export function normalizeRna(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

export function isValidRna(value: string): boolean {
  const rna = normalizeRna(value);
  return /^W\d{9}$/.test(rna);
}

export const rnaSchema = z
  .string()
  .min(10, "Numéro RNA requis pour une association")
  .max(20)
  .transform(normalizeRna)
  .refine(isValidRna, {
    message: "Format RNA invalide (ex. W751234567)",
  });

export const optionalRnaSchema = z.union([z.literal(""), rnaSchema]);
