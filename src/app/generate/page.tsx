import type { Metadata } from "next";
import Link from "next/link";

import { documents } from "@/lib/documents/registry";
import { seoLandingPages } from "@/lib/documents/seo-landings";
import { createMetadata } from "@/lib/seo";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = createMetadata({
  title: "Générateurs de documents juridiques — catalogue complet",
  description:
    "10 modèles PDF : CGV, mentions légales, RGPD, contrats, devis, facture, NDA, convention de stage. Guides SEO par métier.",
  path: "/generate",
  keywords: ["générateur documents juridiques", "catalogue modèles juridiques"],
});

export default function GenerateIndexPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Générateurs", path: "/generate" },
    ]),
    itemListJsonLd(),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="page-container max-w-4xl py-8 sm:py-10">
        <header className="mb-10 border-b pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Générateurs de documents juridiques
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Choisissez un modèle, complétez le formulaire guidé et téléchargez
            votre PDF. Chaque page inclut un guide et une FAQ.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold">10 documents essentiels</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {documents.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={doc.href}
                  className="block rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:border-primary/40"
                >
                  <span className="font-medium">{doc.title}</span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {doc.shortDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Guides par métier et statut</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {seoLandingPages.map((landing) => (
              <li key={landing.slug}>
                <Link
                  href={`/generate/${landing.slug}`}
                  className="text-primary hover:underline"
                >
                  {landing.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
