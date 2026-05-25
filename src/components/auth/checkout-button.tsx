"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type CheckoutPlan = "pro" | "business";

export function CheckoutButton({
  plan = "pro",
  label,
}: {
  plan?: CheckoutPlan;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  const defaultLabel =
    plan === "business"
      ? "Passer Business — 30 €/mois"
      : "Passer Pro — 9 €/mois";

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erreur Stripe");
      if (data.url) window.location.href = data.url;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur de paiement");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      variant={plan === "business" ? "default" : "default"}
      className="w-full"
    >
      {loading ? "Redirection Stripe…" : (label ?? defaultLabel)}
    </Button>
  );
}
