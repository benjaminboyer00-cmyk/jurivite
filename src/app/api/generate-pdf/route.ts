import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { captureServerError } from "@/lib/observability/sentry";
import { generateDocument } from "@/lib/pdf/document-service";
import { pdfLog } from "@/lib/pdf/pdf-log";
import { generatePdfBodySchema } from "@/lib/schemas/api-pdf";

function requestMeta(request: Request) {
  return {
    requestId:
      request.headers.get("x-vercel-id") ??
      request.headers.get("x-request-id") ??
      undefined,
    region: process.env.VERCEL_REGION,
    deployment: process.env.VERCEL_DEPLOYMENT_ID,
  };
}

export async function POST(request: Request) {
  const meta = requestMeta(request);

  try {
    const json = await request.json();
    const parsed = generatePdfBodySchema.safeParse(json);

    if (!parsed.success) {
      pdfLog("validate", { ...meta, ok: false, reason: "invalid_body" }, "error");
      return NextResponse.json(
        { error: "Requête invalide", code: "PDF_VALIDATE" },
        { status: 400 },
      );
    }

    pdfLog("validate", {
      ...meta,
      slug: parsed.data.slug,
      ok: true,
    });

    const session = await auth();
    const result = await generateDocument({
      slug: parsed.data.slug,
      data: parsed.data.data,
      userId: session?.user?.id,
    });

    if (!result.ok) {
      pdfLog(
        "complete",
        {
          ...meta,
          slug: parsed.data.slug,
          ok: false,
          status: result.status,
          code: result.code,
        },
        result.status >= 500 ? "error" : "info",
      );
      return NextResponse.json(
        {
          error: result.error,
          code: result.code,
          detail: result.detail,
          requestId: meta.requestId,
        },
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
        ...(meta.requestId ? { "X-Request-Id": meta.requestId } : {}),
      },
    });
  } catch (error) {
    captureServerError(error, { route: "generate-pdf", ...meta });
    pdfLog(
      "complete",
      {
        ...meta,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      "error",
    );
    return NextResponse.json(
      {
        error: "Erreur lors de la génération PDF.",
        code: "PDF_UNHANDLED",
        requestId: meta.requestId,
      },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
