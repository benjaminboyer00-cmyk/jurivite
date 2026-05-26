/**
 * Informations légales JuriVite — éditeur identifié (LCEN / RGPD).
 * Service en ligne « JuriVite » édité par Benjamin Boyer, EI micro-entreprise « bzign ».
 */
export const SOFTWARE_VERSION = "0.2.0";

export const juriviteLegal = {
  /** Marque du service en ligne */
  siteName: "JuriVite",
  websiteUrl: "https://jurivite.fr",
  companyName: "JuriVite",

  /** Éditeur — Benjamin Boyer / bzign */
  legalEntityName: "Benjamin Boyer",
  tradeName: "bzign",
  legalForm: "Entrepreneur individuel — micro-entreprise",
  legalFormShort: "EI — micro-entreprise",
  rcsRmMention:
    "Dispensé d'immatriculation au registre du commerce et des sociétés (RCS) et au répertoire des métiers (RM)",
  siret: "94430254600014",
  siren: "944302546",
  address: "12 rue Eugène Pottier, 93200 Saint-Denis, France",
  email: process.env.JURIVITE_CONTACT_EMAIL ?? "contact@jurivite.fr",
  privacyEmail:
    process.env.JURIVITE_PRIVACY_EMAIL ??
    process.env.JURIVITE_CONTACT_EMAIL ??
    "contact@jurivite.fr",
  phone: "0660614839",

  publisherFullName:
    process.env.JURIVITE_PUBLISHER_FULL_NAME ?? "Benjamin Boyer",
  directorName:
    process.env.JURIVITE_DIRECTOR_NAME ??
    "Benjamin Boyer — fondateur et directeur de publication",
  publisherRole:
    "Entrepreneur individuel (micro-entreprise), fondateur et directeur de publication",

  publisherWebsite: process.env.JURIVITE_PUBLISHER_WEBSITE ?? "",
  linkedInUrl: process.env.JURIVITE_LINKEDIN_URL ?? "",
  githubUrl: process.env.JURIVITE_GITHUB_URL ?? "",

  hostingProvider:
    process.env.JURIVITE_HOSTING_PROVIDER ??
    "À renseigner — ex. Hetzner, OVH, Scaleway (voir PRODUCTION.md)",
  hostingAddress:
    process.env.JURIVITE_HOSTING_ADDRESS ??
    "Adresse postale de l'hébergeur — variable JURIVITE_HOSTING_ADDRESS",

  tvaFranchiseMention: "TVA non applicable, article 293 B du CGI",
  competentCourt:
    "tribunaux du ressort de Saint-Denis (Seine-Saint-Denis), sous réserve des règles impératives de compétence des consommateurs",

  mediatorName:
    process.env.JURIVITE_MEDIATOR_NAME ??
    "CNPM — Centre de médiation de la consommation",
  mediatorUrl:
    process.env.JURIVITE_MEDIATOR_URL ?? "https://www.cnpm-mediation-consommation.eu",
  mediatorContact:
    process.env.JURIVITE_MEDIATOR_CONTACT ??
    "Saisine en ligne sur le site du médiateur",

  lastUpdated: "26 mai 2026",
  softwareVersion: SOFTWARE_VERSION,
  openSourceLicense: "MIT",
} as const;

/** Identification LCEN complète (HTML-safe, une ligne par élément) */
export function formatLegalEditorBlock(): string {
  const l = juriviteLegal;
  return [
    `${l.legalEntityName}, ${l.legalForm}`,
    `Nom commercial : ${l.tradeName} — service en ligne « ${l.siteName} » (${l.websiteUrl})`,
    `Siège : ${l.address}`,
    `SIRET : ${l.siret} — SIREN : ${l.siren}`,
    `${l.rcsRmMention}`,
    `E-mail : ${l.email} — Tél. : ${l.phone}`,
    `Directeur de publication : ${l.directorName}`,
  ].join("\n");
}

export function getContractPartyLabel(): string {
  const l = juriviteLegal;
  return `${l.legalEntityName}, entrepreneur individuel sous le régime de la micro-entreprise, exerçant sous le nom commercial « ${l.tradeName} » (${l.siteName}), ${l.address}, SIRET ${l.siret}`;
}

export function isHostingConfigured(): boolean {
  return (
    Boolean(process.env.JURIVITE_HOSTING_PROVIDER) &&
    Boolean(process.env.JURIVITE_HOSTING_ADDRESS)
  );
}

export function getPublisherSameAsLinks(): string[] {
  return [juriviteLegal.linkedInUrl, juriviteLegal.githubUrl, juriviteLegal.publisherWebsite].filter(
    (url) => url.length > 0,
  );
}

/** Disclaimer service — site */
export const SERVICE_DISCLAIMER =
  "JuriVite est un outil technique de génération automatique de modèles de documents juridiques à partir de données saisies par l'utilisateur. Aucune intelligence artificielle n'analyse votre situation personnelle ; aucun professionnel du droit ne valide le document final. Ce n'est pas un conseil juridique.";

/** Avertissement complet (consultation — art. 54 loi 31/12/1971) */
export const DISCLAIMER_FULL_TEXT =
  "Avertissement important : JuriVite est un outil technique de génération automatique de modèles de documents juridiques à partir de données génériques. Les documents ainsi produits ne constituent en aucun cas un conseil juridique personnalisé, une consultation ou une recommandation. Ils ne sont pas adaptés à votre situation particulière et ne remplacent pas l'avis d'un avocat ou d'un professionnel du droit qualifié. L'éditeur (Benjamin Boyer, EI « bzign ») ne pourra être tenu responsable de tout préjudice résultant de l'utilisation de ces modèles. Il vous appartient de vérifier la pertinence et la conformité du document avant toute utilisation, et de le faire valider par un avocat si nécessaire.";

export const LEGAL_MODEL_DISCLAIMER =
  "Modèle structuré généré par JuriVite : ne remplace pas un conseil juridique. Faites relire une CGV B2C et votre politique RGPD si vous collectez des données clients.";

export const PDF_LEGAL_NOTICE = DISCLAIMER_FULL_TEXT;

/** Texte case à cocher avant téléchargement PDF */
export const LEGAL_ACCEPTANCE_TEXT =
  "Je confirme avoir relu mes informations et j'accepte l'avis juridique ci-dessus : ce PDF est un modèle automatique, non un conseil juridique personnalisé. Je vérifierai la conformité du document à ma situation avant toute utilisation. J'accepte les CGU du service JuriVite.";
