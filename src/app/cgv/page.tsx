import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import { juriviteLegal } from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Conditions Générales de Vente",
  description:
    "CGV du service JuriVite : abonnements Pro et Business, génération de documents juridiques en PDF.",
  path: "/cgv",
});

export default function CgvPage() {
  const l = juriviteLegal;

  return (
    <LegalPageLayout
      title="Conditions Générales de Vente"
      description={`Applicables au service ${l.siteName} — mise à jour ${l.lastUpdated}`}
      path="/cgv"
      breadcrumbLabel="CGV"
    >
      <section>
        <h2 className="text-xl font-semibold">Article 1 — Objet</h2>
        <p className="mt-3">
          Les présentes Conditions Générales de Vente (CGV) régissent l&apos;accès
          et l&apos;utilisation du service en ligne {l.siteName} ({l.websiteUrl}),
          édité par {l.companyName}, {l.legalForm}, qui propose la génération de
          documents juridiques au format PDF via un formulaire guidé.
        </p>
        <p className="mt-3">
          {l.siteName} fournit des <strong>modèles structurés</strong>, et non un
          conseil juridique personnalisé. L&apos;utilisateur reste responsable du
          contenu publié et de la conformité de ses documents à son activité.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 2 — Offres et tarifs</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Gratuit</strong> : génération de PDF avec filigrane « JuriVite
            », sans limite de volume.
          </li>
          <li>
            <strong>Pro (9 € TTC / mois)</strong> : 20 PDF par mois sans filigrane,
            historique et retéléchargement.
          </li>
          <li>
            <strong>Business (30 € TTC / mois)</strong> : PDF illimités sans
            filigrane et accès API REST.
          </li>
        </ul>
        <p className="mt-3">
          Les tarifs en vigueur sont affichés sur la page{" "}
          <a href="/tarifs" className="text-primary underline">
            Tarifs
          </a>
          . {l.companyName} peut modifier ses prix ; les abonnés en cours sont
          informés avant application.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 3 — Commande et paiement</h2>
        <p className="mt-3">
          Les abonnements payants sont souscrits en ligne via Stripe. Le paiement
          est exigible d&apos;avance, mensuellement. En cas de défaut de paiement,
          l&apos;accès aux fonctionnalités Pro ou Business peut être suspendu et le
          compte repasse en offre gratuite.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 4 — Droit de rétractation</h2>
        <p className="mt-3">
          Pour les consommateurs, un délai de rétractation de 14 jours peut
          s&apos;appliquer conformément au Code de la consommation, sous réserve des
          exceptions légales (prestation numérique commencée avec accord exprès,
          etc.). Pour exercer ce droit : {l.email}.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 5 — Responsabilité</h2>
        <p className="mt-3">
          {l.companyName} met en œuvre des moyens raisonnables pour assurer la
          disponibilité du service. La responsabilité est limitée aux montants
          effectivement payés par l&apos;utilisateur au cours des douze (12) derniers
          mois, hors faute lourde ou dol. Aucun dommage indirect (perte de chiffre
          d&apos;affaires, litige avec un tiers) n&apos;est couvert.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 6 — Données personnelles</h2>
        <p className="mt-3">
          Les traitements de données sont décrits dans la{" "}
          <a href="/confidentialite" className="text-primary underline">
            politique de confidentialité
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 7 — Droit applicable</h2>
        <p className="mt-3">
          Les CGV sont soumises au droit français. Litiges : tribunaux français
          compétents, après tentative de résolution amiable par e-mail à {l.email}.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Éditeur : {l.companyName} — {l.legalForm} — SIRET {l.siret} — {l.address}{" "}
          — {l.email}
        </p>
      </section>
    </LegalPageLayout>
  );
}
