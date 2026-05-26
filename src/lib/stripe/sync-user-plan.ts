import { eq } from "drizzle-orm";
import type Stripe from "stripe";

import { db } from "@/db";
import { users } from "@/db/schema";
import { normalizeEmail } from "@/lib/auth/email";
import { findUserByEmail } from "@/lib/auth/user-repository";
import type { Plan } from "@/lib/plans";
import { planFromStripePriceId } from "@/lib/plans";
import { stripe } from "@/lib/stripe";

export async function resolvePlanFromSubscription(
  subscription: Stripe.Subscription,
): Promise<Plan> {
  const isActive =
    subscription.status === "active" ||
    subscription.status === "trialing";

  if (!isActive) return "free";

  const priceId = subscription.items.data[0]?.price?.id;
  if (priceId) {
    const mapped = planFromStripePriceId(priceId);
    if (mapped) return mapped;
  }

  const metaPlan = subscription.metadata?.plan as Plan | undefined;
  if (metaPlan === "pro") return metaPlan;
  if (metaPlan === "business") return "business";

  return "pro";
}

export async function resolveUserIdFromCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<string | null> {
  if (!db) return null;

  if (session.metadata?.userId) {
    return session.metadata.userId;
  }

  if (session.client_reference_id) {
    return session.client_reference_id;
  }

  const customerId =
    typeof session.customer === "string" ? session.customer : null;

  if (customerId) {
    const byCustomer = await db.query.users.findFirst({
      where: eq(users.stripeCustomerId, customerId),
    });
    if (byCustomer) return byCustomer.id;
  }

  const email =
    session.customer_details?.email ??
    (typeof session.customer_email === "string"
      ? session.customer_email
      : null);

  if (email) {
    const byEmail = await findUserByEmail(normalizeEmail(email));
    if (byEmail) return byEmail.id;
  }

  return null;
}

export async function applyPlanToUser(
  userId: string,
  plan: Plan,
  stripeCustomerId?: string | null,
  stripeSubscriptionId?: string | null,
): Promise<void> {
  if (!db) return;

  await db
    .update(users)
    .set({
      plan,
      ...(stripeCustomerId ? { stripeCustomerId } : {}),
      ...(stripeSubscriptionId ? { stripeSubscriptionId } : {}),
    })
    .where(eq(users.id, userId));
}

export async function syncPlanFromSubscriptionId(
  subscriptionId: string,
): Promise<void> {
  if (!stripe || !db) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const plan = await resolvePlanFromSubscription(subscription);
  const customerId = subscription.customer as string;

  await db
    .update(users)
    .set({
      plan,
      stripeSubscriptionId: subscription.id,
    })
    .where(eq(users.stripeCustomerId, customerId));
}
