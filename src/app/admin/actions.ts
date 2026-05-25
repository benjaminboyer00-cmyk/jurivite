"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin/auth";
import {
  getDocumentById,
  updateDocumentFormData,
  updateUserPlan,
} from "@/lib/db/admin";
import { isDocumentSlug } from "@/lib/documents/registry";
import { generateDocument } from "@/lib/pdf/document-service";
import type { Plan } from "@/lib/plans";

export async function adminSetUserPlan(userId: string, plan: Plan) {
  const gate = await requireAdmin();
  if (!gate.ok) return { ok: false, error: "Accès refusé" };

  await updateUserPlan(userId, plan);
  revalidatePath("/admin");
  return { ok: true };
}

export async function adminUpdateDocumentFormData(
  documentId: string,
  formDataJson: string,
) {
  const gate = await requireAdmin();
  if (!gate.ok) return { ok: false, error: "Accès refusé" };

  let formData: Record<string, unknown>;
  try {
    formData = JSON.parse(formDataJson) as Record<string, unknown>;
  } catch {
    return { ok: false, error: "JSON invalide" };
  }

  await updateDocumentFormData(documentId, formData);
  revalidatePath("/admin");
  return { ok: true };
}

export async function adminRegenerateDocument(documentId: string) {
  const gate = await requireAdmin();
  if (!gate.ok) return { ok: false, error: "Accès refusé" };

  const doc = await getDocumentById(documentId);
  if (!doc || !isDocumentSlug(doc.slug)) {
    return { ok: false, error: "Document introuvable" };
  }

  const result = await generateDocument({
    slug: doc.slug,
    data: doc.formData as Record<string, unknown>,
    userId: doc.userId,
    plan: doc.user.plan,
    skipPersist: true,
  });

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  revalidatePath("/admin");
  return {
    ok: true,
    fileName: result.fileName,
    withWatermark: result.withWatermark,
  };
}
