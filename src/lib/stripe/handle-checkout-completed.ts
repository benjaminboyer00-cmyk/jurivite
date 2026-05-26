import type Stripe from "stripe";

import { grantPurchaseFromCheckout } from "@/lib/db/entitlements";
import { isDocumentSlug, type DocumentSlug } from "@/lib/documents/registry";
import type { OneShotProduct, Plan } from "@/lib/plans";
import {
  applyPlanToUser,
  resolvePlanFromSubscription,
  resolveUserIdFromCheckoutSession,
} from "@/lib/stripe/sync-user-plan";
import { stripe } from "@/lib/stripe";

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const userId = await resolveUserIdFromCheckoutSession(session);
  if (!userId) return;

  const customerId =
    typeof session.customer === "string" ? session.customer : null;

  if (session.mode === "payment") {
    const product = session.metadata?.product as OneShotProduct | undefined;
    const slug = session.metadata?.slug;

    if (product === "single_doc" && slug && isDocumentSlug(slug)) {
      await grantPurchaseFromCheckout({
        userId,
        type: "single_doc",
        stripeCheckoutSessionId: session.id,
        slug: slug as DocumentSlug,
      });
    } else if (product === "pack_essential") {
      await grantPurchaseFromCheckout({
        userId,
        type: "pack_essential",
        stripeCheckoutSessionId: session.id,
      });
    }
    return;
  }

  if (session.mode === "subscription") {
    const subscriptionId = session.subscription as string | null;
    let plan: Plan = "pro";

    if (subscriptionId && stripe) {
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      plan = await resolvePlanFromSubscription(sub);
    } else if (session.metadata?.plan === "pro") {
      plan = "pro";
    }

    await applyPlanToUser(userId, plan, customerId, subscriptionId);
  }
}
