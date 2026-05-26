import { describe, expect, it, vi } from "vitest";
import type Stripe from "stripe";

import {
  StripeWebhookVerificationError,
  verifyStripeWebhookEvent,
} from "@/lib/stripe/verify-webhook";

describe("verifyStripeWebhookEvent", () => {
  it("appelle constructEvent et retourne l'événement", () => {
    const fakeEvent = { id: "evt_1", type: "checkout.session.completed" };
    const constructEvent = vi.fn().mockReturnValue(fakeEvent);
    const stripe = {
      webhooks: { constructEvent },
    } as unknown as Stripe;

    const event = verifyStripeWebhookEvent(
      stripe,
      '{"id":"evt_1"}',
      "sig_test",
      "whsec_test",
    );

    expect(constructEvent).toHaveBeenCalledWith(
      '{"id":"evt_1"}',
      "sig_test",
      "whsec_test",
    );
    expect(event).toEqual(fakeEvent);
  });

  it("lève StripeWebhookVerificationError si signature invalide", () => {
    const stripe = {
      webhooks: {
        constructEvent: vi.fn().mockImplementation(() => {
          throw new Error("No signatures found");
        }),
      },
    } as unknown as Stripe;

    expect(() =>
      verifyStripeWebhookEvent(stripe, "{}", "bad", "whsec_test"),
    ).toThrow(StripeWebhookVerificationError);
  });
});
