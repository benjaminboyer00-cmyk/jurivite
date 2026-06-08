"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";

import {
  ClusterPills,
  NicheSearch,
  PopularNichePills,
  useModelesHubParams,
} from "@/components/marketing/niche-search";
import { CONTRACT_HUB_PATH } from "@/lib/documents/contract-seo-hub";
import {
  getFeaturedDocuments,
  searchCatalogModels,
} from "@/lib/documents/model-search";
import {
  CGV_NICHE_CLUSTERS,
  cgvNiches,
  getCgvNichePath,
  POPULAR_NICHE_SLUGS,
  type CgvNiche,
  type CgvNicheCluster,
} from "@/lib/documents/niches-seo";

function ModelesHubInner() {
  const { query, cluster, setParams } = useModelesHubParams();

  const catalogMatches = useMemo(
    () => (query.trim() ? searchCatalogModels(query, 12) : []),
    [query],
  );

  const filteredNiches = useMemo(() => {
    let list = cgvNiches;
    if (cluster !== "all") {
      list = list.filter((n) => n.cluster === cluster);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      return list.filter(
        (n) =>
          n.profession.toLowerCase().includes(q) ||
          n.searchTerms.some((t) => t.toLowerCase().includes(q)) ||
          n.slug.includes(q.replace(/\s+/g, "-")),
      );
    }
    return list;
  }, [cluster, query]);

  const featuredDocs = useMemo(() => getFeaturedDocuments(), []);
  const showFeatured = !query.trim();

  const handleCluster = (next: CgvNicheCluster | "all") => {
    setParams({ categorie: next });
  };

  const totalResults = catalogMatches.length + filteredNiches.length;

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <NicheSearch
          label="Rechercher un modèle"
          placeholder="Ex. contrat, devis, photographe, développeur web…"
          defaultQuery={query}
          directToGenerate={false}
          submitLabel="Trouver mon modèle"
          compactFooter
          onQueryChange={(q) => setParams({ q })}
        />
        <PopularNichePills slugs={POPULAR_NICHE_SLUGS} className="mt-6" />
      </div>

      {showFeatured ? (
        <section className="mt-10">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Modèles juridiques essentiels
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={doc.href}
                className="group rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  {doc.shortTitle}
                </p>
                <h3 className="mt-1 font-semibold leading-snug group-hover:text-primary">
                  {doc.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {doc.shortDescription}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-center text-sm">
            <Link
              href={CONTRACT_HUB_PATH}
              className="font-medium text-primary hover:underline"
            >
              Contrat freelance norme — tous les guides →
            </Link>
          </p>
        </section>
      ) : null}

      <div className="mt-10">
        <ClusterPills active={cluster} onChange={handleCluster} />
      </div>

      {(query || cluster !== "all") && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {query ? (
            <>
              Résultats pour « {query} » — {totalResults} modèle(s)
            </>
          ) : cluster !== "all" ? (
            <>
              {CGV_NICHE_CLUSTERS[cluster].label} — {filteredNiches.length} modèle(s)
            </>
          ) : null}
        </p>
      )}

      {catalogMatches.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Modèles juridiques</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalogMatches.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  {item.badge}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-primary">
                  Générer le modèle →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className={catalogMatches.length > 0 ? "mt-12" : "mt-10"}>
        {query && catalogMatches.length > 0 ? (
          <h2 className="mb-4 text-lg font-semibold">CGV par métier</h2>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNiches.map((niche) => (
            <NicheCard key={niche.slug} niche={niche} />
          ))}
        </div>
      </section>

      {totalResults === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Aucun modèle pour « {query} ».
          </p>
          <button
            type="button"
            className="mt-2 text-sm text-primary underline"
            onClick={() => setParams({ q: "", categorie: cluster })}
          >
            Effacer la recherche
          </button>
          {" · "}
          <Link
            href="/generate/contrat-prestation"
            className="text-sm text-primary underline"
          >
            Contrat de prestation
          </Link>
          {" · "}
          <Link href="/generate/cgv" className="text-sm text-primary underline">
            CGV génériques
          </Link>
        </div>
      ) : null}
    </>
  );
}

function NicheCard({ niche }: { niche: CgvNiche }) {
  return (
    <Link
      href={getCgvNichePath(niche.slug)}
      className="group flex flex-col rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-primary">
        {CGV_NICHE_CLUSTERS[niche.cluster].shortLabel}
      </p>
      <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary">
        {niche.profession}
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {niche.intro}
      </p>
      <span className="mt-4 inline-block text-sm font-medium text-primary">
        Voir le modèle →
      </span>
    </Link>
  );
}

export function ModelesHub() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto h-48 max-w-2xl animate-pulse rounded-xl bg-muted/50" />
      }
    >
      <ModelesHubInner />
    </Suspense>
  );
}
