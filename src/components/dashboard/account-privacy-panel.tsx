"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { juriviteLegal } from "@/lib/legal/jurivite-site";

export function AccountPrivacyPanel({
  hasStripeCustomer,
}: {
  hasStripeCustomer: boolean;
}) {
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openBillingPortal() {
    setLoadingPortal(true);
    setError(null);
    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoadingPortal(false);
    }
  }

  async function deleteAccount() {
    const confirmed = window.confirm(
      "Supprimer définitivement votre compte, vos documents enregistrés et vos clés API ? Cette action est irréversible.",
    );
    if (!confirmed) return;

    setLoadingDelete(true);
    setError(null);
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      await signOut({ callbackUrl: "/" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setLoadingDelete(false);
    }
  }

  return (
    <Card className="mt-8 border-destructive/20">
      <CardHeader>
        <CardTitle className="text-base">Données personnelles</CardTitle>
        <CardDescription>
          Exercez vos droits RGPD : accès, rectification, effacement. Contact :{" "}
          {juriviteLegal.privacyEmail}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? (
          <Alert variant="destructive" title="Erreur">
            {error}
          </Alert>
        ) : null}

        {hasStripeCustomer && (
          <Button
            type="button"
            variant="outline"
            onClick={openBillingPortal}
            disabled={loadingPortal || loadingDelete}
          >
            {loadingPortal ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}
            Gérer mon abonnement (Stripe)
          </Button>
        )}

        <Button
          type="button"
          variant="destructive"
          onClick={deleteAccount}
          disabled={loadingDelete || loadingPortal}
        >
          {loadingDelete ? (
            <Loader2 className="size-4 animate-spin" />
          ) : null}
          Supprimer mon compte et mes données
        </Button>
      </CardContent>
    </Card>
  );
}
