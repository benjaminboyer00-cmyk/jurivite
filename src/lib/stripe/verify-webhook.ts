import type Stripe from "stripe";

export class StripeWebhookVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StripeWebhookVerificationError";
  }
}

/** Vérifie la signature Stripe (constructEvent) — testable sans HTTP. */
export function verifyStripeWebhookEvent(
  stripe: Stripe,
  payload: string | Buffer,
  signature: string,
  webhookSecret: string,
): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (cause) {
    const message =
      cause instanceof Error ? cause.message : "Signature webhook invalide";
    throw new StripeWebhookVerificationError(message);
  }
}
