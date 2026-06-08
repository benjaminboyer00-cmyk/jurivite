import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

import { completeSigning, getSigningRequestByToken } from "@/lib/db/signing";
import { captureServerError } from "@/lib/observability/sentry";
import { isValidSignatureDataUrl } from "@/lib/signing/validate-signature";

const signBodySchema = z.object({
  signatureDataUrl: z.string(),
});

type RouteContext = { params: Promise<{ token: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { token } = await context.params;
  const request_ = await getSigningRequestByToken(token);

  if (!request_) {
    return NextResponse.json({ error: "Lien introuvable" }, { status: 404 });
  }

  const formData = request_.document.formData as Record<string, unknown>;

  return NextResponse.json({
    status: request_.status,
    clientName: request_.clientName,
    documentTitle: request_.document.title,
    companyName: String(formData.companyName ?? ""),
    expiresAt: request_.expiresAt.toISOString(),
    signedAt: request_.signedAt?.toISOString() ?? null,
  });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { token } = await context.params;

  let signatureDataUrl: string;
  try {
    const json = await request.json();
    const parsed = signBodySchema.safeParse(json);
    if (!parsed.success || !isValidSignatureDataUrl(parsed.data.signatureDataUrl)) {
      return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
    }
    signatureDataUrl = parsed.data.signatureDataUrl;
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide" }, { status: 400 });
  }

  try {
    const result = await completeSigning({ token, signatureDataUrl });
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    captureServerError(error, { route: "sign-submit", token });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export const runtime = "nodejs";
