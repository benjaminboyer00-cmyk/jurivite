"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

/** Rafraîchit le plan JWT après paiement Stripe (évite un plan obsolète). */
export function SessionPlanSync() {
  const searchParams = useSearchParams();
  const { update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("checkout") !== "success") return;

    void (async () => {
      await update();
      const params = new URLSearchParams(searchParams.toString());
      params.delete("checkout");
      params.delete("plan");
      const qs = params.toString();
      router.replace(`/dashboard${qs ? `?${qs}` : ""}`);
    })();
  }, [searchParams, update, router]);

  return null;
}
