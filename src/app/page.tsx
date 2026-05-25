import Link from "next/link";
import { CheckCircle2, FileText, Shield, Zap } from "lucide-react";

import { DocumentCard } from "@/components/marketing/document-card";
import { HeroStats } from "@/components/marketing/hero-stats";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ButtonLink } from "@/components/ui/button-link";
import { documents } from "@/lib/documents/registry";
import { seoLandingPages } from "@/lib/documents/seo-landings";
import { homeFaqs } from "@/lib/seo/home-faqs";
import {
  faqPageJsonLd,
  itemListJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/json-ld";

const features = [
  {
    icon: Zap,
    title: "Rapide",
    description:
      "Formulaire guidé en 5 minutes. CGV, mentions légales, RGPD, contrats et devis.",
  },
  {
    icon: Shield,
    title: "Structuré & professionnel",
    description:
      "Modèles pensés pour freelances, auto-entrepreneurs et TPE — à personnaliser selon votre activité.",
  },
  {
    icon: CheckCircle2,
    title: "PDF prêt à publier",
    description:
      "Téléchargez et publiez sur votre site, boutique ou envoyez à vos clients.",
  },
] as const;

export default function HomePage() {
  const jsonLd = [
    organizationJsonLd(),
    websiteJsonLd(),
    itemListJsonLd(),
    faqPageJsonLd([...homeFaqs]),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />

      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/8 via-primary/3 to-background">
        <div className="page-container py-16 sm:py-24">
          <p className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            Générateur de documents juridiques en ligne
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
            CGV, mentions légales, RGPD —{" "}
            <span className="text-primary">PDF structurés en 5 minutes</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            JuriVite aide les freelances, auto-entrepreneurs et petites
            entreprises à générer les documents juridiques les plus recherchés
            sur Google. Évitez les amendes, sécurisez vos ventes et gagnez du
            temps sur la paperasse.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/generate/cgv" size="lg">
              Créer mes CGV gratuitement
            </ButtonLink>
            <ButtonLink href="#documents" variant="outline" size="lg">
              Voir tous les documents
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Gratuit (filigrane) · Pro 9 €/mo (20 PDF) ·{" "}
            <Link href="/tarifs" className="font-medium text-primary hover:underline">
              Business 30 €/mo
            </Link>{" "}
            (illimité + API)
          </p>
          <HeroStats />
        </div>
      </section>

      <section id="documents" className="page-container section-padding">
        <header className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Générateurs de documents juridiques
          </h2>
          <p className="mt-2 text-muted-foreground">
            Les 10 documents essentiels pour indépendants et TPE : CGV, RGPD,
            contrats, facturation, NDA et conventions de stage.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard key={doc.slug} document={doc} />
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Pages par métier et statut
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Guides SEO dédiés : auto-entrepreneur, freelance, site web, blog…
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {seoLandingPages.map((landing) => (
              <li key={landing.slug}>
                <Link
                  href={`/generate/${landing.slug}`}
                  className="block rounded-lg border bg-background px-4 py-3 text-sm transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <span className="font-medium">{landing.h1}</span>
                  <span className="mt-1 block text-muted-foreground">
                    Générer en PDF →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Pourquoi choisir JuriVite ?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="size-5 text-primary" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="prose-neutral mt-12 max-w-3xl space-y-4 text-muted-foreground">
          <p className="leading-relaxed">
            Que vous lanciez une activité de freelance, une micro-entreprise ou
            un site e-commerce, certains documents juridiques ne sont pas
            optionnels : <strong className="text-foreground">mentions légales</strong>{" "}
            pour identifier l&apos;éditeur,{" "}
            <strong className="text-foreground">politique de confidentialité</strong>{" "}
            dès la collecte de données,{" "}
            <strong className="text-foreground">CGV</strong> pour encadrer vos
            ventes en ligne, <strong className="text-foreground">contrat de prestation</strong>{" "}
            pour sécuriser vos missions et{" "}
            <strong className="text-foreground">devis conformes</strong> pour
            accélérer la signature.
          </p>
          <p className="leading-relaxed">
            JuriVite centralise ces besoins dans un seul outil : formulaires
            guidés, validation des champs essentiels (SIRET, coordonnées,
            conditions commerciales) et export PDF immédiat. Vous gardez la
            main sur le contenu tout en gagnant des heures par rapport à une
            rédaction from scratch.
          </p>
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Questions fréquentes sur JuriVite
          </h2>
          <dl className="mt-8 space-y-6">
            {homeFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <FileText className="mx-auto size-10 text-primary" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold tracking-tight">
          Prêt à sécuriser votre activité ?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Commencez par les CGV — le document le plus recherché par les
          indépendants.
        </p>
        <ButtonLink href="/generate/cgv" size="lg" className="mt-8">
          Générer mes CGV maintenant
        </ButtonLink>
      </section>
    </>
  );
}
