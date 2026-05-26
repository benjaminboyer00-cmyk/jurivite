import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import {
  getPublisherSameAsLinks,
  isHostingConfigured,
  juriviteLegal,
} from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "À propos — Benjamin Boyer / bzign",
  description:
    "Éditeur de JuriVite : Benjamin Boyer, micro-entreprise bzign. Identification complète sur la page Mentions légales.",
  path: "/a-propos",
});

export default function AProposPage() {
  const l = juriviteLegal;
  const sameAs = getPublisherSameAsLinks();

  return (
    <LegalPageLayout
      title="À propos de JuriVite"
      description="Éditeur identifié du service"
      path="/a-propos"
      breadcrumbLabel="À propos"
    >
      <section>
        <h2 className="text-xl font-semibold">Le service</h2>
        <p className="mt-3">
          <strong>{l.siteName}</strong> ({l.websiteUrl}) est un générateur en ligne de
          modèles de documents juridiques (CGV, mentions légales, RGPD, contrats, devis,
          factures…). Il est édité par {l.legalEntityName}, {l.legalFormShort}, sous le
          nom commercial <strong>{l.tradeName}</strong>.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Version {l.softwareVersion} — historique dans CHANGELOG.md — code sous licence{" "}
          {l.openSourceLicense}.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Identification de l&apos;éditeur</h2>
        <p className="mt-3">
          SIRET, adresse postale, téléphone et hébergeur sont publiés sur la page{" "}
          <Link href="/mentions-legales" className="text-primary hover:underline">
            Mentions légales
          </Link>{" "}
          (obligation LCEN).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Activité & fiscalité</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Micro-entreprise : déclaration du chiffre d&apos;affaires à l&apos;Urssaf.</li>
          <li>Abonnements : {l.tvaFranchiseMention} (seuils franchise en base).</li>
          <li>Factures Stripe avec SIRET et mentions légales obligatoires.</li>
          <li>
            Patrimoine professionnel distinct du patrimoine personnel (loi du 14 février
            2022) — assurance RC Pro recommandée.
          </li>
        </ul>
      </section>

      {sameAs.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Présence en ligne</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {sameAs.map((url) => (
              <li key={url}>
                <a href={url} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">Hébergement</h2>
        <p className="mt-3">
          Coordonnées de l&apos;hébergeur sur la page{" "}
          <Link href="/mentions-legales" className="text-primary hover:underline">
            Mentions légales
          </Link>
          .
        </p>
        {!isHostingConfigured() && (
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
            À compléter en production (JURIVITE_HOSTING_*).
          </p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Conformité</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <Link href="/avis-juridique" className="text-primary hover:underline">
              Avis juridique
            </Link>
          </li>
          <li>
            <Link href="/confidentialite" className="text-primary hover:underline">
              Politique de confidentialité
            </Link>
          </li>
          <li>
            <Link href="/mentions-legales" className="text-primary hover:underline">
              Mentions légales
            </Link>
          </li>
          <li>
            <Link href="/cgu" className="text-primary hover:underline">
              CGU
            </Link>
          </li>
          <li>
            <Link href="/cgv" className="text-primary hover:underline">
              CGV
            </Link>
          </li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}
