import type { documents, signingRequests } from "@/db/schema";
import { buildSigningUrl } from "@/lib/signing/urls";
import type { DocumentSlug } from "@/lib/documents/registry";
import { getDocumentBySlug } from "@/lib/documents/registry";
import { isSignatureHubSlug } from "@/lib/signing/constants";

type Doc = typeof documents.$inferSelect;
type SigningRow = typeof signingRequests.$inferSelect & { document?: Doc };

export type SignatureWorkspaceStatus =
  | "draft"
  | "pending"
  | "signed"
  | "expired"
  | "cancelled";

export type SignatureWorkspaceItem = {
  documentId: string;
  title: string;
  slug: DocumentSlug;
  slugLabel: string;
  clientName: string;
  clientEmail: string | null;
  amount: string | null;
  documentCreatedAt: Date;
  status: SignatureWorkspaceStatus;
  signingUrl: string | null;
  signedAt: Date | null;
  expiresAt: Date | null;
  hasWatermark: boolean;
  fileName: string;
};

export type SignatureWorkspaceStats = {
  draft: number;
  pending: number;
  signed: number;
  expired: number;
};

function resolveStatus(
  doc: Doc,
  signing: SigningRow | undefined,
): SignatureWorkspaceStatus {
  const formData = doc.formData as Record<string, unknown>;
  if (formData.hasClientSignature) return "signed";
  if (!signing) return "draft";
  if (signing.status === "signed") return "signed";
  if (
    signing.status === "pending" &&
    signing.expiresAt &&
    signing.expiresAt < new Date()
  ) {
    return "expired";
  }
  if (signing.status === "expired") return "expired";
  if (signing.status === "cancelled") return "cancelled";
  return "pending";
}

function extractSignedAt(
  doc: Doc,
  signing: SigningRow | undefined,
): Date | null {
  if (signing?.signedAt) return signing.signedAt;
  const formData = doc.formData as Record<string, unknown>;
  if (!formData.hasClientSignature) return null;
  const label = String(formData.clientSignedAt ?? "").trim();
  if (!label) return null;
  const parsed = new Date(label);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function extractClientName(doc: Doc, signing?: SigningRow): string {
  if (signing?.clientName) return signing.clientName;
  const formData = doc.formData as Record<string, unknown>;
  return String(
    formData.clientName ??
      formData.recipientName ??
      formData.traineeName ??
      "Client",
  );
}

function extractAmount(doc: Doc): string | null {
  const formData = doc.formData as Record<string, unknown>;
  const price = formData.price ?? formData.assignmentPrice;
  if (typeof price === "string" && price.trim()) return price.trim();
  if (typeof price === "number") return `${price} €`;
  return null;
}

export function buildSignatureWorkspace(
  docs: Doc[],
  signingRows: SigningRow[],
  siteUrl: string,
): SignatureWorkspaceItem[] {
  const hubDocs = docs.filter((d) => isSignatureHubSlug(d.slug));
  const hubDocIds = new Set(hubDocs.map((d) => d.id));
  const latestSigningByDoc = new Map<string, SigningRow>();

  for (const row of signingRows) {
    if (!hubDocIds.has(row.documentId)) continue;
    const existing = latestSigningByDoc.get(row.documentId);
    if (!existing || row.createdAt > existing.createdAt) {
      latestSigningByDoc.set(row.documentId, row);
    }
  }

  const items = hubDocs.map((doc) => {
    const signing = latestSigningByDoc.get(doc.id);
    const status = resolveStatus(doc, signing);
    const meta = getDocumentBySlug(doc.slug as DocumentSlug);

    return {
      documentId: doc.id,
      title: doc.title,
      slug: doc.slug as DocumentSlug,
      slugLabel: meta?.shortTitle ?? doc.slug,
      clientName: extractClientName(doc, signing),
      clientEmail: signing?.clientEmail ?? null,
      amount: extractAmount(doc),
      documentCreatedAt: doc.createdAt,
      status,
      signingUrl:
        status === "pending" && signing?.token
          ? buildSigningUrl(signing.token, siteUrl)
          : null,
      signedAt: extractSignedAt(doc, signing),
      expiresAt: signing?.expiresAt ?? null,
      hasWatermark: Boolean(doc.hasWatermark),
      fileName: doc.fileName,
    };
  });

  const order: Record<SignatureWorkspaceStatus, number> = {
    pending: 0,
    draft: 1,
    expired: 2,
    cancelled: 3,
    signed: 4,
  };

  return items.sort((a, b) => {
    const byStatus = order[a.status] - order[b.status];
    if (byStatus !== 0) return byStatus;
    return b.documentCreatedAt.getTime() - a.documentCreatedAt.getTime();
  });
}

export function computeSignatureStats(
  items: SignatureWorkspaceItem[],
): SignatureWorkspaceStats {
  return items.reduce(
    (acc, item) => {
      if (item.status === "draft") acc.draft += 1;
      else if (item.status === "pending") acc.pending += 1;
      else if (item.status === "signed") acc.signed += 1;
      else if (item.status === "expired") acc.expired += 1;
      return acc;
    },
    { draft: 0, pending: 0, signed: 0, expired: 0 },
  );
}

export function filterSignatureItems(
  items: SignatureWorkspaceItem[],
  filter: "all" | SignatureWorkspaceStatus,
): SignatureWorkspaceItem[] {
  if (filter === "all") return items;
  return items.filter((item) => item.status === filter);
}
