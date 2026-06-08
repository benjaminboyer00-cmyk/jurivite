import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { buildSigningUrl, createSigningRequest } from "@/lib/db/signing";
import { isDocumentSlug } from "@/lib/documents/registry";
import { captureServerError } from "@/lib/observability/sentry";
import { isSignableDocumentSlug } from "@/lib/signing/constants";

const bodySchema = z.object({
  clientName: z.string().trim().min(2).max(120),
  clientEmail: z.string().trim().email().optional().or(z.literal("")),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  if (!db) {
    return NextResponse.json({ error: "DB non configurée" }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { id } = await context.params;

  let body: z.infer<typeof bodySchema>;
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    body = parsed.data;
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide" }, { status: 400 });
  }

  const doc = await db.query.documents.findFirst({
    where: and(
      eq(documents.id, id),
      eq(documents.userId, session.user.id),
    ),
  });

  if (!doc || !isDocumentSlug(doc.slug) || !isSignableDocumentSlug(doc.slug)) {
    return NextResponse.json(
      { error: "Document non éligible à la signature" },
      { status: 404 },
    );
  }

  try {
    const row = await createSigningRequest({
      documentId: doc.id,
      userId: session.user.id,
      clientName: body.clientName,
      clientEmail: body.clientEmail || undefined,
    });

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    return NextResponse.json({
      signingUrl: buildSigningUrl(row.token, siteUrl),
      status: row.status,
      expiresAt: row.expiresAt.toISOString(),
    });
  } catch (error) {
    captureServerError(error, { route: "send-sign", documentId: id });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export const runtime = "nodejs";
