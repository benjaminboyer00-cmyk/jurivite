/** Normalise l'e-mail pour garantir une seule inscription par adresse. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
