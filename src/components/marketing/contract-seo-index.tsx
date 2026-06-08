import Link from "next/link";

import {
  CONTRACT_HUB_PATH,
  getContractDocumentGenerators,
  getContractLandings,
} from "@/lib/documents/contract-seo-hub";

/** Index crawlable — maillage interne SEO contrats */
export function ContractSeoIndex() {
  const landings = getContractLandings();
  const generators = getContractDocumentGenerators();

  return (
    <section
      aria-labelledby="contrats-index-heading"
      className="mt-20 border-t pt-16"
    >
      <h2 id="contrats-index-heading" className="text-xl font-bold tracking-tight">
        Index complet — contrats & prestations
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Guides par intention de recherche (norme, auto-entrepreneur, PDF, B2B…) et
        générateurs associés.
      </p>

      <section className="mt-10">
        <h3 className="text-lg font-semibold">Générateurs</h3>
        <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2">
          {generators.map((doc) => (
            <li key={doc.slug} className="mb-2 break-inside-avoid">
              <Link
                href={doc.href}
                className="text-muted-foreground hover:text-primary hover:underline"
              >
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h3 className="text-lg font-semibold">Guides & modèles par mot-clé</h3>
        <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
          {landings.map((landing) => (
            <li key={landing.slug} className="mb-2 break-inside-avoid">
              <Link
                href={`/generate/${landing.slug}`}
                className="text-muted-foreground hover:text-primary hover:underline"
              >
                {landing.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-sm text-muted-foreground">
        <Link href={CONTRACT_HUB_PATH} className="font-medium text-primary hover:underline">
          Hub contrats freelance
        </Link>
        {" · "}
        <Link href="/modeles" className="text-primary hover:underline">
          Modèles CGV par métier
        </Link>
      </p>
    </section>
  );
}
