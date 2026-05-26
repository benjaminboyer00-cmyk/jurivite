import Link from "next/link";

import {
  CGV_NICHE_CLUSTERS,
  getCgvNichesByCluster,
  type CgvNicheCluster,
} from "@/lib/documents/niches-seo";

/** Index crawlable par catégorie — maillage interne SEO */
export function ModelesSeoIndex() {
  const clusters = Object.values(CGV_NICHE_CLUSTERS);

  return (
    <section
      aria-labelledby="modeles-index-heading"
      className="mt-20 border-t pt-16"
    >
      <h2 id="modeles-index-heading" className="text-xl font-bold tracking-tight">
        Index complet — CGV par métier
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Retrouvez les 50 modèles classés par secteur. Chaque page détaille les clauses
        adaptées à votre activité.
      </p>
      <div className="mt-10 space-y-12">
        {clusters.map((cluster) => {
          const niches = getCgvNichesByCluster(cluster.id as CgvNicheCluster);
          return (
            <section key={cluster.id} id={`cluster-${cluster.id}`}>
              <h3 className="text-lg font-semibold">
                <Link
                  href={`/modeles?categorie=${cluster.id}`}
                  className="hover:text-primary"
                >
                  CGV {cluster.label}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{cluster.description}</p>
              <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
                {niches.map((niche) => (
                  <li key={niche.slug} className="mb-2 break-inside-avoid">
                    <Link
                      href={niche.path}
                      className="text-muted-foreground hover:text-primary hover:underline"
                    >
                      CGV {niche.profession}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
