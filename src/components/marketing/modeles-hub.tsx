"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";

import {
  ClusterPills,
  NicheSearch,
  PopularNichePills,
  useModelesHubParams,
} from "@/components/marketing/niche-search";
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

  const filtered = useMemo(() => {
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

  const handleCluster = (next: CgvNicheCluster | "all") => {
    setParams({ categorie: next });
  };

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <NicheSearch
          label="Rechercher votre métier"
          defaultQuery={query}
          directToGenerate={false}
          submitLabel="Trouver mon modèle"
          compactFooter
          onQueryChange={(q) => setParams({ q })}
        />
        <PopularNichePills slugs={POPULAR_NICHE_SLUGS} className="mt-6" />
      </div>

      <div className="mt-10">
        <ClusterPills active={cluster} onChange={handleCluster} />
      </div>

      {(query || cluster !== "all") && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {query ? (
            <>
              Résultats pour « {query} » — {filtered.length} modèle(s)
            </>
          ) : cluster !== "all" ? (
            <>
              {CGV_NICHE_CLUSTERS[cluster].label} — {filtered.length} modèle(s)
            </>
          ) : null}
        </p>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((niche) => (
          <Link
            key={niche.slug}
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
        ))}
      </div>

      {filtered.length === 0 ? (
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
          <Link href="/generate/cgv" className="text-sm text-primary underline">
            CGV génériques
          </Link>
        </div>
      ) : null}
    </>
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
