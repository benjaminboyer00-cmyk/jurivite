"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { DocumentSlug } from "@/lib/documents/registry";
import type { OneShotProduct } from "@/lib/plans";
import { formatPriceEur, ONE_SHOT_PRODUCTS } from "@/lib/plans";

export function OneShotCheckoutButton({
  product,
  slug,
  label,
}: {
  product: OneShotProduct;
  slug?: DocumentSlug;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [acceptedCgv, setAcceptedCgv] = useState(false);

  const info = ONE_SHOT_PRODUCTS[product];
  const defaultLabel =
    product === "single_doc"
      ? `Acheter — ${formatPriceEur(info.price)}`
      : `Pack Essentiel — ${formatPriceEur(info.price)}`;

  async function handleCheckout() {
    if (!acceptedCgv) return;
    if (product === "single_doc" && !slug) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout/one-shot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          slug,
          acceptedCgv: true,
        }),
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
          . Exécution immédiate du contenu numérique — renonciation au droit de
          rétractation une fois le service commencé (art. L221-28).
        </span>
      </label>
      <Button
        onClick={handleCheckout}
        disabled={loading || !acceptedCgv}
        variant={product === "pack_essential" ? "default" : "outline"}
        className="h-11 w-full sm:h-9"
      >
        {loading ? "Redirection Stripe…" : (label ?? defaultLabel)}
      </Button>
    </div>
  );
}
