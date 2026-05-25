import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { JsonLdScript } from "@/components/seo/json-ld-script";
import { documentForms } from "@/lib/documents/forms";
import { getAllGenerateSlugs } from "@/lib/documents/seo-landings";
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
        className="mb-6 flex flex-wrap items-center gap-1 rounded-lg border bg-muted/20 px-3 py-2 text-sm text-muted-foreground"
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

      <header className="mb-8 space-y-3 border-b border-border/60 pb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {page.h1}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {page.intro}
        </p>
      </header>

      <FormComponent />

      <article className="mt-16 space-y-12 border-t pt-12">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Guide complet — {page.doc.title}
          </h2>
          <div className="mt-8 space-y-8">
            {page.seoBlocks.map((block) => (
              <section key={block.heading}>
                <h3 className="text-xl font-semibold tracking-tight">
                  {block.heading}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {block.body}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Questions fréquentes
          </h2>
          <dl className="mt-6 space-y-4">
            {page.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border bg-card px-5 py-4 shadow-sm"
              >
                <dt className="font-semibold">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6">
          <h2 className="font-semibold">Documents associés</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            <li>
              <Link href={page.doc.href} className="text-primary hover:underline">
                {page.doc.title}
              </Link>
            </li>
            <li>
              <Link href="/tarifs" className="text-primary hover:underline">
                Tarifs JuriVite
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
