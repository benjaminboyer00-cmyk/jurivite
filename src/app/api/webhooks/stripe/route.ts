import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { db } from "@/db";
import { users } from "@/db/schema";
import type { Plan } from "@/lib/plans";
import { planFromStripePriceId } from "@/lib/plans";
import { stripe } from "@/lib/stripe";

async function resolvePlanFromSubscription(
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
  if (metaPlan === "pro" || metaPlan === "business") return metaPlan;

  return "pro";
}

export async function POST(request: Request) {
  if (!stripe || !db) {
    return NextResponse.json({ error: "Non configuré" }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe webhook]", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  console.info(`[stripe webhook] ${event.type} (${event.id})`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const customerId = session.customer as string | null;
      const subscriptionId = session.subscription as string | null;
      const metaPlan = session.metadata?.plan as Plan | undefined;

      let plan: Plan = metaPlan === "business" ? "business" : "pro";

      if (subscriptionId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        plan = await resolvePlanFromSubscription(sub);
      }

      if (!userId) {
        console.warn(
          "[stripe webhook] checkout.session.completed sans metadata.userId — plan non mis à jour",
        );
        break;
      }

      await db
        .update(users)
        .set({
          plan,
          stripeCustomerId: customerId ?? undefined,
          stripeSubscriptionId: subscriptionId ?? undefined,
        })
        .where(eq(users.id, userId));

      console.info(
        `[stripe webhook] utilisateur ${userId} → plan ${plan} (session ${session.id})`,
      );
      break;
    }
    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const plan = await resolvePlanFromSubscription(subscription);

      const result = await db
        .update(users)
        .set({
          plan,
          stripeSubscriptionId: subscription.id,
        })
        .where(eq(users.stripeCustomerId, customerId))
        .returning({ id: users.id });

      console.info(
        `[stripe webhook] ${event.type} customer ${customerId} → plan ${plan} (${result.length} user(s))`,
      );
      break;
    }
    default:
      console.info(`[stripe webhook] événement ignoré : ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

export const runtime = "nodejs";
