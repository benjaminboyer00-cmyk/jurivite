import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getClientIp } from "@/lib/security/client-ip";
import {
  checkRateLimit,
  rateLimitResponseHeaders,
  type RateLimitConfig,
} from "@/lib/security/rate-limit";

export function enforceRateLimit(
  request: NextRequest,
  bucket: string,
  config: RateLimitConfig,
): NextResponse | null {
  if (request.method !== "POST" && request.method !== "GET") {
    return null;
  }

  const ip = getClientIp(request);
  const key = `${bucket}:${ip}`;
  const result = checkRateLimit(key, config);

  if (result.ok) return null;

  return NextResponse.json(
    {
      error:
        "Trop de requêtes. Réessayez dans quelques minutes ou contactez le support.",
    },
    {
      status: 429,
      headers: rateLimitResponseHeaders(result),
    },
  );
}
