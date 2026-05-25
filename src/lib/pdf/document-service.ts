import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { canGeneratePdf } from "@/lib/db/usage";
import {
  saveGeneratedDocument,
  upsertCompany,
} from "@/lib/db/documents";
import {
  getDocumentBySlug,
  isDocumentSlug,
  type DocumentSlug,
} from "@/lib/documents/registry";
import { generatePdfBuffer } from "@/lib/pdf/generate";
import type { Plan } from "@/lib/plans";
import { hasNoWatermark } from "@/lib/plans";
import { validatePdfPayload } from "@/lib/schemas/pdf-payloads";
import { companySchema } from "@/lib/schemas/company";

export type GenerateDocumentInput = {
  slug: string;
  data: Record<string, unknown>;
  userId?: string;
  plan?: Plan;
};

export type GenerateDocumentResult =
  | {
      ok: true;
      pdfBuffer: Buffer;
      fileName: string;
      withWatermark: boolean;
      title: string;
    }
  | { ok: false; status: number; error: string };

export async function resolveUserPlan(userId: string): Promise<Plan> {
  if (!db) return "free";
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return (user?.plan as Plan) ?? "free";
}

export async function generateDocument(
  input: GenerateDocumentInput,
): Promise<GenerateDocumentResult> {
  const { slug, data, userId } = input;

  if (!isDocumentSlug(slug)) {
    return { ok: false, status: 400, error: "Type de document inconnu" };
  }

  const validated = validatePdfPayload(slug, data);
  if (!validated.success) {
    return { ok: false, status: 400, error: validated.error };
  }

  let plan: Plan = input.plan ?? "free";

  if (userId && !input.plan) {
    plan = await resolveUserPlan(userId);
  }

  if (userId) {
    const quota = await canGeneratePdf(userId, plan);
    if (!quota.allowed) {
      return { ok: false, status: 402, error: quota.reason! };
    }
  }

  const withWatermark = !hasNoWatermark(plan);
  const pdfBuffer = await generatePdfBuffer(
    slug as DocumentSlug,
    validated.data,
    withWatermark,
  );

  const docMeta = getDocumentBySlug(slug)!;
  const fileName = `jurivite-${slug}-${Date.now()}.pdf`;

  if (userId && db) {
    const companyParse = companySchema.safeParse(validated.data);
    let companyId: string | undefined;

    if (companyParse.success) {
      companyId = await upsertCompany(userId, companyParse.data);
    }

    await saveGeneratedDocument({
      userId,
      slug: slug as DocumentSlug,
      formData: validated.data,
      fileName,
      hasWatermark: withWatermark,
      companyId,
    });
  }

  return {
    ok: true,
    pdfBuffer,
    fileName,
    withWatermark,
    title: docMeta.title,
  };
}
