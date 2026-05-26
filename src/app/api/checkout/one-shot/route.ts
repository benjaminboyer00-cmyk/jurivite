import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { documentSlugs } from "@/lib/documents/registry";
import {
  formatPriceEur,
  ONE_SHOT_PRODUCTS,
  stripePriceIdForOneShot,
  type OneShotProduct,
} from "@/lib/plans";
import { stripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/seo";

const slugTuple = documentSlugs as [
  (typeof documentSlugs)[number],
  ...(typeof documentSlugs)[number][],
];

const bodySchema = z.object({
  product: z.enum(["single_doc", "pack_essential"]),
  slug: z.enum(slugTuple).optional(),
  acceptedCgv: z.literal(true, {
    error: "Acceptation des CGV requise",
  }),
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
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
      { status: 400 },
    );
  }

  const { product } = parsed.data;

  if (product === "single_doc" && !parsed.data.slug) {
    return NextResponse.json(
      { error: "Choisissez le document à débloquer." },
      { status: 400 },
    );
  }

  const priceId = stripePriceIdForOneShot(product);
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          product === "single_doc"
            ? "STRIPE_PRICE_ID_SINGLE_DOC manquant"
            : "STRIPE_PRICE_ID_PACK_ESSENTIAL manquant",
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

  const productInfo = ONE_SHOT_PRODUCTS[product as OneShotProduct];
  const slug = parsed.data.slug;

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: session.user.id,
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: slug
      ? `${siteConfig.url}/generate/${slug}?checkout=success&product=${product}`
      : `${siteConfig.url}/dashboard?checkout=success&product=${product}`,
    cancel_url: slug
      ? `${siteConfig.url}/generate/${slug}?checkout=cancel`
      : `${siteConfig.url}/tarifs?checkout=cancel`,
    metadata: {
      userId: session.user.id,
      product,
      acceptedCgv: "true",
      ...(slug ? { slug } : {}),
    },
    custom_text: {
      submit: {
        message: `${productInfo.label} — ${formatPriceEur(productInfo.price)} TTC`,
      },
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
