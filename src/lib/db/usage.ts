import { and, eq, gte, sql } from "drizzle-orm";

import { db } from "@/db";
import { documents } from "@/db/schema";
import type { Plan } from "@/lib/plans";
import { getMonthlyLimit } from "@/lib/plans";

function startOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export async function countMonthlyPdfGenerations(
  userId: string,
): Promise<number> {
  if (!db) return 0;

  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(documents)
    .where(
      and(
        eq(documents.userId, userId),
        gte(documents.createdAt, startOfCurrentMonth()),
      ),
    );

  return row?.count ?? 0;
}

export async function canGeneratePdf(
  userId: string,
  plan: Plan,
): Promise<{ allowed: boolean; used: number; limit: number | null; reason?: string }> {
  const limit = getMonthlyLimit(plan);

  if (limit === null) {
    return { allowed: true, used: 0, limit: null };
  }

  const used = await countMonthlyPdfGenerations(userId);

  if (used >= limit) {
    return {
      allowed: false,
      used,
      limit,
      reason: `Quota atteint : ${limit} PDF par mois (plan ${plan}). Passez Business pour l'illimité.`,
    };
  }

  return { allowed: true, used, limit };
}
