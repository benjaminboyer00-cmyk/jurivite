import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { db } from "@/db";
import { users } from "@/db/schema";
import { captureServerError } from "@/lib/observability/sentry";
import type { Plan } from "@/lib/plans";
import {
  applyPlanToUser,
  resolvePlanFromSubscription,
  resolveUserIdFromCheckoutSession,
} from "@/lib/stripe/sync-user-plan";
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
    captureServerError(err, { route: "stripe-webhook-verify" });
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  console.info(`[stripe webhook] ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = await resolveUserIdFromCheckoutSession(session);
        const customerId = session.customer as string | null;
        const subscriptionId = session.subscription as string | null;

        let plan: Plan =
          session.metadata?.plan === "business" ? "business" : "pro";

        if (subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          plan = await resolvePlanFromSubscription(sub);
        }

        if (!userId) {
          console.warn(
            `[stripe webhook] checkout.session.completed — utilisateur introuvable (session ${session.id})`,
          );
          break;
        }

        await applyPlanToUser(userId, plan, customerId, subscriptionId);

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
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        await db
          .update(users)
          .set({ plan: "free" })
          .where(eq(users.stripeCustomerId, customerId));
        console.warn(
          `[stripe webhook] invoice.payment_failed — plan free pour customer ${customerId}`,
        );
        break;
      }
      default:
        console.info(`[stripe webhook] événement ignoré : ${event.type}`);
    }
  } catch (err) {
    captureServerError(err, { route: "stripe-webhook-handler", type: event.type });
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

export const runtime = "nodejs";
