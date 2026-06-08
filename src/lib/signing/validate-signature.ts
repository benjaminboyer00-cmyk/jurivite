const MAX_SIGNATURE_BYTES = 400_000;

export function isValidSignatureDataUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (!value.startsWith("data:image/png;base64,")) return false;
  if (value.length > MAX_SIGNATURE_BYTES) return false;
  return true;
}
