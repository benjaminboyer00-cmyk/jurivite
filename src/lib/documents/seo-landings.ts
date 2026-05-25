import { documentSlugs, type DocumentSlug } from "@/lib/documents/registry";

export type SeoFaq = { question: string; answer: string };

export type SeoLandingPage = {
  slug: string;
  documentSlug: DocumentSlug;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  seoKeywords: string[];
  seoBlocks: { heading: string; body: string }[];
  faqs: SeoFaq[];
};

/** Pages SEO programmatiques — mots-clés longue traîne */
export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "cgv-auto-entrepreneur",
    documentSlug: "cgv",
    metaTitle: "CGV auto-entrepreneur — modèle PDF gratuit en ligne",
    metaDescription:
      "Générez vos CGV auto-entrepreneur en 5 min : SIRET, délais, paiement, rétractation. PDF prêt pour votre site e-commerce ou prestations.",
    h1: "CGV auto-entrepreneur",
    intro:
      "Modèle de Conditions Générales de Vente adapté aux micro-entrepreneurs. Formulaire guidé, export PDF immédiat.",
    seoKeywords: [
      "cgv auto-entrepreneur",
      "cgv micro-entreprise",
      "modèle cgv auto entrepreneur pdf",
    ],
    seoBlocks: [
      {
        heading: "CGV obligatoires pour un auto-entrepreneur ?",
        body: "Dès que vous vendez en ligne ou à distance, vous devez informer le client sur le prix, les délais et le droit de rétractation. Les CGV protègent votre activité et professionnalisent votre image.",
      },
      {
        heading: "Différence CGV et mentions légales",
        body: "Les mentions légales identifient l'éditeur du site. Les CGV encadrent la relation commerciale (commande, paiement, livraison). Les deux sont complémentaires sur un site qui vend des prestations.",
      },
    ],
    faqs: [
      {
        question: "Un auto-entrepreneur doit-il avoir des CGV ?",
        answer:
          "Oui dès que vous vendez des prestations ou produits à des clients, notamment en B2C en ligne. Les CGV précisent les conditions de vente et limitent les litiges.",
      },
      {
        question: "Où publier ses CGV en micro-entreprise ?",
        answer:
          "Sur votre site web, accessibles avant la commande (lien footer ou étape panier). Vous pouvez aussi les joindre à vos devis.",
      },
    ],
  },
  {
    slug: "cgv-freelance",
    documentSlug: "cgv",
    metaTitle: "CGV freelance — générateur PDF pour indépendants",
    metaDescription:
      "Créez vos CGV freelance : clauses paiement, délais, responsabilité. PDF conforme pour consultants, développeurs, designers.",
    h1: "CGV pour freelances",
    intro:
      "Sécurisez vos missions récurrentes avec des CGV claires, générées à partir de votre activité réelle.",
    seoKeywords: ["cgv freelance", "cgv consultant", "conditions vente freelance"],
    seoBlocks: [
      {
        heading: "Pourquoi un freelance a besoin de CGV",
        body: "Sans CGV, chaque mission repose sur des échanges informels. En cas de retard de paiement ou de désaccord sur le périmètre, vous manquez de cadre contractuel. Les CGV fixent les règles avant la signature.",
      },
    ],
    faqs: [
      {
        question: "CGV ou contrat de prestation pour un freelance ?",
        answer:
          "Les deux sont utiles : le contrat pour une mission précise, les CGV pour encadrer l'ensemble de votre relation commerciale sur votre site.",
      },
    ],
  },
  {
    slug: "mentions-legales-site-web",
    documentSlug: "mentions-legales",
    metaTitle: "Mentions légales site web — générateur obligatoire LCEN",
    metaDescription:
      "Générez les mentions légales de votre site : éditeur, SIRET, hébergeur, directeur de publication. Conforme LCEN pour freelances et TPE.",
    h1: "Mentions légales pour site web",
    intro:
      "Obligation légale pour tout site professionnel. Page complète en quelques minutes.",
    seoKeywords: [
      "mentions légales site web",
      "mentions légales obligatoires",
      "générateur mentions légales",
    ],
    seoBlocks: [
      {
        heading: "Mentions légales : qui est concerné ?",
        body: "Toute personne physique ou morale qui édite un site web en France : freelance, agence, e-commerce, blog monétisé, portfolio professionnel.",
      },
    ],
    faqs: [
      {
        question: "Quelle amende sans mentions légales ?",
        answer:
          "Jusqu'à 75 000 € pour une personne physique et 375 000 € pour une personne morale en cas de manquement à la LCEN, sans compter l'atteinte à votre crédibilité.",
      },
    ],
  },
  {
    slug: "mentions-legales-blog",
    documentSlug: "mentions-legales",
    metaTitle: "Mentions légales blog et site personnel — modèle PDF",
    metaDescription:
      "Mentions légales pour blog, portfolio ou site vitrine : éditeur, contact, hébergeur. Générateur en ligne JuriVite.",
    h1: "Mentions légales blog",
    intro:
      "Même un blog ou un site personnel professionnel doit afficher des mentions légales complètes.",
    seoKeywords: ["mentions légales blog", "mentions légales portfolio"],
    seoBlocks: [
      {
        heading: "Blog personnel : mentions légales obligatoires ?",
        body: "Si le blog a une activité professionnelle (monétisation, prise de contact clients, portfolio), les mentions légales sont requises comme pour tout site éditorial professionnel.",
      },
    ],
    faqs: [
      {
        question: "Hébergeur à indiquer pour un blog WordPress ?",
        answer:
          "Indiquez le nom et l'adresse de votre hébergeur réel (OVH, o2switch, Cloudflare Pages, etc.), pas seulement WordPress.com si vous auto-hébergez.",
      },
    ],
  },
  {
    slug: "politique-confidentialite-rgpd",
    documentSlug: "politique-confidentialite",
    metaTitle: "Politique de confidentialité RGPD — modèle site web 2026",
    metaDescription:
      "Politique de confidentialité conforme RGPD : cookies, formulaires, analytics. PDF pour freelance, SaaS et TPE.",
    h1: "Politique de confidentialité RGPD",
    intro:
      "Document indispensable dès la collecte d'e-mails, cookies ou données analytics.",
    seoKeywords: [
      "politique confidentialité rgpd",
      "politique confidentialité site",
      "rgpd site web modèle",
    ],
    seoBlocks: [
      {
        heading: "RGPD et site vitrine : le minimum",
        body: "Formulaire de contact, Google Analytics, pixel publicitaire, newsletter : chaque traitement doit être décrit avec sa finalité et sa durée de conservation.",
      },
    ],
    faqs: [
      {
        question: "Politique de confidentialité obligatoire sans boutique ?",
        answer:
          "Oui dès que vous collectez des données personnelles, même un simple formulaire « Contactez-moi ».",
      },
    ],
  },
  {
    slug: "contrat-freelance",
    documentSlug: "contrat-prestation",
    metaTitle: "Contrat freelance PDF — prestation de services en ligne",
    metaDescription:
      "Modèle de contrat freelance : mission, prix, délais, paiement. Sécurisez vos prestations et limitez les impayés.",
    h1: "Contrat freelance",
    intro:
      "Formalisez chaque mission avant de démarrer. Contrat de prestation prêt à faire signer.",
    seoKeywords: [
      "contrat freelance",
      "contrat prestation freelance pdf",
      "modèle contrat indépendant",
    ],
    seoBlocks: [
      {
        heading: "Contrat freelance : les clauses qui comptent",
        body: "Périmètre de la mission, prix, échéancier de paiement, délais, propriété des livrables et résiliation. Un PDF signé vaut mieux qu'un accord oral.",
      },
    ],
    faqs: [
      {
        question: "Contrat freelance sans avocat : est-ce suffisant ?",
        answer:
          "Un modèle structuré couvre 80 % des cas standard. Pour des montants élevés ou secteurs réglementés, faites relire par un professionnel.",
      },
    ],
  },
  {
    slug: "devis-freelance",
    documentSlug: "devis",
    metaTitle: "Devis freelance conforme — modèle PDF gratuit",
    metaDescription:
      "Créez un devis freelance avec SIRET, TVA, validité et description de prestation. PDF professionnel en quelques clics.",
    h1: "Devis freelance",
    intro:
      "Un devis structuré accélère la signature et limite les négociations tardives.",
    seoKeywords: ["devis freelance", "modèle devis indépendant", "devis consultant pdf"],
    seoBlocks: [
      {
        heading: "Devis freelance : erreurs à éviter",
        body: "Oublier le numéro de devis, la durée de validité, le détail HT/TTC ou le SIRET nuit à votre crédibilité et ralentit la comptabilité de votre client.",
      },
    ],
    faqs: [
      {
        question: "Devis freelance : TVA ou franchise ?",
        answer:
          "Indiquez le bon régime : TVA au taux applicable ou mention de franchise en base selon votre statut (article 293 B du CGI).",
      },
    ],
  },
  {
    slug: "devis-auto-entrepreneur",
    documentSlug: "devis",
    metaTitle: "Devis auto-entrepreneur — générateur mentions obligatoires",
    metaDescription:
      "Devis auto-entrepreneur PDF : identité, prestation, montant HT/TTC, validité. Modèle conforme pour micro-entreprises.",
    h1: "Devis auto-entrepreneur",
    intro:
      "Générez des devis conformes adaptés aux micro-entrepreneurs et indépendants.",
    seoKeywords: ["devis auto-entrepreneur", "devis micro-entreprise pdf"],
    seoBlocks: [
      {
        heading: "Devis obligatoire pour auto-entrepreneur ?",
        body: "Le devis n'est pas toujours légalement obligatoire, mais fortement recommandé pour cadrer la mission et le prix avant facturation.",
      },
    ],
    faqs: [
      {
        question: "Quelles mentions sur un devis micro-entreprise ?",
        answer:
          "Identité complète, SIRET, description de la prestation, prix HT, TVA ou franchise, durée de validité, date et numéro de devis.",
      },
    ],
  },
];

export const seoLandingSlugs = seoLandingPages.map((p) => p.slug);

export function getSeoLanding(slug: string): SeoLandingPage | undefined {
  return seoLandingPages.find((p) => p.slug === slug);
}

export function isSeoLandingSlug(slug: string): boolean {
  return seoLandingSlugs.includes(slug);
}

export function getAllGenerateSlugs(): string[] {
  return [...documentSlugs, ...seoLandingSlugs];
}
