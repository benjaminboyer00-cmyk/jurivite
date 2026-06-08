import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AccountPasswordForm } from "@/components/dashboard/account-password-form";
import { AccountPrivacyPanel } from "@/components/dashboard/account-privacy-panel";
import { ApiKeyPanel } from "@/components/dashboard/api-key-panel";
import { listApiKeys } from "@/lib/db/api-keys";
import { PLAN_LIMITS } from "@/lib/plans";
import { createMetadata } from "@/lib/seo";
import { findUserById } from "@/lib/auth/user-repository";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = createMetadata({
  title: "Mon compte",
  description: "Gérez votre compte JuriVite, mot de passe et abonnement.",
  path: "/dashboard/compte",
  noIndex: true,
});

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard/compte");

  const user = await findUserById(session.user.id);
  const plan = user?.plan ?? session.user.plan ?? "free";

  const apiKeys =
    plan === "business"
      ? (await listApiKeys(session.user.id)).map((k) => ({
          ...k,
          createdAt: k.createdAt.toISOString(),
          lastUsedAt: k.lastUsedAt?.toISOString() ?? null,
        }))
      : [];

  return (
    <>
      <h2 className="text-lg font-semibold sm:text-xl">Mon compte</h2>
      <p className="mt-1 text-sm text-muted-foreground">{session.user.email}</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">Profil</CardTitle>
          <CardDescription>
            Un e-mail ne peut être associé qu&apos;à un seul compte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">E-mail :</span>{" "}
            <strong>{session.user.email}</strong>
          </p>
          <p>
            <span className="text-muted-foreground">Plan :</span>{" "}
            <strong>{PLAN_LIMITS[plan].label}</strong>
          </p>
          <p>
            <span className="text-muted-foreground">Connexion :</span>{" "}
            {session.user.hasPassword
              ? "Mot de passe + lien magique / Google possibles"
              : "Lien magique ou Google — définissez un mot de passe ci-dessous"}
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Sécurité</CardTitle>
          <CardDescription>
            Mot de passe pour vous connecter sans lien magique.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountPasswordForm hasPassword={Boolean(session.user.hasPassword)} />
        </CardContent>
      </Card>

      {plan === "business" ? <ApiKeyPanel initialKeys={apiKeys} /> : null}

      <AccountPrivacyPanel hasStripeCustomer={Boolean(user?.stripeCustomerId)} />
    </>
  );
}
