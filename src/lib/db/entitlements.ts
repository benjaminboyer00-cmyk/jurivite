import { and, desc, eq, gt, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { documentEntitlements, purchases } from "@/db/schema";
import type { DocumentSlug } from "@/lib/documents/registry";
import {
  PACK_ESSENTIAL_DOCUMENTS,
  PACK_ESSENTIAL_UPDATE_MONTHS,
  type Plan,
} from "@/lib/plans";
import { hasPaidSubscription } from "@/lib/plans";

type PurchaseType = "single_doc" | "pack_essential";

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export type DocumentAccess = {
  canDownloadWithoutWatermark: boolean;
  source: "subscription" | "entitlement" | "pack_credit" | "none";
  packCreditsRemaining: number;
};

export async function getPackCreditsRemaining(userId: string): Promise<number> {
  if (!db) return 0;

  const [row] = await db
    .select({
      total: sql<number>`coalesce(sum(${purchases.documentsRemaining}), 0)::int`,
    })
    .from(purchases)
    .where(
      and(
        eq(purchases.userId, userId),
        eq(purchases.type, "pack_essential"),
        gt(purchases.documentsRemaining, 0),
      ),
    );

  return row?.total ?? 0;
}

async function findActiveEntitlement(userId: string, slug: DocumentSlug) {
  if (!db) return null;

  const now = new Date();
  return db.query.documentEntitlements.findFirst({
    where: and(
      eq(documentEntitlements.userId, userId),
      eq(documentEntitlements.slug, slug),
      or(
        eq(documentEntitlements.updatesForever, 1),
        gt(documentEntitlements.updatesUntil, now),
      ),
    ),
  });
}

export async function getDocumentAccess(
  userId: string,
  slug: DocumentSlug,
  plan: Plan,
): Promise<DocumentAccess> {
  if (hasPaidSubscription(plan)) {
    return {
      canDownloadWithoutWatermark: true,
      source: "subscription",
      packCreditsRemaining: await getPackCreditsRemaining(userId),
    };
  }

  const entitlement = await findActiveEntitlement(userId, slug);
  if (entitlement) {
    return {
      canDownloadWithoutWatermark: true,
      source: "entitlement",
      packCreditsRemaining: await getPackCreditsRemaining(userId),
    };
  }

  const credits = await getPackCreditsRemaining(userId);
  if (credits > 0) {
    return {
      canDownloadWithoutWatermark: true,
      source: "pack_credit",
      packCreditsRemaining: credits,
    };
  }

  return {
    canDownloadWithoutWatermark: false,
    source: "none",
    packCreditsRemaining: 0,
  };
}

/** Consomme un crédit pack si nécessaire et crée l'entitlement pour le slug. */
export async function ensureEntitlementOnGenerate(
  userId: string,
  slug: DocumentSlug,
  plan: Plan,
): Promise<void> {
  if (!db || hasPaidSubscription(plan)) return;

  const existing = await findActiveEntitlement(userId, slug);
  if (existing) return;

  const activePack = await db.query.purchases.findFirst({
    where: and(
      eq(purchases.userId, userId),
      eq(purchases.type, "pack_essential"),
      gt(purchases.documentsRemaining, 0),
    ),
    orderBy: [desc(purchases.createdAt)],
  });

  if (!activePack) return;

  await db.insert(documentEntitlements).values({
    userId,
    slug,
    purchaseId: activePack.id,
    updatesForever: 0,
    updatesUntil: activePack.updatesUntil,
  });

  await db
    .update(purchases)
    .set({
      documentsRemaining: activePack.documentsRemaining - 1,
    })
    .where(eq(purchases.id, activePack.id));
}

export async function grantPurchaseFromCheckout(params: {
  userId: string;
  type: PurchaseType;
  stripeCheckoutSessionId: string;
  slug?: DocumentSlug;
}): Promise<void> {
  if (!db) return;

  const existing = await db.query.purchases.findFirst({
    where: eq(purchases.stripeCheckoutSessionId, params.stripeCheckoutSessionId),
  });
  if (existing) return;

  if (params.type === "single_doc" && params.slug) {
    const [purchase] = await db
      .insert(purchases)
      .values({
        userId: params.userId,
        type: "single_doc",
        stripeCheckoutSessionId: params.stripeCheckoutSessionId,
        documentsRemaining: 0,
      })
      .returning({ id: purchases.id });

    await db.insert(documentEntitlements).values({
      userId: params.userId,
      slug: params.slug,
      purchaseId: purchase?.id,
      updatesForever: 1,
      updatesUntil: null,
    });
    return;
  }

  if (params.type === "pack_essential") {
    const updatesUntil = addMonths(new Date(), PACK_ESSENTIAL_UPDATE_MONTHS);
    await db.insert(purchases).values({
      userId: params.userId,
      type: "pack_essential",
      stripeCheckoutSessionId: params.stripeCheckoutSessionId,
      documentsRemaining: PACK_ESSENTIAL_DOCUMENTS,
      updatesUntil,
    });
  }
}

export async function listUserEntitlements(userId: string) {
  if (!db) return [];
  return db.query.documentEntitlements.findMany({
    where: eq(documentEntitlements.userId, userId),
    orderBy: [desc(documentEntitlements.createdAt)],
  });
}
