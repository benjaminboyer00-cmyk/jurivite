const DEFAULT_CALLBACK = "/dashboard";

/** Évite les redirections ouvertes (open redirect). */
export function safeCallbackUrl(
  raw: string | string[] | null | undefined,
  baseUrl: string,
): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return DEFAULT_CALLBACK;
  }
  if (value.includes("://") || value.includes("\\")) {
    return DEFAULT_CALLBACK;
  }
  try {
    const resolved = new URL(value, baseUrl);
    const base = new URL(baseUrl);
    if (resolved.origin !== base.origin) {
      return DEFAULT_CALLBACK;
    }
    return resolved.pathname + resolved.search + resolved.hash;
  } catch {
    return DEFAULT_CALLBACK;
  }
}
