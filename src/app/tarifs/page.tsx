import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { CheckoutButton } from "@/components/auth/checkout-button";
import { OneShotCheckoutButton } from "@/components/auth/one-shot-checkout-button";
import { PricingConfigurator } from "@/components/pricing/pricing-configurator";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { juriviteLegal } from "@/lib/legal/jurivite-site";
import {
  formatPriceEur,
  ONE_SHOT_MARKETING_FEATURES,
  ONE_SHOT_PRODUCTS,
  PLAN_MARKETING_FEATURES,
  PRICING,
} from "@/lib/plans";
import { createMetadata } from "@/lib/seo";
import { faqPageJsonLd, productOffersJsonLd } from "@/lib/seo/json-ld";

const tarifsFaqs = [
  {
    question: "Puis-je tester JuriVite gratuitement ?",
    answer:
      "Oui : génération illimitée avec filigrane sur le PDF, sans carte bancaire.",
  },
  {
    question: "Que signifie « mises à jour à vie » sur un document acheté ?",
    answer:
      "Vous pouvez régénérer le même type de document (ex. vos CGV) sans filigrane quand les modèles JuriVite évoluent, sans repayer l'unité.",
  },
  {
    question: "Quelle différence entre le Pack Essentiel et l'abonnement Pro ?",
    answer:
      "Le pack (19,90 €) couvre 3 documents au choix avec 3 mois de mises à jour — idéal pour un besoin ponctuel. Pro (29,90 €/mois) donne tous les documents en illimité et des mises à jour continues.",
  },
  {
    question: "Comment obtenir l'offre Business ?",
    answer:
      "Sur devis : API, volume, intégration sur votre site. Contactez-nous par e-mail.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Tarifs — Payez à l'usage ou abonnez-vous",
  description:
    "JuriVite : document à 4,90 €, pack 3 documents à 19,90 €, abonnement Pro 29,90 €/mois. PDF juridiques sans filigrane, mises à jour incluses.",
  path: "/tarifs",
  keywords: [
    "tarifs jurivite",
    "cgv pas cher",
    "générateur documents juridiques prix",
  ],
});

export default async function TarifsPage() {
  const session = await auth();

  return (
    <>
      <JsonLdScript data={[productOffersJsonLd(), faqPageJsonLd([...tarifsFaqs])]} />
      <div className="page-container section-padding">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Payez pour ce dont vous avez besoin
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Vos CGV rédigées, structurées et mises à jour — pas de jargon inutile.
            Un café pour un document urgent, un pack pour lancer votre activité,
            Pro si vous générez souvent.
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-3xl">
          <PricingConfigurator />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Gratuit</CardTitle>
              <CardDescription>Tester et valider vos modèles</CardDescription>
              <p className="text-3xl font-bold">0 €</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {PLAN_MARKETING_FEATURES.free.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" />
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

          <Card className="flex flex-col border-primary/40 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{ONE_SHOT_PRODUCTS.single_doc.label}</CardTitle>
                <Badge variant="secondary">One-shot</Badge>
              </div>
              <CardDescription>{ONE_SHOT_PRODUCTS.single_doc.description}</CardDescription>
              <p className="text-3xl font-bold">
                {formatPriceEur(PRICING.singleDoc)}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  TTC
                </span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {ONE_SHOT_MARKETING_FEATURES.single_doc.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <ButtonLink href="/#documents" variant="outline" className="w-full">
                Choisir un document
              </ButtonLink>
              <p className="text-center text-xs text-muted-foreground">
                Paiement depuis la page du générateur (connecté)
              </p>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>{ONE_SHOT_PRODUCTS.pack_essential.label}</CardTitle>
              <CardDescription>
                {ONE_SHOT_PRODUCTS.pack_essential.description}
              </CardDescription>
              <p className="text-3xl font-bold">
                {formatPriceEur(PRICING.packEssential)}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  TTC
                </span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {ONE_SHOT_MARKETING_FEATURES.pack_essential.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {session?.user ? (
                <OneShotCheckoutButton
                  product="pack_essential"
                  label={`Acheter le pack — ${formatPriceEur(PRICING.packEssential)}`}
                />
              ) : (
                <ButtonLink href="/login?callbackUrl=/tarifs" className="w-full">
                  Se connecter pour acheter
                </ButtonLink>
              )}
            </CardFooter>
          </Card>
        </div>

        <div
          id="pro"
          className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch"
        >
          <Card className="relative flex flex-col border-primary shadow-lg ring-1 ring-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>Pro</CardTitle>
                <Badge>Recommandé</Badge>
              </div>
              <CardDescription>Freelances & besoins récurrents</CardDescription>
              <p className="text-3xl font-bold">
                {formatPriceEur(PRICING.proMonthly)}
                <span className="text-base font-normal text-muted-foreground">
                  /mois TTC
                </span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {PLAN_MARKETING_FEATURES.pro.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {session?.user ? (
                <CheckoutButton label="S'abonner Pro" />
              ) : (
                <ButtonLink href="/login?callbackUrl=/tarifs" className="w-full">
                  Se connecter
                </ButtonLink>
              )}
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Business</CardTitle>
              <CardDescription>API, volume, intégration</CardDescription>
              <p className="text-3xl font-bold">Sur devis</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {PLAN_MARKETING_FEATURES.business.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <ButtonLink
                href={`mailto:${juriviteLegal.email}?subject=JuriVite%20Business`}
                className="w-full"
              >
                Nous contacter
              </ButtonLink>
            </CardFooter>
          </Card>
        </div>

        <section className="mt-16 rounded-xl border bg-muted/30 p-6 text-sm sm:p-8">
          <h2 className="text-lg font-semibold">API Business</h2>
          <p className="mt-2 break-words text-muted-foreground">
            <code className="break-all rounded bg-muted px-1 text-xs sm:text-sm">
              POST /api/v1/generate-pdf
            </code>{" "}
            — réservée aux comptes Business (activation manuelle).{" "}
            <Link href={`mailto:${juriviteLegal.email}`} className="text-primary underline">
              Demandez un devis
            </Link>
            .
          </p>
        </section>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Prix TTC. Abonnement Pro sans engagement — résiliation via Stripe. Achats
          one-shot : exécution immédiate du service numérique.{" "}
          <Link href="/cgv" className="text-primary underline">
            CGV
          </Link>{" "}
          ·{" "}
          <Link href="/cgu" className="text-primary underline">
            CGU
          </Link>
          . Modèles, non conseil juridique personnalisé.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold">FAQ tarifs</h2>
          <dl className="mt-6 space-y-4">
            {tarifsFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-medium">{faq.question}</dt>
                <dd className="mt-1 text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
