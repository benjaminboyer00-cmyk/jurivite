import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AccountPasswordForm } from "@/components/dashboard/account-password-form";
import { AccountPrivacyPanel } from "@/components/dashboard/account-privacy-panel";
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

  return (
    <div className="page-container max-w-2xl py-10 sm:py-14">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Tableau de bord
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Mon compte</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight">Mon compte</h1>
      <p className="mt-2 text-muted-foreground">{session.user.email}</p>

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

      <AccountPrivacyPanel hasStripeCustomer={Boolean(user?.stripeCustomerId)} />
    </div>
  );
}
