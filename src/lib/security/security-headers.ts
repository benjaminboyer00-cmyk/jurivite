import type { NextResponse } from "next/server";

const HSTS_VALUE = "max-age=31536000; includeSubDomains";

/** HSTS en production (ou FORCE_HSTS=1 en staging HTTPS). */
export function shouldSendHsts(): boolean {
  return (
    process.env.NODE_ENV === "production" || process.env.FORCE_HSTS === "1"
  );
}

export function applyProductionSecurityHeaders(
  response: NextResponse,
): NextResponse {
  if (shouldSendHsts()) {
    response.headers.set("Strict-Transport-Security", HSTS_VALUE);
  }
  return response;
}
