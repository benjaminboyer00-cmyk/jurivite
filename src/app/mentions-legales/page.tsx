import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import {
  formatLegalEditorBlock,
  isHostingConfigured,
  juriviteLegal,
} from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales JuriVite : Benjamin Boyer, micro-entreprise bzign, SIRET, hébergeur — LCEN.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  const l = juriviteLegal;

  return (
    <LegalPageLayout
      title="Mentions légales"
      description={`Site ${l.websiteUrl} — conformité LCEN (loi 2004-575)`}
      path="/mentions-legales"
      breadcrumbLabel="Mentions légales"
    >
      <section>
        <h2 className="text-xl font-semibold">Éditeur du site (LCEN)</h2>
        <p className="mt-3 whitespace-pre-line">{formatLegalEditorBlock()}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Cette page centralise l&apos;identification légale de l&apos;éditeur (coordonnées,
          SIRET, hébergeur). Elle complète les autres documents du site sans répéter ces
          informations sur les pages marketing.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Le site {l.websiteUrl} propose le service « {l.siteName} » (générateur de
          modèles de documents juridiques en PDF). La marque {l.siteName} est exploitée
          par l&apos;entrepreneur individuel identifié ci-dessus sous le nom commercial «{" "}
          {l.tradeName} ».
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Statut juridique</h2>
        <p className="mt-3">
          {l.legalEntityName} exerce en {l.legalFormShort}. {l.rcsRmMention}. Numéro
          SIRET obligatoire : {l.siret}. Facturation des abonnements :{" "}
          {l.tvaFranchiseMention} (sous réserve des seuils de franchise en base).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Directeur de publication</h2>
        <p className="mt-3">{l.directorName}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Hébergement</h2>
        <p className="mt-3">
          Hébergeur du site : <strong>{l.hostingProvider}</strong>
          <br />
          {l.hostingAddress}
        </p>
        {!isHostingConfigured() && (
          <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
            Complétez <code className="text-xs">JURIVITE_HOSTING_PROVIDER</code> et{" "}
            <code className="text-xs">JURIVITE_HOSTING_ADDRESS</code> sur le serveur de
            production.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Documents obligatoires</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <a href="/avis-juridique" className="text-primary underline">
              Avis juridique (disclaimer)
            </a>
          </li>
          <li>
            <a href="/confidentialite" className="text-primary underline">
              Politique de confidentialité (RGPD)
            </a>
          </li>
          <li>
            <a href="/cgu" className="text-primary underline">
              Conditions générales d&apos;utilisation
            </a>
          </li>
          <li>
            <a href="/cgv" className="text-primary underline">
              Conditions générales de vente (abonnements)
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p className="mt-3">
          Le site, le code source, les templates et la marque {l.siteName} sont protégés.
          Les PDF générés par l&apos;utilisateur lui appartiennent ; l&apos;éditeur ne revendique
          pas la propriété du contenu métier saisi par les utilisateurs. Licence du code
          open source : {l.openSourceLicense} (voir dépôt du projet).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-3">
          {l.email} — {l.phone}. Mise à jour : {l.lastUpdated}.
        </p>
      </section>
    </LegalPageLayout>
  );
}
