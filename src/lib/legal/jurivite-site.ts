/**
 * Informations légales JuriVite (éditeur du site).
 * Compléter JURIVITE_HOSTING_* et JURIVITE_DIRECTOR_NAME en production.
 */
export const juriviteLegal = {
  companyName: "JuriVite",
  legalForm: "Micro-entreprise",
  siret: "94430254600014",
  address: "12 rue Eugène Pottier, 93200 Saint-Denis, France",
  email: "contact@jurivite.fr",
  privacyEmail: process.env.JURIVITE_PRIVACY_EMAIL ?? "contact@jurivite.fr",
  phone: "0660614839",
  websiteUrl: "https://jurivite.fr",
  siteName: "JuriVite",
  directorName:
    process.env.JURIVITE_DIRECTOR_NAME ?? "Boyer (directeur de publication)",
  hostingProvider:
    process.env.JURIVITE_HOSTING_PROVIDER ??
    "À renseigner — ex. Hetzner, OVH, Scaleway (voir PRODUCTION.md)",
  hostingAddress:
    process.env.JURIVITE_HOSTING_ADDRESS ??
    "Adresse postale de l'hébergeur — variable JURIVITE_HOSTING_ADDRESS",
  /** Médiation consommation (CGV B2C site + modèles utilisateurs) */
  mediatorName:
    process.env.JURIVITE_MEDIATOR_NAME ??
    "CNPM — Centre de médiation de la consommation",
  mediatorUrl:
    process.env.JURIVITE_MEDIATOR_URL ?? "https://www.cnpm-mediation-consommation.eu",
  mediatorContact:
    process.env.JURIVITE_MEDIATOR_CONTACT ??
    "Saisine en ligne sur le site du médiateur",
  lastUpdated: "mai 2026",
} as const;

export function isHostingConfigured(): boolean {
  return (
    Boolean(process.env.JURIVITE_HOSTING_PROVIDER) &&
    Boolean(process.env.JURIVITE_HOSTING_ADDRESS)
  );
}

/** Texte court — formulaires et bannières */
export const LEGAL_MODEL_DISCLAIMER =
  "Modèle structuré généré par JuriVite : ne remplace pas un conseil juridique. Vous restez responsable du contenu publié et de sa conformité à votre activité.";

/** Pied de page PDF — tous les documents */
export const PDF_LEGAL_NOTICE =
  "Document généré via JuriVite (modèle structuré). Ne constitue pas un conseil juridique. À adapter à votre situation ; faites relire par un professionnel du droit si nécessaire (B2C, secteur réglementé, montants élevés).";
