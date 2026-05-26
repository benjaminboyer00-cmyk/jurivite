"use client";

import Link from "next/link";
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
  const [acceptedCgv, setAcceptedCgv] = useState(false);

  const defaultLabel =
    plan === "business"
      ? "Passer Business — 30 €/mois"
      : "Passer Pro — 9 €/mois";

  async function handleCheckout() {
    if (!acceptedCgv) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, acceptedCgv: true }),
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
    <div className="space-y-3">
      <label className="flex cursor-pointer gap-3 text-left text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          checked={acceptedCgv}
          onChange={(e) => setAcceptedCgv(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 rounded"
        />
        <span>
          J&apos;accepte les{" "}
          <Link href="/cgv" className="text-primary underline" target="_blank">
            CGV
          </Link>{" "}
          et les{" "}
          <Link href="/cgu" className="text-primary underline" target="_blank">
            CGU
          </Link>
          . Pour un contenu numérique fourni immédiatement, je demande l&apos;exécution
          immédiate et reconnais perdre mon droit de rétractation une fois le service
          commencé (art. L221-28 C. consom.).
        </span>
      </label>
      <Button
        onClick={handleCheckout}
        disabled={loading || !acceptedCgv}
        variant={plan === "business" ? "default" : "default"}
        className="h-11 w-full sm:h-9"
      >
        {loading ? "Redirection Stripe…" : (label ?? defaultLabel)}
      </Button>
    </div>
  );
}
