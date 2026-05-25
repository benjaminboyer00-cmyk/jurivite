import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { captureServerError } from "@/lib/observability/sentry";
import { generateDocument } from "@/lib/pdf/document-service";

const bodySchema = z.object({
  slug: z.string(),
  data: z.record(z.string(), z.unknown()),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }

    const session = await auth();
    const result = await generateDocument({
      slug: parsed.data.slug,
      data: parsed.data.data,
      userId: session?.user?.id,
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
        "X-Document-Title": encodeURIComponent(result.title),
        "X-Has-Watermark": result.withWatermark ? "1" : "0",
      },
    });
  } catch (error) {
    captureServerError(error, { route: "generate-pdf" });
    return NextResponse.json(
      { error: "Erreur lors de la génération PDF." },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
