import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";
import { documents, users } from "@/db/schema";
import { isDocumentSlug } from "@/lib/documents/registry";
import { generatePdfBuffer } from "@/lib/pdf/generate";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: RouteContext) {
  if (!db) {
    return NextResponse.json({ error: "DB non configurée" }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { id } = await context.params;

  const doc = await db.query.documents.findFirst({
    where: and(
      eq(documents.id, id),
      eq(documents.userId, session.user.id),
    ),
  });

  if (!doc || !isDocumentSlug(doc.slug)) {
    return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  const plan = user?.plan ?? "free";
  const withWatermark = plan !== "pro" && plan !== "business";

  const pdfBuffer = await generatePdfBuffer(
    doc.slug,
    doc.formData as Record<string, unknown>,
    withWatermark,
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${doc.fileName}"`,
    },
  });
}

export const runtime = "nodejs";
export const maxDuration = 60;
