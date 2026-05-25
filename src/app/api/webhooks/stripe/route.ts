import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { db } from "@/db";
import { users } from "@/db/schema";
import { stripe } from "@/lib/stripe";

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

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const customerId = session.customer as string | null;
      const subscriptionId = session.subscription as string | null;

      if (userId) {
        await db
          .update(users)
          .set({
            plan: "pro",
            stripeCustomerId: customerId ?? undefined,
            stripeSubscriptionId: subscriptionId ?? undefined,
          })
          .where(eq(users.id, userId));
      }
      break;
    }
    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const isActive =
        subscription.status === "active" ||
        subscription.status === "trialing";

      await db
        .update(users)
        .set({
          plan: isActive ? "pro" : "free",
          stripeSubscriptionId: subscription.id,
        })
        .where(eq(users.stripeCustomerId, customerId));
      break;
    }
  }

  return NextResponse.json({ received: true });
}

export const runtime = "nodejs";
