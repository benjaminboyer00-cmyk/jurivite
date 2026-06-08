export type DocumentSlug =
  | "cgv"
  | "mentions-legales"
  | "politique-confidentialite"
  | "contrat-prestation"
  | "devis"
  | "facture"
  | "cession-droits-auteur"
  | "conditions-utilisation"
  | "accord-confidentialite"
  | "convention-stage";

export type DocumentDefinition = {
  slug: DocumentSlug;
  title: string;
  shortTitle: string;
  shortDescription: string;
  href: string;
  seoKeywords: string[];
  estimatedMinutes: number;
  priority: number;
  category: "commercial" | "site" | "contrats" | "rh";
};

/** 10 documents juridiques prioritaires — catalogue complet JuriVite */
export const documents: DocumentDefinition[] = [
  {
    slug: "cgv",
    title: "Conditions Générales de Vente",
    shortTitle: "CGV",
    shortDescription:
      "CGV structurées en articles, adaptées micro-entreprise ou société (TVA, capital, rétractation).",
    href: "/generate/cgv",
    seoKeywords: ["cgv freelance", "cgv auto-entrepreneur", "modèle cgv"],
    estimatedMinutes: 5,
    priority: 1,
    category: "commercial",
  },
  {
    slug: "mentions-legales",
    title: "Mentions Légales",
    shortTitle: "Mentions légales",
    shortDescription:
      "Page LCEN complète : éditeur, directeur de publication, hébergeur, RGPD.",
    href: "/generate/mentions-legales",
    seoKeywords: ["mentions légales site", "générateur mentions légales"],
    estimatedMinutes: 4,
    priority: 2,
    category: "site",
  },
  {
    slug: "politique-confidentialite",
    title: "Politique de Confidentialité (RGPD)",
    shortTitle: "Politique RGPD",
    shortDescription:
      "Politique RGPD en articles : finalités, durées, droits, cookies, sous-traitants.",
    href: "/generate/politique-confidentialite",
    seoKeywords: ["politique confidentialité rgpd", "rgpd freelance"],
    estimatedMinutes: 6,
    priority: 3,
    category: "site",
  },
  {
    slug: "contrat-prestation",
    title: "Contrat de Prestation de Services",
    shortTitle: "Contrat prestation",
    shortDescription:
      "Contrat premium : soussignés, 11 articles, TVA art. 293 B, PI, confidentialité, signatures.",
    href: "/generate/contrat-prestation",
    seoKeywords: [
      "contrat prestation freelance",
      "modèle contrat prestation",
      "contrat freelance norme",
      "contrat de prestation norme",
      "contrat freelance pdf",
    ],
    estimatedMinutes: 7,
    priority: 4,
    category: "contrats",
  },
  {
    slug: "devis",
    title: "Devis Conforme",
    shortTitle: "Devis",
    shortDescription:
      "Devis professionnel HT/TVA/TTC avec mentions légales et bloc « Bon pour accord ».",
    href: "/generate/devis",
    seoKeywords: ["devis freelance", "modèle devis conforme"],
    estimatedMinutes: 5,
    priority: 5,
    category: "commercial",
  },
  {
    slug: "facture",
    title: "Facture Conforme",
    shortTitle: "Facture",
    shortDescription:
      "Facture avec SIRET, TVA ou art. 293 B, échéance et pénalités de retard.",
    href: "/generate/facture",
    seoKeywords: ["facture auto-entrepreneur", "modèle facture freelance"],
    estimatedMinutes: 5,
    priority: 6,
    category: "commercial",
  },
  {
    slug: "cession-droits-auteur",
    title: "Contrat de Cession de Droits d'Auteur",
    shortTitle: "Cession droits",
    shortDescription:
      "Cession reproduction/représentation : œuvre, territoire, durée, garanties, droits moraux.",
    href: "/generate/cession-droits-auteur",
    seoKeywords: ["cession droits auteur", "contrat cession création"],
    estimatedMinutes: 8,
    priority: 7,
    category: "contrats",
  },
  {
    slug: "conditions-utilisation",
    title: "Conditions Générales d'Utilisation",
    shortTitle: "CGU",
    shortDescription:
      "CGU SaaS / application : usage licite, PI, responsabilité limitée, données.",
    href: "/generate/conditions-utilisation",
    seoKeywords: ["cgu saas", "conditions utilisation application"],
    estimatedMinutes: 6,
    priority: 8,
    category: "site",
  },
  {
    slug: "accord-confidentialite",
    title: "Accord de Confidentialité (NDA)",
    shortTitle: "NDA",
    shortDescription:
      "NDA bilatéral : définition, obligations, exceptions, durée et survie des clauses.",
    href: "/generate/accord-confidentialite",
    seoKeywords: ["nda français", "accord confidentialité modèle"],
    estimatedMinutes: 6,
    priority: 9,
    category: "contrats",
  },
  {
    slug: "convention-stage",
    title: "Convention de Stage",
    shortTitle: "Convention stage",
    shortDescription:
      "Convention organisme / stagiaire / école : mission, tuteur, gratification, assurance.",
    href: "/generate/convention-stage",
    seoKeywords: ["convention de stage", "modèle convention stage"],
    estimatedMinutes: 7,
    priority: 10,
    category: "rh",
  },
];

export const documentSlugs = documents.map((d) => d.slug);

export function getDocumentBySlug(slug: string): DocumentDefinition | undefined {
  return documents.find((doc) => doc.slug === slug);
}

export function isDocumentSlug(slug: string): slug is DocumentSlug {
  return documentSlugs.includes(slug as DocumentSlug);
}
