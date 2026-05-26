import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import { formatLegalEditorBlock, juriviteLegal } from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Politique de confidentialité",
  description:
    "RGPD JuriVite : Benjamin Boyer / bzign, Stripe, Resend, hébergeur, droits des personnes, cookies.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  const l = juriviteLegal;

  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      description={`RGPD — service ${l.siteName}`}
      path="/confidentialite"
      breadcrumbLabel="Confidentialité"
    >
      <section>
        <h2 className="text-xl font-semibold">Responsable du traitement</h2>
        <p className="mt-3 whitespace-pre-line">{formatLegalEditorBlock()}</p>
        <p className="mt-3">
          Contact données personnelles :{" "}
          <a href={`mailto:${l.privacyEmail}`} className="text-primary underline">
            {l.privacyEmail}
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Données collectées</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Compte</strong> : e-mail, nom (Google ou Resend), mot de passe
            (hash bcrypt), plan, identifiants techniques.
          </li>
          <li>
            <strong>Formulaires PDF</strong> : données saisies (raison sociale, SIRET,
            coordonnées, contenu métier) pour générer le document ; historique si connecté.
          </li>
          <li>
            <strong>Paiement</strong> : Stripe traite carte et facturation — nous ne
            stockons pas les numéros de carte.
          </li>
          <li>
            <strong>Technique</strong> : logs, adresse IP, cookies de session, génération
            PDF via Puppeteer/Chromium sur le serveur.
          </li>
          <li>
            <strong>API Business</strong> : empreinte hashée des clés API, journaux
            d&apos;usage.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Finalités et bases légales</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Service</strong> (compte, PDF, historique) — contrat / mesures
            précontractuelles.
          </li>
          <li>
            <strong>Facturation</strong> — contrat et obligations comptables (10 ans).
          </li>
          <li>
            <strong>Sécurité & support</strong> — intérêt légitime.
          </li>
          <li>
            <strong>Sentry</strong> (si activé) — intérêt légitime, erreurs techniques.
          </li>
          <li>
            <strong>Cookies non essentiels</strong> — consentement lorsque applicable.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Durées de conservation</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Compte : durée de la relation + 3 ans (preuves commerciales).</li>
          <li>Documents en historique : jusqu&apos;à suppression du compte.</li>
          <li>Facturation Stripe / comptabilité : jusqu&apos;à 10 ans.</li>
          <li>Logs techniques : quelques semaines à quelques mois.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Sous-traitants (art. 28 RGPD)</h2>
        <p className="mt-3">
          Des contrats de sous-traitance (DPA) sont acceptés avec les prestataires suivants
          lorsque le service est activé :
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Hébergeur</strong> : {l.hostingProvider} — {l.hostingAddress}
          </li>
          <li>
            <strong>Stripe</strong> (paiement) — DPA Stripe.
          </li>
          <li>
            <strong>Resend</strong> (e-mails de connexion) — DPA Resend.
          </li>
          <li>
            <strong>Google</strong> (OAuth optionnel).
          </li>
          <li>
            <strong>Sentry</strong> (monitoring, si configuré).
          </li>
          <li>
            <strong>PostgreSQL</strong> sur l&apos;infrastructure de l&apos;hébergeur.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Registre des activités de traitement</h2>
        <p className="mt-3">
          {l.legalEntityName} tient un registre des traitements (comptes utilisateurs,
          abonnements, génération PDF, support, sécurité) conformément à l&apos;article 30
          du RGPD. Sur demande à {l.privacyEmail} pour les autorités ou en cas de contrôle.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p className="mt-3">
          Accès, rectification, effacement, limitation, opposition, portabilité :{" "}
          {l.privacyEmail}.{" "}
          <strong>Suppression du compte</strong> : section « Données personnelles » du{" "}
          <a href="/dashboard/compte" className="text-primary underline">
            compte
          </a>
          . Réclamation CNIL :{" "}
          <a href="https://www.cnil.fr" className="text-primary underline" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Violation de données</h2>
        <p className="mt-3">
          En cas de violation de données personnelles présentant un risque pour vos droits,
          notification à la CNIL dans les 72 heures lorsque requis, et information des
          personnes concernées si le risque est élevé.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p className="mt-3">
          <strong>Essentiels</strong> : session d&apos;authentification (NextAuth) — pas de
          consentement requis.
        </p>
        <p className="mt-3">
          <strong>Optionnels</strong> : traceurs Sentry en production — information via le
          bandeau cookies ; retrait possible en refusant les cookies non essentiels ou en
          contactant {l.privacyEmail}.
        </p>
        <p className="mt-3">Pas de publicité ciblée ni de réseaux sociaux tiers au chargement.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Transferts hors UE</h2>
        <p className="mt-3">
          Certains sous-traitants (Stripe, Resend, Google, Sentry) peuvent traiter des
          données hors UE avec clauses contractuelles types ou décisions d&apos;adéquation.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">{l.lastUpdated}</p>
      </section>
    </LegalPageLayout>
  );
}
