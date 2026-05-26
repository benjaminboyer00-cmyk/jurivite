import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import {
  DISCLAIMER_FULL_TEXT,
  getContractPartyLabel,
  juriviteLegal,
} from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Conditions Générales d'Utilisation",
  description:
    "CGU JuriVite : Benjamin Boyer / bzign, modèles sans conseil juridique, compte, API, responsabilité.",
  path: "/cgu",
});

export default function CguPage() {
  const l = juriviteLegal;
  const party = getContractPartyLabel();

  return (
    <LegalPageLayout
      title="Conditions Générales d'Utilisation"
      description={`Usage du service ${l.siteName} — ${l.lastUpdated}`}
      path="/cgu"
      breadcrumbLabel="CGU"
    >
      <section>
        <h2 className="text-xl font-semibold">Article 1 — Parties et objet</h2>
        <p className="mt-3">
          Les présentes CGU régissent l&apos;accès à {l.websiteUrl} et au service{" "}
          {l.siteName}. Le contrat est conclu entre l&apos;utilisateur et {party}. Les{" "}
          <a href="/cgv" className="text-primary underline">
            CGV
          </a>{" "}
          complètent les CGU pour les abonnements payants.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          Article 2 — Nature du service (pas de conseil juridique)
        </h2>
        <p className="mt-3">{DISCLAIMER_FULL_TEXT}</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            Aucune analyse automatisée de votre situation personnelle ; pas de
            recommandation de clause adaptée à un cas d&apos;espèce.
          </li>
          <li>
            Le service ne constitue pas l&apos;exercice du droit au sens de l&apos;article 54
            de la loi n° 71-1130 du 31 décembre 1971.
          </li>
          <li>
            L&apos;utilisateur s&apos;engage à ne pas présenter les documents générés comme
            validés par un avocat ou un cabinet.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 3 — Compte et usage</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Compte par e-mail/mot de passe, lien magique (Resend) ou Google OAuth.</li>
          <li>
            L&apos;utilisateur garantit l&apos;exactitude des données saisies et l&apos;usage
            licite du service (pas de surcharge abusive, pas de revente du service).
          </li>
          <li>
            Suspension possible en cas d&apos;abus, fraude ou impayé d&apos;abonnement.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 4 — Documents générés</h2>
        <p className="mt-3">
          PDF fournis « en l&apos;état ». Licence d&apos;usage personnel et professionnelle
          pour les besoins propres de l&apos;utilisateur (publication sur son site, envoi à
          ses clients). Interdiction de revendre l&apos;accès au service ou de le faire passer
          pour un conseil juridique certifié. Versions gratuites : filigrane {l.siteName}.
          Téléchargement soumis à acceptation de l&apos;avis juridique (case à cocher).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 5 — Propriété intellectuelle</h2>
        <p className="mt-3">
          Le code, l&apos;interface, la structure des templates et la marque {l.siteName}{" "}
          restent la propriété de {l.legalEntityName}. L&apos;utilisateur conserve la
          responsabilité et les droits sur le contenu qu&apos;il saisit ; il obtient une
          licence non exclusive d&apos;exploitation des PDF générés pour son activité.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 6 — API (Business)</h2>
        <p className="mt-3">
          Réservée aux abonnés Business. Clés confidentielles, usage raisonnable. Révocation
          en cas de violation des CGU.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 7 — Données personnelles</h2>
        <p className="mt-3">
          Voir la{" "}
          <a href="/confidentialite" className="text-primary underline">
            politique de confidentialité
          </a>
          . Suppression du compte depuis le{" "}
          <a href="/dashboard/compte" className="text-primary underline">
            tableau de bord
          </a>{" "}
          ou par e-mail à {l.privacyEmail}.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 8 — Responsabilité</h2>
        <p className="mt-3">
          {l.legalEntityName} n&apos;est pas responsable des litiges entre l&apos;utilisateur
          et ses clients, ni des sanctions liées à des documents inadaptés. Responsabilité
          limitée aux montants payés sur les 12 derniers mois pour les abonnés, dans les
          limites autorisées par la loi (hors faute lourde ou dol).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 9 — Droit applicable</h2>
        <p className="mt-3">
          Droit français. Litiges : contact amiable à {l.email}, puis {l.competentCourt}.
          Consommateurs : médiation {l.mediatorName} —{" "}
          <a href={l.mediatorUrl} className="text-primary underline" target="_blank" rel="noopener noreferrer">
            {l.mediatorUrl}
          </a>
          .
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          {l.lastUpdated} — {l.legalEntityName} ({l.tradeName}) — SIRET {l.siret} —{" "}
          {l.address}
        </p>
      </section>
    </LegalPageLayout>
  );
}
