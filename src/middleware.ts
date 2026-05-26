import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { enforceRateLimit } from "@/lib/security/apply-rate-limit";
import { RATE_LIMITS } from "@/lib/security/rate-limit";
import { applyProductionSecurityHeaders } from "@/lib/security/security-headers";

async function applyApiRateLimits(
  request: NextRequest,
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/auth/register") {
    return enforceRateLimit(request, "register", RATE_LIMITS.register);
  }

  if (pathname === "/api/generate-pdf" || pathname === "/api/v1/generate-pdf") {
    return enforceRateLimit(request, "pdf", RATE_LIMITS.pdf);
  }

  if (
    pathname === "/api/checkout" ||
    pathname === "/api/checkout/one-shot"
  ) {
    return enforceRateLimit(request, "checkout", RATE_LIMITS.checkout);
  }

  if (pathname === "/api/api-keys") {
    return enforceRateLimit(request, "api-keys", RATE_LIMITS.apiKey);
  }

  if (
    pathname.startsWith("/api/auth/") &&
    !pathname.includes("/callback/") &&
    request.method === "POST"
  ) {
    return enforceRateLimit(request, "auth", RATE_LIMITS.auth);
  }

  return null;
}

export default auth(async (req) => {
  const rateLimited = await applyApiRateLimits(req);
  if (rateLimited) return applyProductionSecurityHeaders(rateLimited);

  const isLoggedIn = !!req.auth;
  const { pathname, search } = req.nextUrl;

  if (
    !isLoggedIn &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))
  ) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return applyProductionSecurityHeaders(
      NextResponse.redirect(loginUrl),
    );
  }

  return applyProductionSecurityHeaders(NextResponse.next());
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/auth/:path*",
    "/api/auth/register",
    "/api/generate-pdf",
    "/api/v1/generate-pdf",
    "/api/checkout",
    "/api/checkout/one-shot",
    "/api/api-keys",
  ],
};
