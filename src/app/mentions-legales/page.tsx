import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import { isHostingConfigured, juriviteLegal } from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site JuriVite : éditeur, directeur de publication, hébergeur.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  const l = juriviteLegal;

  return (
    <LegalPageLayout
      title="Mentions légales"
      description={`Site ${l.websiteUrl} — conformité LCEN`}
      path="/mentions-legales"
      breadcrumbLabel="Mentions légales"
    >
      <section>
        <h2 className="text-xl font-semibold">Éditeur du site</h2>
        <p className="mt-3">
          Le site {l.websiteUrl} est édité par :
          <br />
          <strong>{l.companyName}</strong> — {l.legalForm}
          <br />
          Siège : {l.address}
          <br />
          SIRET : {l.siret}
          <br />
          E-mail : {l.email}
          <br />
          Téléphone : {l.phone}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Directeur de publication</h2>
        <p className="mt-3">{l.directorName}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Hébergement</h2>
        <p className="mt-3">
          Hébergeur : <strong>{l.hostingProvider}</strong>
          <br />
          {l.hostingAddress}
        </p>
        {!isHostingConfigured() && (
          <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
            Définissez <code className="text-xs">JURIVITE_HOSTING_PROVIDER</code> et{" "}
            <code className="text-xs">JURIVITE_HOSTING_ADDRESS</code> dans les variables
            d&apos;environnement du VPS (voir PRODUCTION.md).
          </p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p className="mt-3">
          L&apos;ensemble du site (textes, marque, interface, code) est protégé.
          Toute reproduction non autorisée est interdite. Les documents générés par
          l&apos;utilisateur lui appartiennent ; {l.companyName} n&apos;en revendique
          pas la propriété.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-3">
          Pour toute question : {l.email}. Dernière mise à jour : {l.lastUpdated}.
        </p>
      </section>
    </LegalPageLayout>
  );
}
