import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { companies, documents } from "@/db/schema";
import type { CompanyFields } from "@/lib/schemas/company";
import type { DocumentSlug } from "@/lib/documents/registry";
import { getDocumentBySlug } from "@/lib/documents/registry";

export async function upsertCompany(
  userId: string,
  company: CompanyFields,
): Promise<string> {
  if (!db) throw new Error("Base de données non configurée");

  const existing = await db.query.companies.findFirst({
    where: eq(companies.userId, userId),
    orderBy: [desc(companies.updatedAt)],
  });

  if (existing) {
    await db
      .update(companies)
      .set({ ...company, updatedAt: new Date() })
      .where(eq(companies.id, existing.id));
    return existing.id;
  }

  const [created] = await db
    .insert(companies)
    .values({ userId, ...company })
    .returning({ id: companies.id });

  return created.id;
}

export async function saveGeneratedDocument({
  userId,
  slug,
  formData,
  fileName,
  hasWatermark,
  companyId,
}: {
  userId: string;
  slug: DocumentSlug;
  formData: Record<string, unknown>;
  fileName: string;
  hasWatermark: boolean;
  companyId?: string;
}) {
  if (!db) return null;

  const doc = getDocumentBySlug(slug);
  const [row] = await db
    .insert(documents)
    .values({
      userId,
      companyId,
      slug,
      title: doc?.title ?? slug,
      fileName,
      formData,
      hasWatermark: hasWatermark ? 1 : 0,
    })
    .returning();

  return row;
}

export async function getUserDocuments(userId: string) {
  if (!db) return [];

  return db.query.documents.findMany({
    where: eq(documents.userId, userId),
    orderBy: [desc(documents.createdAt)],
    limit: 50,
  });
}
