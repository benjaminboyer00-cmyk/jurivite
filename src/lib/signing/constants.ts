import type { DocumentSlug } from "@/lib/documents/registry";

/** Documents envoyables au client pour signature électronique simple */
export const SIGNABLE_DOCUMENT_SLUGS: DocumentSlug[] = [
  "contrat-prestation",
  "devis",
  "accord-confidentialite",
  "cession-droits-auteur",
  "convention-stage",
];

export const SIGNING_LINK_TTL_DAYS = 30;

export function isSignableDocumentSlug(slug: string): slug is DocumentSlug {
  return (SIGNABLE_DOCUMENT_SLUGS as string[]).includes(slug);
}
