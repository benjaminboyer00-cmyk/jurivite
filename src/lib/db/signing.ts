import { randomBytes } from "crypto";
import { and, desc, eq, gt } from "drizzle-orm";

import { db } from "@/db";
import { documents, signingRequests } from "@/db/schema";
import type { DocumentSlug } from "@/lib/documents/registry";
import { SIGNING_LINK_TTL_DAYS } from "@/lib/signing/constants";

function generateSigningToken(): string {
  return randomBytes(32).toString("base64url");
}

function signingExpiresAt(): Date {
  const d = new Date();
  d.setDate(d.getDate() + SIGNING_LINK_TTL_DAYS);
  return d;
}

export async function createSigningRequest({
  documentId,
  userId,
  clientName,
  clientEmail,
}: {
  documentId: string;
  userId: string;
  clientName: string;
  clientEmail?: string;
}) {
  if (!db) throw new Error("Base de données non configurée");

  await db
    .update(signingRequests)
    .set({ status: "cancelled" })
    .where(
      and(
        eq(signingRequests.documentId, documentId),
        eq(signingRequests.status, "pending"),
      ),
    );

  const [row] = await db
    .insert(signingRequests)
    .values({
      documentId,
      userId,
      token: generateSigningToken(),
      clientName,
      clientEmail: clientEmail?.trim() || null,
      expiresAt: signingExpiresAt(),
    })
    .returning();

  return row;
}

export async function getSigningRequestByToken(token: string) {
  if (!db) return null;

  const row = await db.query.signingRequests.findFirst({
    where: eq(signingRequests.token, token),
    with: { document: true },
  });

  if (!row) return null;

  if (row.status === "pending" && row.expiresAt < new Date()) {
    await db
      .update(signingRequests)
      .set({ status: "expired" })
      .where(eq(signingRequests.id, row.id));
    return { ...row, status: "expired" as const };
  }

  return row;
}

export async function completeSigning({
  token,
  signatureDataUrl,
}: {
  token: string;
  signatureDataUrl: string;
}) {
  if (!db) throw new Error("Base de données non configurée");

  const request = await getSigningRequestByToken(token);
  if (!request || request.status !== "pending") {
    return { ok: false as const, error: "Lien invalide ou expiré" };
  }

  const signedAt = new Date();
  const signedAtLabel = signedAt.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formData = {
    ...(request.document.formData as Record<string, unknown>),
    clientSignatureDataUrl: signatureDataUrl,
    clientSignedAt: signedAtLabel,
    clientSignerName: request.clientName,
    hasClientSignature: true,
  };

  await db
    .update(documents)
    .set({ formData })
    .where(eq(documents.id, request.documentId));

  await db
    .update(signingRequests)
    .set({
      status: "signed",
      signatureDataUrl,
      signedAt,
    })
    .where(eq(signingRequests.id, request.id));

  return { ok: true as const, documentId: request.documentId };
}

export async function listSigningRequestsForUser(userId: string) {
  if (!db) return [];

  return db.query.signingRequests.findMany({
    where: eq(signingRequests.userId, userId),
    orderBy: [desc(signingRequests.createdAt)],
    with: { document: true },
    limit: 100,
  });
}

export async function getLatestSigningRequest(documentId: string) {
  if (!db) return null;

  return db.query.signingRequests.findFirst({
    where: and(
      eq(signingRequests.documentId, documentId),
      eq(signingRequests.status, "pending"),
      gt(signingRequests.expiresAt, new Date()),
    ),
    orderBy: [desc(signingRequests.createdAt)],
  });
}

export { buildSigningUrl } from "@/lib/signing/urls";
