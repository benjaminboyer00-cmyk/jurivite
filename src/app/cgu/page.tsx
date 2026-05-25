import type { Metadata } from "next";

import {
  LegalPageLayout,
  legalPageMetadata,
} from "@/components/legal/legal-page-layout";
import { juriviteLegal } from "@/lib/legal/jurivite-site";

export const metadata: Metadata = legalPageMetadata({
  title: "Conditions Générales d'Utilisation",
  description:
    "CGU du service JuriVite : compte, génération PDF, API, propriété intellectuelle et responsabilité.",
  path: "/cgu",
});

export default function CguPage() {
  const l = juriviteLegal;

  return (
    <LegalPageLayout
      title="Conditions Générales d'Utilisation"
      description={`Usage du service ${l.siteName} — ${l.lastUpdated}`}
      path="/cgu"
      breadcrumbLabel="CGU"
    >
      <section>
        <h2 className="text-xl font-semibold">Article 1 — Objet</h2>
        <p className="mt-3">
          Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent
          l&apos;accès et l&apos;usage du site {l.websiteUrl} et du service de
          génération de documents au format PDF proposé par {l.companyName},{" "}
          {l.legalForm}. Les{" "}
          <a href="/cgv" className="text-primary underline">
            CGV
          </a>{" "}
          complètent les CGU pour les abonnements payants.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 2 — Nature du service</h2>
        <p className="mt-3">
          {l.siteName} fournit des <strong>modèles de documents</strong> remplis
          via formulaire. Le service ne constitue pas un cabinet d&apos;avocats ni
          un conseil juridique personnalisé. L&apos;utilisateur reste seul
          responsable de l&apos;exactitude des données saisies, de la publication
          des documents et de leur conformité à son activité et à la réglementation
          applicable.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 3 — Compte utilisateur</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            Création de compte par lien magique (e-mail) ou Google OAuth, selon
            configuration.
          </li>
          <li>
            L&apos;utilisateur garantit l&apos;exactitude de son adresse e-mail et
            la confidentialité de son accès.
          </li>
          <li>
            {l.companyName} peut suspendre un compte en cas d&apos;abus, fraude ou
            non-paiement d&apos;un abonnement.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 4 — Documents générés</h2>
        <p className="mt-3">
          Les PDF produits sont fournis « en l&apos;état ». L&apos;utilisateur
          dispose d&apos;une licence d&apos;usage personnel et professionnelle
          pour ses propres besoins. Il ne peut pas revendre le service JuriVite ni
          présenter les modèles comme un conseil juridique certifié. Les versions
          gratuites peuvent comporter un filigrane.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 5 — API (offre Business)</h2>
        <p className="mt-3">
          L&apos;accès API est réservé aux abonnés Business. Usage raisonnable,
          clés confidentielles, interdiction de surcharge volontaire du service.
          {l.companyName} peut révoquer une clé en cas de violation des CGU.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 6 — Données personnelles</h2>
        <p className="mt-3">
          Voir la{" "}
          <a href="/confidentialite" className="text-primary underline">
            politique de confidentialité
          </a>
          . Vous pouvez demander l&apos;effacement de votre compte depuis le{" "}
          <a href="/dashboard" className="text-primary underline">
            tableau de bord
          </a>{" "}
          ou par e-mail à {l.privacyEmail}.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 7 — Responsabilité</h2>
        <p className="mt-3">
          {l.companyName} n&apos;est pas responsable des litiges entre
          l&apos;utilisateur et ses clients, ni des sanctions liées à des
          documents incomplets ou inadaptés. La responsabilité de {l.companyName}{" "}
          est limitée aux montants payés sur les douze (12) derniers mois pour les
          abonnés, dans les limites autorisées par la loi.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Article 8 — Droit applicable</h2>
        <p className="mt-3">
          Droit français. Litiges : contact amiable à {l.email}, puis tribunaux
          français compétents. Consommateurs : médiation via {l.mediatorName} —{" "}
          <a
            href={l.mediatorUrl}
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.mediatorUrl}
          </a>
          .
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Dernière mise à jour : {l.lastUpdated}. Éditeur : {l.companyName} —{" "}
          {l.address} — SIRET {l.siret}.
        </p>
      </section>
    </LegalPageLayout>
  );
}
