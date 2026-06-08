import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, FileSignature, Send, Shield } from "lucide-react";

import { ContractSeoIndex } from "@/components/marketing/contract-seo-index";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ButtonLink } from "@/components/ui/button-link";
import {
  CONTRACT_HUB_FAQS,
  CONTRACT_HUB_PATH,
  getContractDocumentGenerators,
  getContractLandings,
} from "@/lib/documents/contract-seo-hub";
import { formatPriceEur, PRICING } from "@/lib/plans";
import { createMetadata } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  namedItemListJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";

const steps = [
  {
    icon: FileSignature,
    title: "Formulaire guidé",
    desc: "Mission, prix, TVA, délais — 5 à 7 min",
  },
  {
    icon: Send,
    title: "PDF + signature",
    desc: "Envoi du lien de signature au client",
  },
  {
    icon: Shield,
    title: "Contrat normé",
    desc: "11 articles, mentions françaises",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Contrat freelance norme — modèles PDF & guides prestation",
  description:
    "Contrat freelance aux normes, modèle auto-entrepreneur, prestation B2B, NDA… Générateur PDF structuré, signature en ligne. Guides SEO pour chaque intention de recherche.",
  path: CONTRACT_HUB_PATH,
  keywords: [
    "contrat freelance norme",
    "modèle contrat freelance",
    "contrat prestation norme",
    "contrat freelance pdf",
    "contrat auto-entrepreneur",
    "contrat consultant indépendant",
  ],
});

export default function ContratsHubPage() {
  const landings = getContractLandings();
  const generators = getContractDocumentGenerators();
  const primaryLanding = landings[0];

  const jsonLd = [
    webPageJsonLd({
      name: "Contrats freelance & prestation — modèles normés",
      description:
        "Hub SEO : contrat freelance norme, modèles PDF, NDA et cession de droits pour indépendants.",
      path: CONTRACT_HUB_PATH,
    }),
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Modèles", path: "/modeles" },
      { name: "Contrats freelance", path: CONTRACT_HUB_PATH },
    ]),
    namedItemListJsonLd(
      "Guides contrat freelance",
      landings.map((l) => ({
        name: l.h1,
        path: `/generate/${l.slug}`,
      })),
    ),
    faqPageJsonLd([...CONTRACT_HUB_FAQS]),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="page-container section-padding pb-24 sm:pb-16">
        <nav
          className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center gap-x-1 gap-y-1 rounded-lg border bg-muted/20 px-3 py-2.5 text-xs text-muted-foreground sm:text-sm"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
          <Link href="/modeles" className="hover:text-foreground">
            Modèles
          </Link>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
          <span className="text-foreground">Contrats freelance</span>
        </nav>

        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Contrat de prestation · signature en ligne
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Contrat freelance norme & modèles prestation
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pages dédiées pour chaque recherche Google — « contrat freelance norme »,
            auto-entrepreneur, consultant, PDF gratuit — avec un générateur unique
            calé sur le droit français.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={
                primaryLanding
                  ? `/generate/${primaryLanding.slug}`
                  : "/generate/contrat-prestation"
              }
              size="lg"
              className="h-11 w-full sm:w-auto"
            >
              Créer un contrat freelance norme
            </ButtonLink>
            <ButtonLink
              href="/generate/contrat-prestation"
              variant="outline"
              size="lg"
              className="h-11 w-full sm:w-auto"
            >
              Générateur contrat prestation
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Gratuit (filigrane) · Sans filigrane dès {formatPriceEur(PRICING.singleDoc)}
          </p>
        </header>

        <section className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-lg border bg-card p-4 text-center sm:text-left"
            >
              <step.icon className="mx-auto size-5 text-primary sm:mx-0" aria-hidden />
              <p className="mt-2 text-sm font-semibold">{step.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
            Guides par mot-clé
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            Chaque page cible une requête précise tout en pointant vers le même
            générateur professionnel.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {landings.map((landing) => (
              <li key={landing.slug}>
                <Link
                  href={`/generate/${landing.slug}`}
                  className="flex h-full flex-col rounded-lg border bg-background px-4 py-4 transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <span className="font-medium">{landing.h1}</span>
                  <span className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {landing.intro}
                  </span>
                  <span className="mt-3 text-xs font-medium text-primary">
                    Générer en PDF →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto mt-16 max-w-3xl rounded-xl border bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Générateurs liés</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Complétez votre chaîne documentaire : contrat, NDA, cession de droits.
          </p>
          <ul className="mt-6 space-y-4">
            {generators.map((doc) => (
              <li
                key={doc.slug}
                className="rounded-lg border bg-background/80 p-4 text-sm"
              >
                <p className="flex items-center gap-2 font-medium">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  <Link href={doc.href} className="text-primary hover:underline">
                    {doc.title}
                  </Link>
                </p>
                <p className="mt-2 pl-6 text-muted-foreground">
                  {doc.shortDescription}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <ContractSeoIndex />

        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-xl font-bold tracking-tight">Questions fréquentes</h2>
          <dl className="mt-6 space-y-4">
            {CONTRACT_HUB_FAQS.map((faq) => (
              <div key={faq.question} className="rounded-lg border bg-card px-5 py-4">
                <dt className="font-semibold">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
