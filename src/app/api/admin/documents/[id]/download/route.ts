import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin/auth";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { isDocumentSlug } from "@/lib/documents/registry";
import { captureServerError } from "@/lib/observability/sentry";
import { generateDocument } from "@/lib/pdf/document-service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const gate = await requireAdmin();
  if (!gate.ok) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  if (!db) {
    return NextResponse.json({ error: "DB non configurée" }, { status: 503 });
  }

  const { id } = await context.params;
  const doc = await db.query.documents.findFirst({
    where: eq(documents.id, id),
    with: { user: { columns: { id: true, plan: true } } },
  });

  if (!doc || !isDocumentSlug(doc.slug)) {
    return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
  }

  try {
    const result = await generateDocument({
      slug: doc.slug,
      data: doc.formData as Record<string, unknown>,
      userId: doc.userId,
      plan: doc.user.plan,
      skipPersist: true,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return new NextResponse(new Uint8Array(result.pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${result.fileName}"`,
      },
    });
  } catch (error) {
    captureServerError(error, { documentId: id, admin: true });
    return NextResponse.json({ error: "Erreur PDF" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
