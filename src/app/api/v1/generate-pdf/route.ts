import { NextResponse } from "next/server";
import { z } from "zod";

import { verifyApiKey } from "@/lib/db/api-keys";
import { generateDocument } from "@/lib/pdf/document-service";

const bodySchema = z.object({
  slug: z.string(),
  data: z.record(z.string(), z.unknown()),
});

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return NextResponse.json(
      { error: "Header Authorization: Bearer <clé_api> requis" },
      { status: 401 },
    );
  }

  const apiAuth = await verifyApiKey(token);
  if (!apiAuth) {
    return NextResponse.json({ error: "Clé API invalide" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }

    const result = await generateDocument({
      slug: parsed.data.slug,
      data: parsed.data.data,
      userId: apiAuth.userId,
      plan: "business",
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return new NextResponse(new Uint8Array(result.pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${result.fileName}"`,
        "X-Has-Watermark": "0",
      },
    });
  } catch (error) {
    console.error("[api/v1/generate-pdf]", error);
    return NextResponse.json({ error: "Erreur génération PDF" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
