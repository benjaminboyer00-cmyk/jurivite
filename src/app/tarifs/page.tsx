import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { CheckoutButton } from "@/components/auth/checkout-button";
import { auth } from "@/auth";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Tarifs — Gratuit vs Pro",
  description:
    "JuriVite : génération gratuite avec filigrane ou abonnement Pro à 9€/mois pour des PDF sans filigrane.",
  path: "/tarifs",
  keywords: ["tarifs jurivite", "générateur documents juridiques prix"],
});

const freeFeatures = [
  "5 types de documents",
  "Formulaires guidés",
  "PDF avec filigrane",
  "Pas de carte bancaire",
] as const;

const proFeatures = [
  "Tout le plan gratuit",
  "PDF sans filigrane",
  "Historique & retéléchargement",
  "Support prioritaire (bientôt)",
] as const;

export default async function TarifsPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Tarifs simples</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Commencez gratuitement. Passez Pro quand vous avez vos premiers clients.
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gratuit</CardTitle>
            <CardDescription>Pour tester et valider vos documents</CardDescription>
            <p className="text-3xl font-bold">0 €</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <ButtonLink href="/#documents" variant="outline" className="w-full">
              Commencer gratuitement
            </ButtonLink>
          </CardFooter>
        </Card>

        <Card className="border-primary shadow-md">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Pour freelances qui vendent en ligne</CardDescription>
            <p className="text-3xl font-bold">
              9 €<span className="text-base font-normal text-muted-foreground">/mois</span>
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {session?.user ? (
              <CheckoutButton label="S'abonner via Stripe" />
            ) : (
              <ButtonLink href="/login" className="w-full">
                Se connecter pour s&apos;abonner
              </ButtonLink>
            )}
          </CardFooter>
        </Card>
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Paiement sécurisé par Stripe. Mode test disponible en local avec{" "}
        <code className="rounded bg-muted px-1">stripe listen</code>.
      </p>
    </div>
  );
}
