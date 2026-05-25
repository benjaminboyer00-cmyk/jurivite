import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { documents, users } from "@/db/schema";
import type { Plan } from "@/lib/plans";

export async function listRecentUsers(limit = 50) {
  if (!db) return [];

  return db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
    limit,
  });
}

export async function listRecentDocuments(limit = 30) {
  if (!db) return [];

  return db.query.documents.findMany({
    orderBy: [desc(documents.createdAt)],
    limit,
    with: {
      user: {
        columns: { id: true, email: true, plan: true },
      },
    },
  });
}

export async function updateUserPlan(userId: string, plan: Plan) {
  if (!db) throw new Error("Base de données non configurée");

  await db.update(users).set({ plan }).where(eq(users.id, userId));
}

export async function getDocumentById(documentId: string) {
  if (!db) return null;

  return db.query.documents.findFirst({
    where: eq(documents.id, documentId),
    with: {
      user: {
        columns: { id: true, email: true, plan: true },
      },
    },
  });
}

export async function updateDocumentFormData(
  documentId: string,
  formData: Record<string, unknown>,
) {
  if (!db) throw new Error("Base de données non configurée");

  await db
    .update(documents)
    .set({ formData })
    .where(eq(documents.id, documentId));
}
