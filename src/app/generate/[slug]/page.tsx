import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { documentPageContent } from "@/lib/documents/content";
import { documentForms } from "@/lib/documents/forms";
import {
  documentSlugs,
  getDocumentBySlug,
  isDocumentSlug,
} from "@/lib/documents/registry";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return documentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isDocumentSlug(slug)) return {};

  const doc = getDocumentBySlug(slug)!;
  const content = documentPageContent[slug];

  return createMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: doc.href,
    keywords: doc.seoKeywords,
  });
}

export default async function GenerateDocumentPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isDocumentSlug(slug)) {
    notFound();
  }

  const doc = getDocumentBySlug(slug)!;
  const content = documentPageContent[slug];
  const FormComponent = documentForms[slug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${content.h1} — JuriVite`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description: content.metaDescription,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground"
        aria-label="Fil d'Ariane"
      >
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <ChevronRight className="size-4" aria-hidden />
        <Link href="/#documents" className="hover:text-foreground">
          Documents
        </Link>
        <ChevronRight className="size-4" aria-hidden />
        <span className="text-foreground">{doc.shortTitle}</span>
      </nav>

      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.h1}
        </h1>
        <p className="text-muted-foreground">{content.intro}</p>
      </header>

      <FormComponent />

      <article className="prose-neutral mt-16 space-y-8 border-t pt-12">
        {content.seoBlocks.map((block) => (
          <section key={block.heading}>
            <h2 className="text-xl font-semibold tracking-tight">
              {block.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {block.body}
            </p>
          </section>
        ))}
      </article>
    </>
  );
}
