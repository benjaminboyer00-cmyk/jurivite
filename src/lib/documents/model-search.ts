import {
  documents,
  type DocumentDefinition,
} from "@/lib/documents/registry";
import {
  searchCgvNiches,
  type CgvNiche,
} from "@/lib/documents/niches-seo";
import { seoLandingPages } from "@/lib/documents/seo-landings";

export type CatalogModelHit = {
  id: string;
  title: string;
  description: string;
  href: string;
  badge: string;
};

export type UnifiedSearchResult =
  | { type: "catalog"; item: CatalogModelHit }
  | { type: "niche"; niche: CgvNiche };

const CATEGORY_BADGES: Record<DocumentDefinition["category"], string> = {
  commercial: "Commercial",
  site: "Site web",
  contrats: "Contrat",
  rh: "RH",
};

/** Documents mis en avant sur /modeles */
export const FEATURED_DOCUMENT_SLUGS = [
  "contrat-prestation",
  "devis",
  "facture",
  "accord-confidentialite",
  "cgv",
] as const;

function scoreTextMatch(terms: string[], q: string): number {
  let score = 0;
  const normalized = terms.map((t) => t.toLowerCase());

  for (const term of normalized) {
    if (term === q) score += 20;
    else if (term.startsWith(q)) score += 12;
    else if (q.length >= 3 && term.includes(q)) score += 5;
  }

  const queryWords = q.split(/\s+/).filter((w) => w.length >= 2);
  for (const word of queryWords) {
    if (normalized.some((t) => t === word || (word.length >= 3 && t.includes(word)))) {
      score += 4;
    }
  }

  if (
    queryWords.length > 1 &&
    queryWords.every((word) =>
      normalized.some((t) => t.includes(word) || t.replace(/-/g, " ").includes(word)),
    )
  ) {
    score += 8;
  }

  return score;
}

export function searchCatalogModels(query: string, limit = 8): CatalogModelHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: { hit: CatalogModelHit; score: number }[] = [];

  for (const doc of documents) {
    const terms = [
      doc.title,
      doc.shortTitle,
      doc.shortDescription,
      doc.slug,
      doc.slug.replace(/-/g, " "),
      ...doc.seoKeywords,
    ];
    const score = scoreTextMatch(terms, q);
    if (score > 0) {
      hits.push({
        score,
        hit: {
          id: `doc-${doc.slug}`,
          title: doc.title,
          description: doc.shortDescription,
          href: doc.href,
          badge: CATEGORY_BADGES[doc.category],
        },
      });
    }
  }

  for (const landing of seoLandingPages) {
    const terms = [
      landing.h1,
      landing.intro,
      landing.slug,
      landing.slug.replace(/-/g, " "),
      ...landing.seoKeywords,
    ];
    const score = scoreTextMatch(terms, q);
    if (score > 0) {
      hits.push({
        score,
        hit: {
          id: `landing-${landing.slug}`,
          title: landing.h1,
          description: landing.intro,
          href: `/generate/${landing.slug}`,
          badge: "Modèle",
        },
      });
    }
  }

  return hits
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ hit }) => hit);
}

export function searchAllModels(query: string, limit = 8): UnifiedSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const catalog = searchCatalogModels(q, limit);
  const niches = searchCgvNiches(q, limit);

  const merged: UnifiedSearchResult[] = [
    ...catalog.map((item) => ({ type: "catalog" as const, item })),
    ...niches.map((niche) => ({ type: "niche" as const, niche })),
  ];

  return merged.slice(0, limit);
}

export function getFeaturedDocuments(): DocumentDefinition[] {
  return FEATURED_DOCUMENT_SLUGS.map((slug) =>
    documents.find((d) => d.slug === slug),
  ).filter((d): d is DocumentDefinition => Boolean(d));
}
