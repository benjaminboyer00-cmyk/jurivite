import type { DocumentSlug } from "@/lib/documents/registry";

/** Référentiel interne — ne remplace pas un avis juridique */
export type DocumentLegalAudit = {
  slug: DocumentSlug;
  title: string;
  legalBasis: string[];
  appliesTo: string[];
  limitations: string[];
  statusChecks: string[];
};

export const DOCUMENT_LEGAL_AUDITS: DocumentLegalAudit[] = [
  {
    slug: "cgv",
    title: "Conditions Générales de Vente",
    legalBasis: [
      "Code de la consommation (B2C) : information précontractuelle, droit de rétractation (L221-18)",
      "Code de commerce : délais de paiement, pénalités (L441-10)",
      "Médiation consommation (L612-1)",
    ],
    appliesTo: [
      "Micro-entreprise, AE, EI, sociétés vendant prestations/produits",
    ],
    limitations: [
      "Clauses limitées de responsabilité potentiellement abusives en B2C",
      "Médiateur à personnaliser si autre que CNPM",
    ],
    statusChecks: [
      "TVA 293 B si micro/AE (ou EI en franchise cochée)",
      "Capital + RCS si société",
      "Délai rétractation : 14 jours par défaut (consommateurs)",
    ],
  },
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    legalBasis: ["LCEN (loi 2004-575) : éditeur, directeur publication, hébergeur"],
    appliesTo: ["Tout site professionnel ou activité commerciale en ligne"],
    limitations: [
      "Associations : RNA recommandé en plus du SIRET si existant",
      "EI/micro : pas de « représentant légal » au sens société",
    ],
    statusChecks: [
      "Hébergeur avec nom et adresse réels",
      "Directeur de publication identifié",
    ],
  },
  {
    slug: "politique-confidentialite",
    title: "Politique de confidentialité",
    legalBasis: ["RGPD (UE 2016/679) art. 13-14", "Loi Informatique et Libertés"],
    appliesTo: ["Dès collecte e-mail, cookies analytics, formulaires"],
    limitations: [
      "Registre des traitements et DPA sous-traitants à tenir à jour",
      "Transferts hors UE à déclarer si outils US (Google, Meta…)",
    ],
    statusChecks: [
      "Hébergeur listé comme sous-traitant",
      "Finalités et durées alignées sur la réalité",
      "Contact données / DPO si applicable",
      "Faire relire si collecte de données clients ou cookies analytics",
    ],
  },
  {
    slug: "contrat-prestation",
    title: "Contrat de prestation",
    legalBasis: [
      "Code civil : obligation de moyens (art. 1195), force majeure (1218)",
      "Code de commerce si professionnels",
    ],
    appliesTo: ["Freelances, agences, prestataires B2B principalement"],
    limitations: [
      "B2C : clauses responsabilité/limitation peuvent être frappées d'abusivité",
      "Propriété intellectuelle : cession à préciser selon livrables",
    ],
    statusChecks: [
      "TVA selon statut",
      "Société : capital et RCS dans l'en-tête",
    ],
  },
  {
    slug: "devis",
    title: "Devis",
    legalBasis: [
      "Code de commerce (B2B) : devis obligatoire travaux > 1 000 € HT",
      "Bonnes pratiques commerciales",
    ],
    appliesTo: ["Tous prestataires recommandé avant facturation"],
    limitations: [
      "Devis ≠ contrat ; signature « bon pour accord » conseillée",
    ],
    statusChecks: [
      "Numéro, date, validité, SIRET, montants HT/TTC cohérents",
      "IBAN recommandé si acompte ou signature rapide",
      "Pas de ligne TVA 0 % trompeuse si franchise 293 B",
    ],
  },
  {
    slug: "facture",
    title: "Facture",
    legalBasis: [
      "Art. 242 nonies annexe II CGI : mentions obligatoires",
      "B2B : art. L441-9 C. com. (pénalités de retard)",
    ],
    appliesTo: ["Toute vente/prestation facturée"],
    limitations: [
      "Facturation électronique B2B 2026+ (réforme) : à anticiper",
      "Vérifiez l'IBAN et le titulaire du compte sur votre RIB officiel",
    ],
    statusChecks: [
      "Numérotation chronologique unique",
      "IBAN et modalités de paiement sur le PDF",
      "SIRET, adresse, HT/TTC ou mention 293 B",
      "Société : forme juridique, capital, RCS",
    ],
  },
  {
    slug: "cession-droits-auteur",
    title: "Cession de droits d'auteur",
    legalBasis: [
      "Code propriété intellectuelle L131-1 à L131-6 : cession distincte par droit, territoire, durée, prix",
      "Droits moraux inaliénables (L121-1)",
    ],
    appliesTo: ["Créatifs, designers, développeurs, photographes"],
    limitations: [
      "Cession « tous droits » doit rester explicite et rémunérée",
      "Salariés : cession limitée sauf clause spécifique",
    ],
    statusChecks: ["Prix de cession indiqué (obligation CPI)"],
  },
  {
    slug: "conditions-utilisation",
    title: "CGU (service en ligne)",
    legalBasis: ["Contrat d'adhésion, LCEN, RGPD"],
    appliesTo: ["SaaS, applications, marketplaces"],
    limitations: ["À coupler avec politique de confidentialité"],
    statusChecks: ["Description service et limitation responsabilité"],
  },
  {
    slug: "accord-confidentialite",
    title: "NDA",
    legalBasis: ["Code civil : obligation contractuelle de confidentialité"],
    appliesTo: ["Due diligence, partenariats, avant-projets"],
    limitations: [
      "Modèle unilatéral ; NDA bilatéral si les deux parties divulguent",
    ],
    statusChecks: ["Périmètre et durée définis"],
  },
  {
    slug: "convention-stage",
    title: "Convention de stage",
    legalBasis: [
      "Code éducation L124-1 à L124-25 : convention tripartite obligatoire",
      "Gratification si stage > 2 mois (L124-6)",
    ],
    appliesTo: ["Organismes accueillant stagiaires"],
    limitations: [
      "Ne remplace pas le Cerfa ni la convention signée par l'établissement",
      "Assurance RC et accident du travail à vérifier avec l'école",
    ],
    statusChecks: [
      "Établissement scolaire identifié (nom, adresse, représentant)",
      "Gratification si durée > 2 mois consécutifs",
      "Tuteur, mission et période décrits",
      "Transmettre à l'établissement pour signature tripartite",
    ],
  },
];

export function getDocumentAudit(slug: DocumentSlug): DocumentLegalAudit | undefined {
  return DOCUMENT_LEGAL_AUDITS.find((a) => a.slug === slug);
}
