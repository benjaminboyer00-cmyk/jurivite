import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import { juriviteLegal } from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique RGPD de JuriVite : compte, paiements Stripe, génération PDF, cookies.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  const l = juriviteLegal;

  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      description={`Protection des données sur ${l.siteName} — RGPD`}
      path="/confidentialite"
      breadcrumbLabel="Confidentialité"
    >
      <section>
        <h2 className="text-xl font-semibold">Responsable du traitement</h2>
        <p className="mt-3">
          {l.companyName}, {l.legalForm}, {l.address}, SIRET {l.siret}.
          Contact données personnelles : {l.email}.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Données collectées</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Compte</strong> : adresse e-mail, nom (connexion Google ou lien
            magique Resend), identifiant technique.
          </li>
          <li>
            <strong>Génération PDF</strong> : données saisies dans les formulaires
            (raison sociale, SIRET, coordonnées clients, etc.) pour produire le
            document et, si vous êtes connecté, l&apos;historique.
          </li>
          <li>
            <strong>Paiement</strong> : données traitées par Stripe (nous ne
            stockons pas vos numéros de carte).
          </li>
          <li>
            <strong>Technique</strong> : logs serveur, cookies strictement
            nécessaires à la session et à la sécurité.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Finalités</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Fourniture du service de génération de documents</li>
          <li>Gestion des abonnements et facturation</li>
          <li>Support client et sécurité du site</li>
          <li>Respect des obligations légales (comptabilité, lutte contre la fraude)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Durée de conservation</h2>
        <p className="mt-3">
          Données de compte : durée de la relation contractuelle puis 3 ans pour les
          preuves commerciales. Documents générés (historique) : jusqu&apos;à
          suppression du compte ou demande d&apos;effacement. Données de facturation
          Stripe : selon politique Stripe et obligations comptables (10 ans pour les
          pièces comptables le cas échéant).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Sous-traitants</h2>
        <p className="mt-3">
          Prestataires pouvant traiter vos données : hébergeur du site, Stripe
          (paiement), Resend (e-mails transactionnels), Google (OAuth optionnel),
          base de données PostgreSQL hébergée chez votre fournisseur d&apos;infrastructure.
          Des contrats conformes à l&apos;article 28 du RGPD sont conclus lorsque requis.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p className="mt-3">
          Accès, rectification, effacement, limitation, opposition, portabilité :
          contactez {l.email}. Réclamation possible auprès de la CNIL (www.cnil.fr).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p className="mt-3">
          Cookies de session et d&apos;authentification nécessaires au fonctionnement.
          Si des outils de mesure d&apos;audience sont ajoutés, un bandeau de
          consentement sera mis en place.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Dernière mise à jour : {l.lastUpdated}.
        </p>
      </section>
    </LegalPageLayout>
  );
}
