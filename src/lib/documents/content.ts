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
      "Créez vos Conditions Générales de Vente en ligne : formulaire guidé, modèle adapté aux freelances et micro-entreprises, export PDF.",
    h1: "Générateur de CGV",
    intro:
      "Remplissez le formulaire en 3 étapes. Votre PDF sera généré à partir d'un modèle HTML structuré.",
    seoBlocks: [
      {
        heading: "Pourquoi des CGV sont obligatoires ?",
        body: "Dès que vous vendez des prestations ou produits en ligne, vos clients doivent connaître les règles applicables : prix, délais, droit de rétractation, responsabilités. Les CGV encadrent cette relation et limitent les litiges.",
      },
      {
        heading: "CGV freelance : ce que le formulaire couvre",
        body: "JuriVite collecte votre identité légale (SIRET, adresse), votre activité, vos délais d'exécution et vos modalités de paiement. Le document est prêt à publier sur votre site ou à joindre à vos devis.",
      },
      {
        heading: "Modèle à personnaliser",
        body: "Nos modèles sont des points de départ pour les indépendants. Pour une activité réglementée, faites relire le document par un professionnel du droit.",
      },
    ],
  },
  "mentions-legales": {
    metaTitle: "Générateur de mentions légales pour site web",
    metaDescription:
      "Créez vos mentions légales obligatoires : éditeur, SIRET, hébergeur. Formulaire guidé pour freelances et TPE.",
    h1: "Générateur de mentions légales",
    intro:
      "Obligatoires pour tout site professionnel en France. Générez une page complète en quelques minutes.",
    seoBlocks: [
      {
        heading: "Mentions légales : une obligation souvent oubliée",
        body: "Tout site web doit afficher l'identité de l'éditeur, les coordonnées, le SIRET et les informations sur l'hébergeur. L'absence de mentions légales expose à des sanctions administratives.",
      },
      {
        heading: "Ce que contient votre document",
        body: "Le formulaire collecte vos informations d'entreprise, l'URL de votre site, le nom du directeur de publication et les coordonnées de votre hébergeur (OVH, Vercel, etc.).",
      },
      {
        heading: "Où publier vos mentions légales ?",
        body: "Ajoutez un lien visible dans le pied de page de votre site, accessible en un clic depuis toutes les pages.",
      },
    ],
  },
  "politique-confidentialite": {
    metaTitle: "Politique de confidentialité RGPD — générateur en ligne",
    metaDescription:
      "Générez une politique de confidentialité conforme RGPD : données collectées, finalités, durée de conservation, droits des utilisateurs.",
    h1: "Politique de confidentialité (RGPD)",
    intro:
      "Indispensable dès que vous collectez des e-mails, cookies analytics ou données de contact.",
    seoBlocks: [
      {
        heading: "RGPD : pourquoi une politique de confidentialité ?",
        body: "Le RGPD impose d'informer les personnes sur la collecte et le traitement de leurs données. Formulaire de contact, newsletter, cookies : chaque traitement doit être documenté.",
      },
      {
        heading: "Droits des utilisateurs couverts",
        body: "Notre modèle intègre les mentions sur l'accès, la rectification, l'effacement et la limitation du traitement, ainsi que le contact du responsable de traitement.",
      },
      {
        heading: "Cookies et analytics",
        body: "Précisez dans le formulaire les données réellement collectées (Google Analytics, Meta Pixel, formulaire Hubspot…) pour un document aligné sur votre stack.",
      },
    ],
  },
  "contrat-prestation": {
    metaTitle: "Contrat de prestation de services freelance — modèle PDF",
    metaDescription:
      "Générez un contrat de prestation entre freelance et client : mission, prix, délais, paiement. Sécurisez vos missions.",
    h1: "Contrat de prestation de services",
    intro:
      "Formalisez votre relation client avant de démarrer la mission. Évitez les impayés et les flous sur le périmètre.",
    seoBlocks: [
      {
        heading: "Pourquoi un contrat avant la mission ?",
        body: "Sans contrat écrit, les litiges sur le périmètre, les délais ou le paiement sont difficiles à trancher. Un contrat de prestation fixe les règles du jeu pour les deux parties.",
      },
      {
        heading: "Clauses essentielles incluses",
        body: "Description de la prestation, prix, modalités de paiement, date de livraison et coordonnées des parties. À adapter selon la complexité de votre mission.",
      },
      {
        heading: "Complément : cession de droits",
        body: "Pour les créatifs (design, photo, dev), pensez à ajouter une clause de cession de droits d'auteur si le client doit exploiter les livrables.",
      },
    ],
  },
  devis: {
    metaTitle: "Devis conforme freelance — générateur gratuit",
    metaDescription:
      "Créez un devis professionnel avec mentions obligatoires : SIRET, prestation, montants HT/TTC, validité.",
    h1: "Devis conforme",
    intro:
      "Un devis clair rassure le client et accélère la signature. Mentions légales et calcul TVA inclus.",
    seoBlocks: [
      {
        heading: "Devis vs facture : quelle différence ?",
        body: "Le devis est une proposition commerciale avant la prestation. Une fois accepté, il peut servir de base à la facturation. Il doit identifier clairement le prestataire et le client.",
      },
      {
        heading: "Mentions obligatoires sur un devis",
        body: "Numéro de devis, date, durée de validité, description de la prestation, montant HT, taux de TVA (ou mention franchise en base), coordonnées complètes des parties.",
      },
      {
        heading: "Franchise en base de TVA",
        body: "Si vous êtes en franchise de TVA, indiquez-le sur le devis. Le formulaire calcule le TTC selon le taux saisi (0 % si franchise).",
      },
    ],
  },
};
