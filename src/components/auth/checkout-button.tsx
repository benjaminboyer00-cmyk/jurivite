"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CheckoutButton({
  label = "Passer Pro — 9 €/mois",
}: {
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
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
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? "Redirection Stripe…" : label}
    </Button>
  );
}
