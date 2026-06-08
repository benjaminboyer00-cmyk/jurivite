import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";

import { DocumentLegalNotice } from "@/components/legal/document-legal-notice";
import { CgvNichePicker } from "@/components/marketing/cgv-niche-picker";
import { CgvForm } from "@/components/forms/cgv-form";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { GeneratePageMeta } from "@/components/marketing/generate-page-meta";
import { GenerateSeoSection } from "@/components/marketing/generate-seo-section";
import { CONTRACT_HUB_PATH } from "@/lib/documents/contract-seo-hub";
import { documentForms } from "@/lib/documents/forms";
import { getDocumentStepCount } from "@/lib/documents/step-counts";
import { getAllGenerateSlugs } from "@/lib/documents/seo-landings";
import { getRelatedDocuments } from "@/lib/documents/related-documents";
import { resolveGeneratePage, isValidGenerateSlug } from "@/lib/documents/resolve-page";
import { createMetadata } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  documentHowToSteps,
  faqPageJsonLd,
  howToJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/seo/json-ld";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Pages pré-générées en build — pas de recompilation à chaque requête en prod */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGenerateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = resolveGeneratePage(slug);
  if (!page) return {};

  return createMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    keywords: page.seoKeywords,
  });
}

export default async function GenerateDocumentPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isValidGenerateSlug(slug)) {
    notFound();
  }

  const page = resolveGeneratePage(slug);
  if (!page) notFound();

  const FormComponent = documentForms[page.documentSlug];
  const relatedLinks = getRelatedDocuments(page.documentSlug, page.path);

  const jsonLd = [
    softwareApplicationJsonLd({
      name: `${page.h1} — JuriVite`,
      description: page.metaDescription,
      path: page.path,
    }),
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Documents", path: "/#documents" },
      { name: page.breadcrumbLabel, path: page.path },
    ]),
    faqPageJsonLd(page.faqs),
    howToJsonLd({
      name: `Comment générer ${page.doc.shortTitle} avec JuriVite`,
      description: page.intro,
      steps: documentHowToSteps(page.documentSlug),
    }),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <nav
        className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 rounded-lg border bg-muted/20 px-3 py-2.5 text-xs text-muted-foreground sm:text-sm"
        aria-label="Fil d'Ariane"
      >
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <ChevronRight className="size-4 shrink-0" aria-hidden />
        <Link href="/#documents" className="hover:text-foreground">
          Documents
        </Link>
        <ChevronRight className="size-4 shrink-0" aria-hidden />
        {page.isLanding ? (
          <>
            <Link href={page.doc.href} className="hover:text-foreground">
              {page.doc.shortTitle}
            </Link>
            <ChevronRight className="size-4 shrink-0" aria-hidden />
            <span className="text-foreground">{page.breadcrumbLabel}</span>
          </>
        ) : (
          <span className="text-foreground">{page.doc.shortTitle}</span>
        )}
      </nav>

      <header className="mb-8 space-y-4 border-b border-border/60 pb-8">
        <GeneratePageMeta
          doc={page.doc}
          stepCount={getDocumentStepCount(page.documentSlug)}
        />
        <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
          {page.h1}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {page.intro}
        </p>
        {page.documentSlug === "cgv" ? (
          <p className="text-sm">
            <Link href="/modeles" className="font-medium text-primary hover:underline">
              → 50 modèles CGV par métier
            </Link>
          </p>
        ) : null}
        {page.documentSlug === "contrat-prestation" ? (
          <p className="text-sm">
            <Link
              href={CONTRACT_HUB_PATH}
              className="font-medium text-primary hover:underline"
            >
              → Tous les guides contrat freelance norme
            </Link>
          </p>
        ) : null}
      </header>

      {page.documentSlug === "cgv" ? <CgvNichePicker /> : null}

      {page.documentSlug === "cgv" ? (
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-lg border bg-muted/40" />
          }
        >
          <CgvForm />
        </Suspense>
      ) : (
        <FormComponent />
      )}

      <DocumentLegalNotice documentSlug={page.documentSlug} />

      <GenerateSeoSection
        docTitle={page.doc.title}
        seoBlocks={page.seoBlocks}
        faqs={page.faqs}
        relatedLinks={relatedLinks}
      />
    </>
  );
}
