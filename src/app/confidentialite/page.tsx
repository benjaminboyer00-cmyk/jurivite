import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import { juriviteLegal } from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique RGPD de JuriVite : compte, paiements Stripe, génération PDF, cookies et sous-traitants.",
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
          <br />
          Contact données personnelles :{" "}
          <a href={`mailto:${l.privacyEmail}`} className="text-primary underline">
            {l.privacyEmail}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Données collectées</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Compte</strong> : adresse e-mail, nom (Google OAuth ou lien
            magique Resend), identifiant technique, plan d&apos;abonnement.
          </li>
          <li>
            <strong>Génération PDF</strong> : données saisies dans les formulaires
            (raison sociale, SIRET, coordonnées, contenu métier) pour produire le
            document ; historique si vous êtes connecté.
          </li>
          <li>
            <strong>Paiement</strong> : Stripe traite les données de carte et de
            facturation — nous ne stockons pas vos numéros de carte.
          </li>
          <li>
            <strong>Technique</strong> : logs serveur, adresse IP, cookies de
            session (voir section Cookies).
          </li>
          <li>
            <strong>API Business</strong> : clés API (empreinte hashée), logs
            d&apos;usage.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Finalités et bases légales</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Fourniture du service</strong> (génération PDF, compte,
            historique) — exécution du contrat / mesures précontractuelles.
          </li>
          <li>
            <strong>Abonnements et facturation</strong> — contrat et obligations
            comptables.
          </li>
          <li>
            <strong>Support et sécurité</strong> — intérêt légitime (fraude,
            disponibilité).
          </li>
          <li>
            <strong>Observabilité</strong> (erreurs Sentry, si activé) — intérêt
            légitime, données limitées et pseudonymisées lorsque possible.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Durée de conservation</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Compte : durée de la relation + 3 ans pour les preuves commerciales.</li>
          <li>
            Documents générés (historique) : jusqu&apos;à suppression du compte ou
            demande d&apos;effacement.
          </li>
          <li>
            Données Stripe / facturation : selon obligations légales (jusqu&apos;à
            10 ans pour les pièces comptables le cas échéant).
          </li>
          <li>Logs techniques : durée limitée (quelques semaines à quelques mois).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Sous-traitants</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Hébergeur</strong> : {l.hostingProvider} — {l.hostingAddress}
          </li>
          <li>
            <strong>Stripe</strong> (paiement) — États-Unis / UE selon produit,
            clauses contractuelles types.
          </li>
          <li>
            <strong>Resend</strong> (e-mails de connexion) — selon leurs DPA.
          </li>
          <li>
            <strong>Google</strong> (OAuth optionnel) — politique Google.
          </li>
          <li>
            <strong>Sentry</strong> (monitoring d&apos;erreurs, si DSN configuré) —
            hébergement selon configuration du projet Sentry.
          </li>
          <li>
            <strong>PostgreSQL</strong> : base hébergée chez le fournisseur
            d&apos;infrastructure du site.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p className="mt-3">
          Accès, rectification, effacement, limitation, opposition, portabilité :
          écrivez à {l.privacyEmail}. Vous pouvez{" "}
          <strong>supprimer votre compte</strong> depuis le tableau de bord
          (section « Données personnelles »). Réclamation auprès de la CNIL :{" "}
          <a
            href="https://www.cnil.fr"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.cnil.fr
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p className="mt-3">
          <strong>Cookies essentiels</strong> : session NextAuth (
          <code className="text-xs">authjs.session-token</code> ou équivalent),
          nécessaires à la connexion — pas de consentement requis.
        </p>
        <p className="mt-3">
          <strong>Cookies / traceurs techniques</strong> : si Sentry est activé en
          production, des données techniques peuvent être collectées pour la
          stabilité du service (voir bandeau cookies à l&apos;arrivée sur le site).
        </p>
        <p className="mt-3">
          Pas de publicité ciblée ni de réseaux sociaux tiers au chargement des
          pages à ce jour.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Transferts hors UE</h2>
        <p className="mt-3">
          Certains sous-traitants (Stripe, Resend, Google, Sentry) peuvent traiter
          des données hors Union européenne avec des garanties contractuelles (CCT)
          ou décisions d&apos;adéquation lorsque applicable.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Dernière mise à jour : {l.lastUpdated}.
        </p>
      </section>
    </LegalPageLayout>
  );
}
