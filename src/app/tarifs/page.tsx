import type { Metadata } from "next";
import { Check } from "lucide-react";

import { CheckoutButton } from "@/components/auth/checkout-button";
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
import { PLAN_LIMITS } from "@/lib/plans";
import { createMetadata } from "@/lib/seo";
import { faqPageJsonLd, productOffersJsonLd } from "@/lib/seo/json-ld";

const tarifsFaqs = [
  {
    question: "Puis-je tester JuriVite gratuitement ?",
    answer: "Oui, génération illimitée avec filigrane JuriVite sur le PDF.",
  },
  {
    question: "Que se passe-t-il après 20 PDF en plan Pro ?",
    answer:
      "Le quota se réinitialise chaque mois. Passez Business pour l'illimité et l'API.",
  },
  {
    question: "Le plan Business inclut-il une API ?",
    answer:
      "Oui, POST /api/v1/generate-pdf avec clé Bearer pour automatiser la génération.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Tarifs — Gratuit, Pro et Business",
  description:
    "JuriVite : gratuit avec filigrane, Pro 9€/mois (20 PDF), Business 30€/mois (illimité + API).",
  path: "/tarifs",
  keywords: [
    "tarifs jurivite",
    "générateur documents juridiques prix",
    "api documents juridiques",
  ],
});

const tiers = [
  {
    id: "free",
    title: "Gratuit",
    price: "0 €",
    description: "Tester et valider vos modèles",
    features: [
      "10 types de documents juridiques",
      "Formulaires guidés",
      "PDF avec filigrane",
      "Sans carte bancaire",
    ],
    cta: "outline" as const,
    href: "/#documents",
    ctaLabel: "Commencer gratuitement",
  },
  {
    id: "pro",
    title: "Pro",
    price: "9 €",
    description: "Freelances & indépendants",
    features: [
      "20 PDF / mois sans filigrane",
      "Historique & retéléchargement",
      "CGV, RGPD, contrats, devis",
      "Support e-mail",
    ],
    highlight: true,
    plan: "pro" as const,
    ctaLabel: "S'abonner Pro",
  },
  {
    id: "business",
    title: "Business",
    price: "30 €",
    description: "Entreprises & intégrations",
    features: [
      "PDF illimités sans filigrane",
      "Clé API REST",
      "Automatisation (CRM, ERP…)",
      "Même catalogue de documents",
    ],
    plan: "business" as const,
    ctaLabel: "S'abonner Business",
  },
] as const;

export default async function TarifsPage() {
  const session = await auth();

  return (
    <>
      <JsonLdScript data={[productOffersJsonLd(), faqPageJsonLd([...tarifsFaqs])]} />
      <div className="page-container section-padding">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Tarifs</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Commencez gratuitement, passez Pro pour 20 PDF/mois sans filigrane, ou
          Business pour l&apos;illimité et l&apos;API.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:items-stretch">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={
              "highlight" in tier && tier.highlight
                ? "relative flex flex-col border-primary shadow-lg ring-1 ring-primary/20 lg:-mt-2 lg:mb-2"
                : "flex flex-col"
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{tier.title}</CardTitle>
                {"highlight" in tier && tier.highlight ? (
                  <Badge>Populaire</Badge>
                ) : null}
              </div>
              <CardDescription>{tier.description}</CardDescription>
              <p className="text-3xl font-bold">
                {tier.price}
                {tier.id !== "free" && (
                  <span className="text-base font-normal text-muted-foreground">
                    /mois
                  </span>
                )}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {tier.id === "free" ? (
                <ButtonLink
                  href={tier.href}
                  variant={tier.cta}
                  className="w-full"
                >
                  {tier.ctaLabel}
                </ButtonLink>
              ) : session?.user ? (
                <CheckoutButton plan={tier.plan} label={tier.ctaLabel} />
              ) : (
                <ButtonLink href="/login" className="w-full">
                  Se connecter
                </ButtonLink>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="mt-16 rounded-xl border bg-muted/30 p-6 text-sm sm:p-8">
        <h2 className="text-lg font-semibold">API Business</h2>
        <p className="mt-2 text-muted-foreground">
          <code className="rounded bg-muted px-1">POST /api/v1/generate-pdf</code>{" "}
          — corps JSON identique au formulaire web. En-tête :{" "}
          <code className="rounded bg-muted px-1">
            Authorization: Bearer jv_live_…
          </code>
        </p>
      </section>

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
