import type { DocumentSlug } from "@/lib/documents/registry";
import { documents } from "@/lib/documents/registry";
import { seoLandingPages } from "@/lib/documents/seo-landings";

type RelatedLink = { href: string; title: string };

/** Maillage interne SEO — documents complémentaires par type */
const relatedByDocument: Record<DocumentSlug, DocumentSlug[]> = {
  cgv: ["mentions-legales", "politique-confidentialite", "devis", "contrat-prestation"],
  "mentions-legales": ["politique-confidentialite", "cgv", "conditions-utilisation"],
  "politique-confidentialite": ["mentions-legales", "cgv", "conditions-utilisation"],
  "contrat-prestation": ["cgv", "devis", "facture", "accord-confidentialite"],
  devis: ["facture", "cgv", "contrat-prestation"],
  facture: ["devis", "cgv", "contrat-prestation"],
  "cession-droits-auteur": ["contrat-prestation", "accord-confidentialite", "cgv"],
  "conditions-utilisation": [
    "politique-confidentialite",
    "mentions-legales",
    "cgv",
  ],
  "accord-confidentialite": ["contrat-prestation", "cession-droits-auteur", "cgv"],
  "convention-stage": ["contrat-prestation", "mentions-legales"],
};

function docLink(slug: DocumentSlug): RelatedLink {
  const doc = documents.find((d) => d.slug === slug)!;
  return { href: doc.href, title: doc.title };
}

export function getRelatedDocuments(
  documentSlug: DocumentSlug,
  currentPath: string,
): RelatedLink[] {
  const core = relatedByDocument[documentSlug].map(docLink);

  const landings = seoLandingPages
    .filter((l) => l.documentSlug === documentSlug)
    .slice(0, 3)
    .map((l) => ({
      href: `/generate/${l.slug}`,
      title: l.h1,
    }));

  const seen = new Set<string>();
  return [...core, ...landings, { href: "/tarifs", title: "Tarifs JuriVite" }].filter(
    (link) => {
      if (link.href === currentPath || seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    },
  );
}
