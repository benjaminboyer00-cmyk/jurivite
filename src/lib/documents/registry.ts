export type DocumentSlug =
  | "cgv"
  | "mentions-legales"
  | "politique-confidentialite"
  | "contrat-prestation"
  | "devis";

export type DocumentDefinition = {
  slug: DocumentSlug;
  title: string;
  shortTitle: string;
  shortDescription: string;
  href: string;
  seoKeywords: string[];
  estimatedMinutes: number;
  priority: number;
};

/** Top 5 documents par ROI (peur de l'amende + volume de recherche) */
export const documents: DocumentDefinition[] = [
  {
    slug: "cgv",
    title: "Conditions Générales de Vente",
    shortTitle: "CGV",
    shortDescription:
      "CGV adaptées aux freelances et micro-entreprises, prêtes à publier sur votre site.",
    href: "/generate/cgv",
    seoKeywords: [
      "cgv freelance",
      "cgv auto-entrepreneur",
      "modèle cgv",
      "conditions générales de vente",
    ],
    estimatedMinutes: 5,
    priority: 1,
  },
  {
    slug: "mentions-legales",
    title: "Mentions Légales",
    shortTitle: "Mentions légales",
    shortDescription:
      "Page obligatoire pour tout site web : éditeur, hébergeur, contact.",
    href: "/generate/mentions-legales",
    seoKeywords: [
      "mentions légales site",
      "mentions légales freelance",
      "générateur mentions légales",
    ],
    estimatedMinutes: 4,
    priority: 2,
  },
  {
    slug: "politique-confidentialite",
    title: "Politique de Confidentialité (RGPD)",
    shortTitle: "Politique RGPD",
    shortDescription:
      "Politique de confidentialité conforme RGPD pour collecter des données en ligne.",
    href: "/generate/politique-confidentialite",
    seoKeywords: [
      "politique confidentialité rgpd",
      "politique de confidentialité site",
      "rgpd freelance",
    ],
    estimatedMinutes: 6,
    priority: 3,
  },
  {
    slug: "contrat-prestation",
    title: "Contrat de Prestation de Services",
    shortTitle: "Contrat prestation",
    shortDescription:
      "Contrat freelance pour sécuriser mission, livrables et paiement.",
    href: "/generate/contrat-prestation",
    seoKeywords: [
      "contrat prestation freelance",
      "contrat prestation services",
      "modèle contrat freelance",
    ],
    estimatedMinutes: 7,
    priority: 4,
  },
  {
    slug: "devis",
    title: "Devis Conforme",
    shortTitle: "Devis",
    shortDescription:
      "Devis professionnel avec mentions obligatoires pour freelances et TPE.",
    href: "/generate/devis",
    seoKeywords: [
      "devis freelance",
      "modèle devis conforme",
      "devis auto-entrepreneur",
    ],
    estimatedMinutes: 5,
    priority: 5,
  },
];

export const documentSlugs = documents.map((d) => d.slug);

export function getDocumentBySlug(slug: string): DocumentDefinition | undefined {
  return documents.find((doc) => doc.slug === slug);
}

export function isDocumentSlug(slug: string): slug is DocumentSlug {
  return documentSlugs.includes(slug as DocumentSlug);
}
