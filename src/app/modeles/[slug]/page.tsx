import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Clock, FileText, Shield } from "lucide-react";

import { NicheStickyCta } from "@/components/marketing/niche-sticky-cta";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ButtonLink } from "@/components/ui/button-link";
import {
  CGV_NICHE_CLUSTERS,
  cgvNicheSlugs,
  getCgvNiche,
  getCgvNichesByCluster,
  getGenerateCgvUrl,
  nicheHowToSteps,
  parseCgvNicheModelSlug,
} from "@/lib/documents/niches-seo";
import {
  INDUSTRY_CLAUSE_LABELS,
  INDUSTRY_CLAUSE_TEXTS,
} from "@/lib/documents/niche-clauses";
import { formatPriceEur, PRICING } from "@/lib/plans";
import { createMetadata } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const steps = [
  { icon: FileText, title: "Choisissez votre métier", desc: "Clauses pré-configurées" },
  { icon: Clock, title: "Formulaire 5 min", desc: "SIRET & conditions réelles" },
  { icon: Shield, title: "PDF conforme", desc: "Prêt à publier sur votre site" },
] as const;

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return cgvNicheSlugs.map((slug) => ({ slug: `cgv-${slug}` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const nicheSlug = parseCgvNicheModelSlug(slug);
  if (!nicheSlug) return {};

  const niche = getCgvNiche(nicheSlug);
  if (!niche) return {};

  return createMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    path: niche.path,
    keywords: niche.seoKeywords,
  });
}

export default async function CgvNichePage({ params }: PageProps) {
  const { slug } = await params;
  const nicheSlug = parseCgvNicheModelSlug(slug);
  if (!nicheSlug) notFound();

  const niche = getCgvNiche(nicheSlug);
  if (!niche) notFound();

  const cluster = CGV_NICHE_CLUSTERS[niche.cluster];
  const related = getCgvNichesByCluster(niche.cluster)
    .filter((n) => n.slug !== niche.slug)
    .slice(0, 8);
  const generateUrl = getGenerateCgvUrl(niche.slug);
  const ctaLabel = `Créer mes CGV — ${niche.profession}`;

  const jsonLd = [
    webPageJsonLd({
      name: niche.h1,
      description: niche.metaDescription,
      path: niche.path,
    }),
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Modèles par métier", path: "/modeles" },
      { name: niche.profession, path: niche.path },
    ]),
    faqPageJsonLd(niche.specificFAQ),
    howToJsonLd({
      name: `Comment créer ses CGV de ${niche.profession.toLowerCase()}`,
      description: niche.intro,
      steps: nicheHowToSteps(niche.profession),
    }),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <NicheStickyCta href={generateUrl} label={ctaLabel} />

      <article className="page-container max-w-3xl py-10 pb-28 sm:py-16 sm:pb-16">
        <nav
          className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 rounded-lg border bg-muted/20 px-3 py-2.5 text-xs text-muted-foreground sm:text-sm"
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
          <Link
            href={`/modeles?categorie=${niche.cluster}`}
            className="hover:text-foreground"
          >
            {cluster.shortLabel}
          </Link>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
          <span className="text-foreground">{niche.profession}</span>
        </nav>

        <header className="mb-10 space-y-4 border-b pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              {cluster.label}
            </p>
            <p className="text-xs text-muted-foreground">
              Modèle CGV · {niche.profession}
            </p>
          </div>
          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            {niche.h1}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {niche.intro}
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink href={generateUrl} size="lg" className="h-11">
              {ctaLabel}
            </ButtonLink>
            <ButtonLink
              href={`/modeles?categorie=${niche.cluster}`}
              variant="outline"
              size="lg"
              className="h-11"
            >
              Autres {cluster.shortLabel.toLowerCase()}
            </ButtonLink>
          </div>
          <p className="text-xs text-muted-foreground">
            Gratuit (filigrane) · Sans filigrane dès {formatPriceEur(PRICING.singleDoc)} ·{" "}
            <Link href="/tarifs" className="text-primary hover:underline">
              Tarifs
            </Link>
          </p>
        </header>

        <section className="mb-10 grid gap-4 sm:grid-cols-3">
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

        <section className="mb-10 rounded-xl border bg-primary/5 p-5 sm:p-6">
          <h2 className="font-semibold">
            Clauses incluses pour {niche.profession.toLowerCase()}
          </h2>
          <ul className="mt-4 space-y-4">
            {niche.industrySpecificClauses.map((clause) => (
              <li
                key={clause}
                className="rounded-lg border bg-background/80 p-4 text-sm"
              >
                <p className="flex items-center gap-2 font-medium">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  {INDUSTRY_CLAUSE_LABELS[clause]}
                </p>
                <p className="mt-2 pl-6 text-muted-foreground">
                  {INDUSTRY_CLAUSE_TEXTS[clause]}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-10">
          {niche.seoBlocks.map((block) => (
            <section key={block.heading}>
              <h2 className="text-xl font-semibold tracking-tight">{block.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{block.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-lg border bg-muted/30 p-5 text-sm">
          <h2 className="font-semibold">Documents complémentaires</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
            <li>
              <Link href="/generate/mentions-legales" className="text-primary hover:underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/generate/politique-confidentialite"
                className="text-primary hover:underline"
              >
                Politique RGPD
              </Link>
            </li>
            <li>
              <Link href="/generate/contrat-prestation" className="text-primary hover:underline">
                Contrat de prestation
              </Link>
            </li>
            <li>
              <Link href="/generate/cgv" className="text-primary hover:underline">
                CGV génériques
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">Questions fréquentes</h2>
          <dl className="mt-6 space-y-4">
            {niche.specificFAQ.map((faq) => (
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

        {related.length > 0 ? (
          <section className="mt-12 rounded-lg border bg-muted/30 p-6">
            <h2 className="font-semibold">
              Autres CGV — {cluster.label}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={r.path}
                    className="block rounded-md px-2 py-1.5 text-sm text-primary hover:bg-primary/5 hover:underline"
                  >
                    CGV {r.profession}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <footer className="mt-12 border-t pt-8 text-center">
          <ButtonLink href={generateUrl} size="lg">
            {ctaLabel}
          </ButtonLink>
          <p className="mt-4 text-xs text-muted-foreground">
            Aperçu gratuit · Modèle structuré — pas un conseil juridique personnalisé
          </p>
        </footer>
      </article>
    </>
  );
}
