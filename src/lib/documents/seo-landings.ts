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
      {
        heading: "Clauses essentielles pour consultants et créatifs",
        body: "Délais de livraison, modalités de paiement (acompte, solde), propriété intellectuelle des livrables, limitation de responsabilité et droit de rétractation B2C si vous vendez en ligne. JuriVite structure ces points en articles lisibles.",
      },
      {
        heading: "CGV + contrat de prestation : le duo gagnant",
        body: "Les CGV encadrent votre relation commerciale globale ; le contrat de prestation précise une mission (périmètre, prix, planning). Publiez les CGV sur votre site et joignez un contrat signé pour chaque projet important.",
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
      {
        heading: "Contenu obligatoire LCEN",
        body: "Identité de l'éditeur (nom, adresse, SIRET), directeur de publication, coordonnées, hébergeur (nom et adresse). JuriVite génère une page complète à publier dans le footer.",
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
  {
    slug: "facture-freelance",
    documentSlug: "facture",
    metaTitle: "Facture freelance conforme — modèle PDF avec SIRET et TVA",
    metaDescription:
      "Générez une facture freelance : numéro, SIRET, HT/TTC, échéance, pénalités de retard. PDF professionnel pour consultants et indépendants.",
    h1: "Facture freelance",
    intro:
      "Facturez vos missions avec toutes les mentions obligatoires. Export PDF immédiat après validation du formulaire.",
    seoKeywords: ["facture freelance", "modèle facture indépendant", "facture consultant pdf"],
    seoBlocks: [
      {
        heading: "Mentions obligatoires sur une facture freelance",
        body: "Identité complète, SIRET, numéro de facture unique, date, description de la prestation, montants HT et TTC, TVA ou mention art. 293 B, conditions de paiement et pénalités de retard.",
      },
      {
        heading: "Facture après devis : garder la cohérence",
        body: "Reprenez les mêmes montants et la même description que sur le devis accepté. JuriVite propose aussi un générateur de devis pour enchaîner devis → facture sans erreur.",
      },
    ],
    faqs: [
      {
        question: "Numérotation des factures freelance : règles ?",
        answer:
          "Chronologique et sans rupture (ex. 2026-001, 2026-002). Conservez une trace de chaque facture émise pour la comptabilité et en cas de contrôle.",
      },
    ],
  },
  {
    slug: "facture-auto-entrepreneur",
    documentSlug: "facture",
    metaTitle: "Facture auto-entrepreneur — générateur mentions obligatoires",
    metaDescription:
      "Facture micro-entreprise PDF : franchise TVA art. 293 B, SIRET, prestation, échéance. Modèle conforme pour auto-entrepreneurs.",
    h1: "Facture auto-entrepreneur",
    intro:
      "Modèle adapté aux micro-entrepreneurs : franchise en base, coordonnées et bloc légal préremplis selon votre statut.",
    seoKeywords: ["facture auto-entrepreneur", "facture micro-entreprise", "facture ae pdf"],
    seoBlocks: [
      {
        heading: "Facture auto-entrepreneur et franchise TVA",
        body: "Si vous êtes en franchise de base, la mention « TVA non applicable, art. 293 B du CGI » doit figurer clairement. Indiquez le montant TTC équivalent au HT.",
      },
    ],
    faqs: [
      {
        question: "Une facture AE peut-elle être envoyée sans logiciel comptable ?",
        answer:
          "Oui, un PDF conforme suffit pour de nombreux clients. Archivez chaque facture et déclarez le CA sur le site URSSAF dans les délais.",
      },
    ],
  },
  {
    slug: "cession-droits-auteur-freelance",
    documentSlug: "cession-droits-auteur",
    metaTitle: "Cession de droits d'auteur freelance — contrat PDF créatif",
    metaDescription:
      "Contrat de cession droits d'auteur : œuvre, territoire, durée, rémunération. Pour designers, photographes, développeurs et agences.",
    h1: "Cession de droits d'auteur freelance",
    intro:
      "Sécurisez la transmission de vos créations (logo, code, photo, vidéo) avec un contrat structuré prêt à signer.",
    seoKeywords: [
      "cession droits auteur freelance",
      "contrat cession création",
      "cession droits designer",
    ],
    seoBlocks: [
      {
        heading: "Pourquoi céder les droits par écrit",
        body: "Sans contrat, le client n'acquiert pas forcément tous les droits d'exploitation. La cession précise l'œuvre, les droits cédés (reproduction, représentation), le territoire et la rémunération.",
      },
      {
        heading: "Droits moraux et garanties",
        body: "L'auteur conserve des droits moraux (paternité, respect de l'œuvre). Le contrat peut prévoir des garanties d'originalité et de non-contrefaçon — clauses incluses dans le modèle JuriVite.",
      },
    ],
    faqs: [
      {
        question: "Cession totale ou licence d'utilisation ?",
        answer:
          "La cession transfère les droits patrimoniaux définis au contrat. Une simple licence laisse l'auteur propriétaire avec des droits d'usage limités — adaptez selon votre négociation.",
      },
    ],
  },
  {
    slug: "cgu-saas",
    documentSlug: "conditions-utilisation",
    metaTitle: "CGU SaaS — conditions générales d'utilisation application",
    metaDescription:
      "Générez des CGU pour SaaS, API ou application web : usage, PI, responsabilité, données. PDF pour startups et éditeurs logiciels.",
    h1: "CGU SaaS et application web",
    intro:
      "Encadrez l'usage de votre service en ligne : comptes, contenus utilisateurs, limitation de responsabilité et propriété intellectuelle.",
    seoKeywords: ["cgu saas", "conditions utilisation application", "cgu logiciel"],
    seoBlocks: [
      {
        heading: "CGU vs politique de confidentialité pour un SaaS",
        body: "Les CGU définissent les règles d'usage du service. La politique RGPD décrit les traitements de données personnelles. Les deux documents se complètent et doivent être accessibles depuis le footer.",
      },
    ],
    faqs: [
      {
        question: "CGU obligatoires pour une app gratuite ?",
        answer:
          "Dès qu'un utilisateur crée un compte ou accepte des conditions, des CGU claires limitent votre responsabilité et précisent les droits sur le contenu.",
      },
    ],
  },
  {
    slug: "nda-freelance",
    documentSlug: "accord-confidentialite",
    metaTitle: "NDA freelance — accord de confidentialité PDF",
    metaDescription:
      "Modèle NDA (accord de confidentialité) pour freelances et startups : périmètre, durée, exceptions. PDF prêt à signer.",
    h1: "NDA freelance",
    intro:
      "Protégez les informations échangées avant une mission ou un partenariat avec un accord de confidentialité bilatéral.",
    seoKeywords: ["nda freelance", "accord confidentialité modèle", "nda français pdf"],
    seoBlocks: [
      {
        heading: "Quand signer un NDA en freelance",
        body: "Avant d'accéder aux données stratégiques d'un client, lors d'un audit, d'une due diligence ou d'une mission en avant-projet. Le NDA encadre ce qui est confidentiel et la durée des obligations.",
      },
    ],
    faqs: [
      {
        question: "NDA unilatéral ou bilatéral ?",
        answer:
          "Le modèle JuriVite est bilatéral (les deux parties s'engagent). Pour une disclosure sens unique, adaptez les parties au formulaire.",
      },
    ],
  },
  {
    slug: "convention-stage-entreprise",
    documentSlug: "convention-stage",
    metaTitle: "Convention de stage entreprise — modèle PDF 2026",
    metaDescription:
      "Convention de stage : organisme d'accueil, stagiaire, école, mission, tuteur, gratification. PDF pour TPE et PME.",
    h1: "Convention de stage en entreprise",
    intro:
      "Formalisez l'accueil d'un stagiaire avec les trois parties (entreprise, établissement, stagiaire) et les clauses obligatoires.",
    seoKeywords: [
      "convention de stage entreprise",
      "modèle convention stage pdf",
      "convention stage pme",
    ],
    seoBlocks: [
      {
        heading: "Trois parties signataires",
        body: "L'organisme d'accueil, l'établissement d'enseignement et le stagiaire. La convention décrit la mission, la durée, le tuteur, la gratification éventuelle et l'assurance.",
      },
    ],
    faqs: [
      {
        question: "Gratification de stage obligatoire ?",
        answer:
          "Au-delà de 2 mois consécutifs ou non, une gratification minimale est due (montant légal à jour). Le générateur intègre le bloc dédié.",
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
