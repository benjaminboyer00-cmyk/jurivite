import type { DocumentSlug } from "@/lib/documents/registry";

export type DocumentPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  seoBlocks: { heading: string; body: string }[];
};

export const documentPageContent: Record<DocumentSlug, DocumentPageContent> = {
  cgv: {
    metaTitle: "Générateur de CGV pour freelance et auto-entrepreneur",
    metaDescription:
      "Créez vos Conditions Générales de Vente en ligne en 5 minutes. Modèle PDF pour freelances, auto-entrepreneurs et micro-entreprises. Conforme et personnalisable.",
    h1: "Générateur de CGV",
    intro:
      "Générez vos CGV en PDF en 3 étapes. Téléchargement immédiat via Puppeteer — gratuit avec filigrane, Pro sans filigrane.",
    seoBlocks: [
      {
        heading: "Pourquoi des CGV sont obligatoires pour un freelance ?",
        body: "Dès que vous vendez des prestations ou des produits, le Code de la consommation impose d'informer le client avant la commande : prix, délais, droit de rétractation, médiation, responsabilité. Sans CGV, vous vous exposez à des litiges coûteux et à une image amateur. Les CGV sont votre bouclier juridique.",
      },
      {
        heading: "CGV auto-entrepreneur : les clauses que JuriVite intègre",
        body: "Notre formulaire collecte votre identité (SIRET, adresse), votre activité, vos délais d'exécution, vos modalités de paiement et le délai de rétractation. Le PDF généré structure ces informations en articles lisibles, prêts à publier sur votre site ou à envoyer avec vos devis.",
      },
      {
        heading: "Quels risques sans CGV sur votre site ?",
        body: "Un client mécontent peut contester les conditions appliquées. En cas de contrôle ou de litige, l'absence de CGV claires joue contre vous. Pour une activité B2C, le non-respect des informations précontractuelles peut entraîner des sanctions. Mieux vaut un modèle solide, même simple.",
      },
      {
        heading: "Modèle CGV : point de départ, pas un avis juridique",
        body: "JuriVite accélère la rédaction pour les indépendants. Si vous exercez une activité réglementée (santé, finance, formation certifiante), faites relire vos CGV par un avocat ou un expert-comptable. Le coût d'une relecture est inférieur à celui d'un litige.",
      },
    ],
  },
  "mentions-legales": {
    metaTitle: "Générateur de mentions légales pour site web",
    metaDescription:
      "Créez vos mentions légales obligatoires en PDF : éditeur, SIRET, hébergeur, directeur de publication. Gratuit pour freelances et TPE.",
    h1: "Générateur de mentions légales",
    intro:
      "Obligatoires pour tout site professionnel en France. Générez et téléchargez votre page en quelques minutes.",
    seoBlocks: [
      {
        heading: "Mentions légales : une obligation LCEN souvent ignorée",
        body: "La loi pour la confiance dans l'économie numérique (LCEN) impose d'identifier l'éditeur du site, le directeur de publication et l'hébergeur. Que vous soyez freelance, agence ou e-commerce, si vous avez un site, vous devez afficher ces informations de manière accessible.",
      },
      {
        heading: "Sanctions et risques en cas d'absence",
        body: "L'absence de mentions légales peut entraîner des amendes administratives (jusqu'à plusieurs milliers d'euros pour une personne morale). Au-delà de l'amende, cela nuit à votre crédibilité : un prospect sérieux vérifie souvent le pied de page avant de vous contacter.",
      },
      {
        heading: "Ce que contient le document JuriVite",
        body: "Éditeur (raison sociale, forme juridique, SIRET, adresse, contact), directeur de publication, hébergeur (nom et adresse — OVH, o2switch, Vercel, etc.). Copiez le contenu dans une page /mentions-legales liée depuis votre footer.",
      },
      {
        heading: "Où publier vos mentions légales ?",
        body: "Un lien visible sur toutes les pages, en général dans le pied de page. Évitez de les cacher derrière trop de clics. Pour un site one-page, une ancre #mentions-legales suffit si le contenu est complet.",
      },
    ],
  },
  "politique-confidentialite": {
    metaTitle: "Politique de confidentialité RGPD — générateur en ligne",
    metaDescription:
      "Générez une politique de confidentialité conforme RGPD : données collectées, finalités, durée, droits. PDF pour site freelance ou TPE.",
    h1: "Politique de confidentialité (RGPD)",
    intro:
      "Indispensable dès que vous collectez des e-mails, des cookies analytics ou des données via un formulaire de contact.",
    seoBlocks: [
      {
        heading: "RGPD : pourquoi une politique de confidentialité est obligatoire",
        body: "Le Règlement général sur la protection des données (RGPD) impose une information claire et accessible sur tout traitement de données personnelles. Formulaire de contact, newsletter, cookies publicitaires, CRM : chaque outil collecte des données qu'il faut documenter.",
      },
      {
        heading: "Amendes CNIL : ce qui est en jeu",
        body: "La CNIL peut sanctionner jusqu'à 4 % du chiffre d'affaires mondial ou 20 M€ (le montant le plus élevé). Pour un freelance, l'enjeu principal reste la confiance client et la conformité avant un audit investisseur ou un partenariat B2B.",
      },
      {
        heading: "Cookies, analytics et formulaires : soyez précis",
        body: "Listez dans le formulaire les données réellement collectées (Google Analytics, Meta Pixel, Typeform, Calendly…). Un document générique copié-collé sans rapport avec votre stack est pire qu'utile : il crée une fausse sécurité.",
      },
      {
        heading: "Droits des personnes à mentionner",
        body: "Accès, rectification, effacement, limitation, opposition, portabilité, réclamation CNIL. JuriVite intègre ces mentions et un contact DPO ou responsable de traitement selon vos informations.",
      },
    ],
  },
  "contrat-prestation": {
    metaTitle: "Contrat de prestation de services freelance — modèle PDF",
    metaDescription:
      "Générez un contrat de prestation entre freelance et client : mission, prix, délais, paiement. Sécurisez vos missions et limitez les impayés.",
    h1: "Contrat de prestation de services",
    intro:
      "Formalisez votre relation client avant de démarrer. Un contrat écrit clarifie le périmètre et accélère le paiement.",
    seoBlocks: [
      {
        heading: "Pourquoi un contrat avant la première mission ?",
        body: "Sans écrit, les désaccords sur le périmètre, les allers-retours non facturés ou les délais explosent. Un contrat de prestation fixe le prix, les livrables, les modalités de paiement et la date de livraison. C'est votre meilleure protection contre l'impayé.",
      },
      {
        heading: "Contrat freelance vs devis : complémentaires",
        body: "Le devis propose un prix ; le contrat engage les deux parties sur les conditions. Envoyez le devis pour la négociation, puis le contrat signé avant de commencer. JuriVite vous permet de générer les deux documents avec les mêmes informations entreprise.",
      },
      {
        heading: "Clauses essentielles incluses",
        body: "Identification des parties, description de la prestation, prix, paiement, livraison. Pour des missions créatives, ajoutez une clause de cession de droits d'auteur (document à venir dans JuriVite).",
      },
      {
        heading: "Risques d'un oral ou d'un simple mail",
        body: "« On verra au fil de l'eau » ouvre la porte aux scope creep et aux litiges. Un PDF signé (ou un e-mail d'acceptation explicite du contrat) crée une preuve en cas de contentieux.",
      },
    ],
  },
  devis: {
    metaTitle: "Devis conforme freelance — générateur gratuit",
    metaDescription:
      "Créez un devis professionnel PDF avec mentions obligatoires : SIRET, prestation, montants HT/TTC, validité. Pour auto-entrepreneur et TPE.",
    h1: "Devis conforme",
    intro:
      "Un devis clair rassure le client et accélère la signature. Mentions légales et calcul TVA automatique.",
    seoBlocks: [
      {
        heading: "Devis vs facture : ne pas confondre",
        body: "Le devis est une proposition commerciale avant la prestation. La facture constate la vente réalisée. Un devis accepté peut servir de base contractuelle, mais seule la facture compte pour la comptabilité et la TVA.",
      },
      {
        heading: "Mentions obligatoires sur un devis",
        body: "Numéro et date du devis, durée de validité, identification complète du prestataire (SIRET inclus) et du client, description détaillée de la prestation, montant HT, taux de TVA applicable, montant TTC.",
      },
      {
        heading: "Risques d'un mauvais devis",
        body: "Oublier le SIRET, la TVA ou la validité crée des frictions à la comptabilité client. Un devis imprécis sur le périmètre entraîne des négociations tardives. Un document propre envoie le signal que vous êtes structuré.",
      },
      {
        heading: "Franchise en base de TVA",
        body: "Si vous êtes en franchise (article 293 B du CGI), indiquez-le et mettez le taux TVA à 0 % dans le formulaire. Le TTC sera alors égal au HT. Vérifiez votre statut avec votre expert-comptable.",
      },
    ],
  },
};
