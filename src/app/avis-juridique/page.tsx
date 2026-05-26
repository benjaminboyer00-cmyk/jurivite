import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import {
  DISCLAIMER_FULL_TEXT,
  formatLegalEditorBlock,
  juriviteLegal,
} from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Avis juridique — Disclaimer",
  description:
    "JuriVite n'est pas un conseil juridique : modèles automatiques, responsabilité de l'utilisateur, Benjamin Boyer / bzign.",
  path: "/avis-juridique",
});

export default function AvisJuridiquePage() {
  const l = juriviteLegal;

  return (
    <LegalPageLayout
      title="Avis juridique"
      description="Disclaimer obligatoire — service JuriVite"
      path="/avis-juridique"
      breadcrumbLabel="Avis juridique"
    >
      <section className="rounded-lg border border-amber-300/60 bg-amber-50/50 p-6 dark:border-amber-800 dark:bg-amber-950/20">
        <h2 className="text-xl font-semibold">Avertissement important</h2>
        <p className="mt-4 leading-relaxed">{DISCLAIMER_FULL_TEXT}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Pas d&apos;exercice du droit</h2>
        <p className="mt-3">
          {l.siteName} ne personnalise pas le conseil, ne recommande pas de clause selon
          votre situation et ne fait pas valider les documents par un juriste. Tant que
          cette limite est respectée, le service n&apos;entre pas dans l&apos;exercice
          illégal du droit (article 54 de la loi du 31 décembre 1971). Toute évolution
          vers une analyse automatisée de votre cas d&apos;espèce imposerait un cadre
          professionnel différent.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Acceptation avant téléchargement</h2>
        <p className="mt-3">
          Chaque génération de PDF requiert une case à cocher confirmant que vous avez lu
          cet avertissement et les{" "}
          <a href="/cgu" className="text-primary underline">
            CGU
          </a>
          . Le même texte figure sur les PDF générés.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Éditeur</h2>
        <p className="mt-3 whitespace-pre-line">{formatLegalEditorBlock()}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Documents connexes</h2>
        <p className="mt-3">
          <a href="/confidentialite" className="text-primary underline">
            Politique de confidentialité
          </a>
          {" · "}
          <a href="/mentions-legales" className="text-primary underline">
            Mentions légales
          </a>
          {" · "}
          <a href="/cgu" className="text-primary underline">
            CGU
          </a>
          {" · "}
          <a href="/cgv" className="text-primary underline">
            CGV
          </a>
          {" · "}
          <a href="/a-propos" className="text-primary underline">
            À propos
          </a>
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {l.lastUpdated} — v{l.softwareVersion}
        </p>
      </section>
    </LegalPageLayout>
  );
}
