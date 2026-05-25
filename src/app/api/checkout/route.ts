import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { stripePriceIdForPlan } from "@/lib/plans";
import { stripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/seo";

const bodySchema = z.object({
  plan: z.enum(["pro", "business"]),
});

export async function POST(request: Request) {
  if (!stripe || !db) {
    return NextResponse.json(
      { error: "Stripe ou base de données non configurés" },
      { status: 503 },
    );
  }

  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const json = await request.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(json);
  const plan = parsed.success ? parsed.data.plan : "pro";

  const priceId = stripePriceIdForPlan(plan);
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          plan === "business"
            ? "STRIPE_PRICE_ID_BUSINESS manquant"
            : "STRIPE_PRICE_ID_PRO manquant",
      },
      { status: 503 },
    );
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  let customerId = user?.stripeCustomerId ?? undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name ?? undefined,
      metadata: { userId: session.user.id },
    });
    customerId = customer.id;
    await db
      .update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.id, session.user.id));
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteConfig.url}/dashboard?checkout=success&plan=${plan}`,
    cancel_url: `${siteConfig.url}/tarifs?checkout=cancel`,
    metadata: { userId: session.user.id, plan },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
