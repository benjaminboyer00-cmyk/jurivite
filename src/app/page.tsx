import Link from "next/link";
import { CheckCircle2, Shield, Zap } from "lucide-react";

import { DocumentCard } from "@/components/marketing/document-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { documents } from "@/lib/documents/registry";

const features = [
  {
    icon: Zap,
    title: "Rapide",
    description:
      "Formulaire guidé en quelques minutes. Pas de jargon juridique inutile.",
  },
  {
    icon: Shield,
    title: "Structuré",
    description:
      "Modèles pensés pour freelances et TPE, avec champs obligatoires couverts.",
  },
  {
    icon: CheckCircle2,
    title: "Prêt pour le web",
    description:
      "Export PDF pour votre site, vos devis et vos conditions de vente.",
  },
] as const;

export default function HomePage() {
  return (
    <div>
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Badge variant="secondary" className="mb-4">
            MVP — lancement local
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Vos documents juridiques,{" "}
            <span className="text-primary">générés en quelques clics</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            JuriVite aide les freelances et petites entreprises à produire les 5
            documents les plus recherchés : CGV, mentions légales, politique RGPD,
            contrat de prestation et devis conforme.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/generate/cgv" size="lg">
              Créer mes CGV gratuitement
            </ButtonLink>
            <ButtonLink href="#documents" variant="outline" size="lg">
              Voir les documents
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Gratuit avec filigrane · Pro 9 €/mo sans filigrane (bientôt)
          </p>
        </div>
      </section>

      <section id="documents" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Documents disponibles
          </h2>
          <p className="mt-2 text-muted-foreground">
            Les 5 documents à plus fort ROI : ceux qui évitent amendes, litiges et
            impayés.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard key={doc.slug} document={doc} />
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Pourquoi JuriVite ?
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="space-y-3">
                <feature.icon
                  className="size-8 text-primary"
                  aria-hidden
                />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Lancez-vous avant la prochaine vente
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Des CGV claires rassurent vos clients et limitent les litiges. Générez
          les vôtres maintenant.
        </p>
        <ButtonLink href="/generate/cgv" size="lg" className="mt-8">
          Générer mes CGV
        </ButtonLink>
      </section>
    </div>
  );
}
