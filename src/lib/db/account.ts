import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { stripe } from "@/lib/stripe";

export async function deleteUserAccount(userId: string): Promise<void> {
  if (!db) {
    throw new Error("Base de données non configurée");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  if (stripe && user.stripeSubscriptionId) {
    try {
      await stripe.subscriptions.cancel(user.stripeSubscriptionId);
    } catch {
      /* abonnement déjà annulé ou inexistant */
    }
  }

  await db.delete(users).where(eq(users.id, userId));
}
