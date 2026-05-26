"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CGV_NICHE_CLUSTERS,
  cgvNiches,
  getCgvNichePath,
  getGenerateCgvUrl,
  searchCgvNiches,
  type CgvNiche,
  type CgvNicheCluster,
} from "@/lib/documents/niches-seo";

type NicheSearchProps = {
  label?: string;
  placeholder?: string;
  showSubmitButton?: boolean;
  submitLabel?: string;
  /** Landing SEO (conversion) ou générateur direct */
  directToGenerate?: boolean;
  /** Valeur initiale (URL ?q=) */
  defaultQuery?: string;
  /** Filtre la grille /modeles en direct */
  onQueryChange?: (query: string) => void;
  className?: string;
  compactFooter?: boolean;
};

export function NicheSearch({
  label = "Quel est votre métier ?",
  placeholder = "Ex. photographe, sophrologue, développeur web…",
  showSubmitButton = true,
  submitLabel = "Générer mes CGV",
  directToGenerate = false,
  defaultQuery = "",
  onQueryChange,
  className,
  compactFooter = false,
}: NicheSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useRef(`niche-search-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  const results = useMemo(() => searchCgvNiches(query, 8), [query]);

  const navigate = useCallback(
    (niche: CgvNiche) => {
      setOpen(false);
      setQuery(niche.profession);
      router.push(
        directToGenerate ? getGenerateCgvUrl(niche.slug) : getCgvNichePath(niche.slug),
      );
    },
    [directToGenerate, router],
  );

  const updateQuery = (value: string) => {
    setQuery(value);
    onQueryChange?.(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = searchCgvNiches(query, 1)[0];
    if (match) {
      navigate(match);
      return;
    }
    if (onQueryChange) {
      onQueryChange(query.trim());
      return;
    }
    if (query.trim()) {
      router.push(`/modeles?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/modeles");
    }
  };

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={listId.current} className="mb-2 block text-sm font-medium">
          {label}
        </label>
      ) : null}
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id={listId.current}
            type="search"
            role="combobox"
            aria-expanded={open && results.length > 0}
            aria-controls={`${listId.current}-listbox`}
            aria-autocomplete="list"
            autoComplete="off"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              updateQuery(e.target.value);
              setOpen(true);
              setActiveIndex(0);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => window.setTimeout(() => setOpen(false), 150)}
            onKeyDown={(e) => {
              if (!open || results.length === 0) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && results[activeIndex]) {
                e.preventDefault();
                navigate(results[activeIndex]);
              }
            }}
            className="h-11 pl-9"
          />
          {open && query.trim() && results.length > 0 ? (
            <ul
              id={`${listId.current}-listbox`}
              role="listbox"
              className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-popover py-1 shadow-md"
            >
              {results.map((niche, index) => (
                <li key={niche.slug} role="option" aria-selected={index === activeIndex}>
                  <button
                    type="button"
                    className={`flex w-full flex-col px-3 py-2.5 text-left text-sm hover:bg-muted ${
                      index === activeIndex ? "bg-muted" : ""
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => navigate(niche)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-medium">{niche.profession}</span>
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium uppercase text-primary">
                        {CGV_NICHE_CLUSTERS[niche.cluster].shortLabel}
                      </span>
                    </span>
                    <span className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {niche.intro}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {open && query.trim() && results.length === 0 ? (
            <div className="absolute z-20 mt-1 w-full rounded-md border bg-popover px-3 py-2 text-sm text-muted-foreground shadow-md">
              Aucun métier trouvé —{" "}
              <Link href="/generate/cgv" className="text-primary underline">
                CGV génériques
              </Link>
            </div>
          ) : null}
        </div>
        {showSubmitButton ? (
          <Button type="submit" className="h-11 shrink-0 gap-2 sm:px-6">
            {submitLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        ) : null}
      </form>
      {!compactFooter ? (
        <p className="mt-2 text-xs text-muted-foreground">
          {cgvNiches.length} métiers couverts —{" "}
          <Link href="/modeles" className="text-primary hover:underline">
            voir tous les modèles
          </Link>
        </p>
      ) : null}
    </div>
  );
}

/** Pills métiers populaires — accueil & hub */
export function PopularNichePills({
  slugs,
  className,
}: {
  slugs: readonly string[];
  className?: string;
}) {
  const niches = useMemo(
    () =>
      slugs
        .map((slug) => cgvNiches.find((n) => n.slug === slug))
        .filter((n): n is CgvNiche => Boolean(n)),
    [slugs],
  );

  return (
    <div className={className}>
      <p className="text-xs font-medium text-muted-foreground">Populaires</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {niches.map((niche) => (
          <li key={niche.slug}>
            <Link
              href={getCgvNichePath(niche.slug)}
              className="inline-flex rounded-full border bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              {niche.profession}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Filtres cluster synchronisés avec l'URL */
export function ClusterPills({
  active,
  onChange,
}: {
  active: CgvNicheCluster | "all";
  onChange: (cluster: CgvNicheCluster | "all") => void;
}) {
  const clusters = Object.values(CGV_NICHE_CLUSTERS);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
          active === "all"
            ? "border-primary bg-primary text-primary-foreground"
            : "hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        Tous ({cgvNiches.length})
      </button>
      {clusters.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            active === c.id
              ? "border-primary bg-primary text-primary-foreground"
              : "hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          {c.shortLabel}
        </button>
      ))}
    </div>
  );
}

/** Sync hub state ↔ URL ?q= & ?categorie= */
export function useModelesHubParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const categorieParam = searchParams.get("categorie");
  const cluster: CgvNicheCluster | "all" =
    categorieParam &&
    Object.prototype.hasOwnProperty.call(CGV_NICHE_CLUSTERS, categorieParam)
      ? (categorieParam as CgvNicheCluster)
      : "all";

  const setParams = useCallback(
    (next: { q?: string; categorie?: CgvNicheCluster | "all" }) => {
      const params = new URLSearchParams();
      const q = next.q !== undefined ? next.q : query;
      const cat = next.categorie !== undefined ? next.categorie : cluster;

      if (q.trim()) params.set("q", q.trim());
      if (cat !== "all") params.set("categorie", cat);

      const qs = params.toString();
      router.replace(qs ? `/modeles?${qs}` : "/modeles", { scroll: false });
    },
    [cluster, query, router],
  );

  return { query, cluster, setParams };
}
