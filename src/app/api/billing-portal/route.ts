import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { captureServerError } from "@/lib/observability/sentry";
import { siteConfig } from "@/lib/seo";
import { stripe } from "@/lib/stripe";

export async function POST() {
  if (!stripe || !db) {
    return NextResponse.json(
      { error: "Stripe non configuré" },
      { status: 503 },
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: "Aucun abonnement Stripe associé à ce compte." },
        { status: 400 },
      );
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${siteConfig.url}/dashboard`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (error) {
    captureServerError(error, { route: "billing-portal" });
    return NextResponse.json(
      { error: "Impossible d'ouvrir le portail de facturation." },
      { status: 500 },
    );
  }
}
