import { z } from "zod";

/** Supprime espaces et met en majuscules */
export function normalizeIban(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

/** Affichage lisible (groupes de 4) */
export function formatIbanDisplay(iban: string): string {
  const n = normalizeIban(iban);
  return n.replace(/(.{4})/g, "$1 ").trim();
}

/** Contrôle modulo 97 (norme ISO 13616) */
export function isValidIbanChecksum(iban: string): boolean {
  const normalized = normalizeIban(iban);
  if (normalized.length < 15 || normalized.length > 34) return false;
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(normalized)) return false;

  const rearranged = normalized.slice(4) + normalized.slice(0, 4);
  const numeric = rearranged
    .split("")
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String(code - 55);
      return ch;
    })
    .join("");

  let remainder = 0;
  for (let i = 0; i < numeric.length; i += 7) {
    remainder = Number(`${remainder}${numeric.slice(i, i + 7)}`) % 97;
  }
  return remainder === 1;
}

const ibanString = z.string().min(15, "IBAN requis").max(42, "IBAN trop long");

export const ibanSchema = ibanString.refine(
  (v) => isValidIbanChecksum(normalizeIban(v)),
  { message: "IBAN invalide (vérifiez le numéro et le pays)" },
);

export const optionalIbanSchema = z
  .string()
  .max(42)
  .refine((v) => !v.trim() || isValidIbanChecksum(normalizeIban(v)), {
    message: "IBAN invalide (vérifiez le numéro)",
  });

export const bicSchema = z.string().max(11);
