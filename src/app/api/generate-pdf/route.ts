import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  saveGeneratedDocument,
  upsertCompany,
} from "@/lib/db/documents";
import {
  getDocumentBySlug,
  isDocumentSlug,
} from "@/lib/documents/registry";
import { generatePdfBuffer } from "@/lib/pdf/generate";
import { validatePdfPayload } from "@/lib/schemas/pdf-payloads";
import { companySchema } from "@/lib/schemas/company";

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

    const { slug, data } = parsed.data;

    if (!isDocumentSlug(slug)) {
      return NextResponse.json(
        { error: "Type de document inconnu" },
        { status: 400 },
      );
    }

    const validated = validatePdfPayload(slug, data);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const session = await auth();
    let isPro = false;

    if (session?.user?.id && db) {
      const user = await db.query.users.findFirst({
        where: eq(users.id, session.user.id),
      });
      isPro = user?.plan === "pro";
    }

    const withWatermark = !isPro;
    const pdfBuffer = await generatePdfBuffer(
      slug,
      validated.data,
      withWatermark,
    );

    const docMeta = getDocumentBySlug(slug)!;
    const fileName = `jurivite-${slug}-${Date.now()}.pdf`;

    if (session?.user?.id && db) {
      const companyParse = companySchema.safeParse(validated.data);
      let companyId: string | undefined;

      if (companyParse.success) {
        companyId = await upsertCompany(session.user.id, companyParse.data);
      }

      await saveGeneratedDocument({
        userId: session.user.id,
        slug,
        formData: validated.data,
        fileName,
        hasWatermark: withWatermark,
        companyId,
      });
    }

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "X-Document-Title": encodeURIComponent(docMeta.title),
        "X-Has-Watermark": withWatermark ? "1" : "0",
      },
    });
  } catch (error) {
    console.error("[generate-pdf]", error);
    return NextResponse.json(
      {
        error:
          "Erreur lors de la génération PDF. Vérifiez que Puppeteer est installé.",
      },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
