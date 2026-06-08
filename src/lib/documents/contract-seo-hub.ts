import { documents } from "@/lib/documents/registry";
import { seoLandingPages } from "@/lib/documents/seo-landings";

export const CONTRACT_HUB_PATH = "/modeles/contrats";

/** Slugs landing prioritaires pour le hub contrats (ordre = importance SEO) */
export const PRIORITY_CONTRACT_LANDING_SLUGS = [
  "contrat-freelance-norme",
  "contrat-freelance",
  "contrat-prestation-norme",
  "modele-contrat-freelance",
  "contrat-freelance-auto-entrepreneur",
  "contrat-consultant-independant",
  "contrat-prestation-b2b",
  "contrat-freelance-pdf",
  "nda-freelance",
  "cession-droits-auteur-freelance",
] as const;

const CONTRACT_DOCUMENT_SLUGS = new Set([
  "contrat-prestation",
  "accord-confidentialite",
  "cession-droits-auteur",
]);

export function getContractLandings() {
  const bySlug = new Map(seoLandingPages.map((p) => [p.slug, p]));
  const ordered = PRIORITY_CONTRACT_LANDING_SLUGS.map((slug) =>
    bySlug.get(slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const rest = seoLandingPages.filter(
    (p) =>
      CONTRACT_DOCUMENT_SLUGS.has(p.documentSlug) &&
      !PRIORITY_CONTRACT_LANDING_SLUGS.includes(
        p.slug as (typeof PRIORITY_CONTRACT_LANDING_SLUGS)[number],
      ),
  );

  return [...ordered, ...rest];
}

export function getContractDocumentGenerators() {
  return documents.filter((d) => CONTRACT_DOCUMENT_SLUGS.has(d.slug));
}

const PRIORITY_SLUG_SET = new Set<string>(PRIORITY_CONTRACT_LANDING_SLUGS);

/** Priorité sitemap : landings contrats ciblées au-dessus du reste */
export function getContractLandingSitemapPriority(slug: string): number {
  const index = PRIORITY_CONTRACT_LANDING_SLUGS.indexOf(
    slug as (typeof PRIORITY_CONTRACT_LANDING_SLUGS)[number],
  );
  if (index === 0) return 0.98;
  if (index > 0) return 0.96 - index * 0.005;
  if (PRIORITY_SLUG_SET.has(slug)) return 0.94;
  return 0.9;
}

export function isContractRelatedLanding(slug: string): boolean {
  const landing = seoLandingPages.find((p) => p.slug === slug);
  return landing ? CONTRACT_DOCUMENT_SLUGS.has(landing.documentSlug) : false;
}

export const CONTRACT_HUB_FAQS = [
  {
    question: "Qu'est-ce qu'un contrat freelance « aux normes » ?",
    answer:
      "C'est un contrat de prestation structuré en articles : identification des parties (SIRET, adresses), description de mission, prix, délais, TVA ou franchise art. 293 B, modalités de paiement, confidentialité, propriété intellectuelle et signatures. JuriVite intègre ces blocs pour un PDF professionnel adapté au droit français.",
  },
  {
    question: "Contrat freelance : est-il obligatoire ?",
    answer:
      "L'écrit n'est pas toujours imposé par la loi pour toute prestation, mais il est fortement recommandé dès qu'une mission dépasse quelques jours ou un montant significatif. Les clients B2B et les services achats l'exigent souvent avant démarrage.",
  },
  {
    question: "Puis-je envoyer le contrat au client pour signature en ligne ?",
    answer:
      "Oui : générez le PDF, puis utilisez le lien de signature JuriVite depuis votre tableau de bord pour faire signer le client à distance.",
  },
  {
    question: "Différence entre contrat freelance, devis et CGV ?",
    answer:
      "Le devis propose le prix et le périmètre ; le contrat formalise l'engagement pour une mission ; les CGV encadrent votre relation commerciale globale sur votre site. Les trois se complètent.",
  },
] as const;
