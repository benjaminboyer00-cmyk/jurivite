import type { Metadata } from "next";

import { ModelesHub } from "@/components/marketing/modeles-hub";
import { ModelesSeoIndex } from "@/components/marketing/modeles-seo-index";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { cgvNiches } from "@/lib/documents/niches-seo";
import { createMetadata } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  namedItemListJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";

const modelesFaqs = [
  {
    question: "Pourquoi choisir un modèle CGV par métier ?",
    answer:
      "Chaque activité a des risques différents (cession de droits, disclaimer bien-être, rétractation e-commerce). Un modèle métier intègre ces clauses en plus du socle légal commun.",
  },
  {
    question: "Les modèles sont-ils adaptés aux auto-entrepreneurs ?",
    answer:
      "Oui : micro-entreprise, franchise TVA ou société — le formulaire s'adapte à votre statut (SIRET, mentions TVA, capital social).",
  },
  {
    question: "Puis-je tester gratuitement ?",
    answer:
      "Oui, génération illimitée avec filigrane. Le PDF sans filigrane est disponible à partir de 4,90 € TTC.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Modèles de CGV par métier — 50 professions freelances",
  description:
    "CGV sophrologue, développeur web, photographe, e-commerçant… 50 modèles conformes pour auto-entrepreneurs et freelances. Clauses métier + PDF en 5 minutes.",
  path: "/modeles",
  keywords: [
    "cgv par métier",
    "modèle cgv freelance",
    "cgv auto-entrepreneur",
    "cgv sophrologue",
    "cgv photographe",
  ],
});

export default function ModelesPage() {
  const jsonLd = [
    webPageJsonLd({
      name: "Modèles de CGV par métier",
      description:
        "50 modèles de Conditions Générales de Vente pour freelances et indépendants.",
      path: "/modeles",
    }),
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Modèles CGV par métier", path: "/modeles" },
    ]),
    namedItemListJsonLd(
      "Modèles CGV par métier",
      cgvNiches.map((n) => ({
        name: n.h1,
        path: n.path,
      })),
    ),
    faqPageJsonLd([...modelesFaqs]),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="page-container section-padding pb-24 sm:pb-16">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {cgvNiches.length} métiers couverts
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Modèles juridiques & CGV par métier
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Contrats, devis, factures et {cgvNiches.length} CGV par profession —
            trouvez le modèle adapté à votre activité en une recherche.
          </p>
        </header>

        <div className="mt-12">
          <ModelesHub />
        </div>

        <ModelesSeoIndex />

        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-xl font-bold tracking-tight">Questions fréquentes</h2>
          <dl className="mt-6 space-y-4">
            {modelesFaqs.map((faq) => (
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
