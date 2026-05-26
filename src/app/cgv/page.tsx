import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import { getContractPartyLabel, juriviteLegal } from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Conditions Générales de Vente",
  description:
    "CGV abonnements JuriVite : Pro 9€, Business 30€, micro-entreprise Benjamin Boyer / bzign.",
  path: "/cgv",
});

export default function CgvPage() {
  const l = juriviteLegal;
  const party = getContractPartyLabel();

  return (
    <LegalPageLayout
      title="Conditions Générales de Vente"
      description={`Abonnements ${l.siteName} — ${l.lastUpdated}`}
      path="/cgv"
      breadcrumbLabel="CGV"
    >
      <section>
        <h2 className="text-xl font-semibold">Article 1 — Objet</h2>
        <p className="mt-3">
          Les CGV régissent les abonnements au service {l.siteName} ({l.websiteUrl}),
          vendu par {party}. Le service fournit des modèles de documents, non un conseil
          juridique (voir{" "}
          <a href="/avis-juridique" className="text-primary underline">
            avis juridique
          </a>
          ).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 2 — Offres et prix TTC</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Gratuit</strong> : PDF avec filigrane, sans limite de volume.
          </li>
          <li>
            <strong>Pro — 9 € TTC / mois</strong> : 20 PDF / mois sans filigrane, historique.
          </li>
          <li>
            <strong>Business — 30 € TTC / mois</strong> : PDF illimités, API REST.
          </li>
        </ul>
        <p className="mt-3">
          Tarifs sur{" "}
          <a href="/tarifs" className="text-primary underline">
            /tarifs
          </a>
          . {l.tvaFranchiseMention} pour les prestations de {l.legalEntityName} (micro-entreprise).
          Factures émises via Stripe avec mentions légales obligatoires (SIRET, éditeur).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 3 — Paiement</h2>
        <p className="mt-3">
          Paiement mensuel d&apos;avance par Stripe. En cas d&apos;échec de paiement, retour
          à l&apos;offre gratuite. L&apos;utilisateur accepte les CGV et CGU lors du checkout.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 4 — Rétractation</h2>
        <p className="mt-3">
          Contenu numérique exécuté immédiatement : renonciation au droit de rétractation
          de 14 jours lors du paiement (art. L221-28 C. consom.). Contact : {l.email}.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 5 — Résiliation</h2>
        <p className="mt-3">
          Sans engagement. Résiliation via le portail Stripe (tableau de bord) ou {l.email}.
          Accès maintenu jusqu&apos;à la fin de la période payée.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 6 — Médiation</h2>
        <p className="mt-3">
          {l.mediatorName} —{" "}
          <a href={l.mediatorUrl} className="text-primary underline" target="_blank" rel="noopener noreferrer">
            {l.mediatorUrl}
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 7 — Responsabilité</h2>
        <p className="mt-3">
          Responsabilité limitée aux montants payés sur 12 mois, hors faute lourde. Aucun
          dommage indirect couvert.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 8 — Données & droit applicable</h2>
        <p className="mt-3">
          <a href="/confidentialite" className="text-primary underline">
            Politique de confidentialité
          </a>
          . Droit français — {l.competentCourt}.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Vendeur : {l.legalEntityName} — {l.tradeName} — SIRET {l.siret} — {l.address} —{" "}
          {l.email}
        </p>
      </section>
    </LegalPageLayout>
  );
}
