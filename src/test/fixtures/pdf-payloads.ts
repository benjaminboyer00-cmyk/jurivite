import type { DocumentSlug } from "@/lib/documents/registry";
import { documentSlugs } from "@/lib/documents/registry";

/** SIRET valide (clé Luhn) pour les tests Zod */
export const TEST_SIRET = "35600000000019";

const companyBase = {
  companyName: "Test SARL",
  legalForm: "SARL",
  siret: TEST_SIRET,
  address: "12 rue de Test, 75001 Paris",
  email: "contact@test.fr",
  phone: "0612345678",
  shareCapital: "1000",
  rcsCity: "Paris",
  vatNumber: "",
  franchiseTva: true,
  rnaNumber: "",
};

const payloads: Record<DocumentSlug, Record<string, unknown>> = {
  cgv: {
    ...companyBase,
    activityDescription:
      "Conseil et développement web pour TPE et associations.",
    deliveryDelay: "7 jours ouvrés après validation du devis",
    paymentTerms: "Paiement à 30 jours par virement bancaire",
    withdrawalPeriodDays: 14,
  },
  "mentions-legales": {
    ...companyBase,
    websiteUrl: "https://example.fr",
    siteName: "Example",
    directorName: "Jean Dupont",
    hostingProvider: "OVH",
    hostingAddress: "2 rue Kellermann, 59100 Roubaix, France",
  },
  "politique-confidentialite": {
    ...companyBase,
    websiteUrl: "https://example.fr",
    dataCollected: "Nom, e-mail, données de navigation et cookies",
    processingPurpose: "Gestion des demandes et amélioration du service",
    retentionPeriod: "3 ans après dernier contact",
    hostingProvider: "OVH",
    hostingAddress: "2 rue Kellermann, 59100 Roubaix, France",
    dpoEmail: "",
  },
  "contrat-prestation": {
    ...companyBase,
    clientName: "Client Test",
    clientAddress: "5 avenue Client, 69001 Lyon",
    serviceDescription:
      "Développement complet d'un site vitrine responsive avec CMS",
    price: "2500",
    paymentTerms: "40 % à la commande, solde à livraison",
    deliveryDate: "30/06/2026",
  },
  devis: {
    ...companyBase,
    clientName: "Client Test",
    clientEmail: "client@test.fr",
    quoteNumber: "DEV-2026-001",
    quoteDate: "2026-05-26",
    validityDays: 30,
    serviceDescription: "Audit SEO et recommandations techniques",
    amountExclVat: 800,
    vatRate: 20,
    paymentTerms: "À réception de facture",
    iban: "",
    bic: "",
    bankAccountHolder: "",
  },
  facture: {
    ...companyBase,
    clientName: "Client Test",
    clientAddress: "5 avenue Client, 69001 Lyon",
    invoiceNumber: "FAC-2026-001",
    invoiceDate: "2026-05-26",
    dueDate: "2026-06-26",
    serviceDescription: "Prestation de conseil mai 2026",
    amountExclVat: 800,
    vatRate: 20,
    paymentTerms: "30 jours fin de mois",
    iban: "FR1420041010050500013M02606",
    bic: "PSSTFRPPPAR",
    bankAccountHolder: "Test SARL",
  },
  "cession-droits-auteur": {
    ...companyBase,
    clientName: "Client Test",
    clientAddress: "5 avenue Client, 69001 Lyon",
    workTitle: "Série d'illustrations 2026",
    workDescription: "Illustrations originales pour plaquette commerciale",
    exploitationMedia: "Print et web",
    territory: "France",
    duration: "5 ans",
    assignmentPrice: "1200",
    paymentTerms: "Paiement à la signature par virement",
  },
  "conditions-utilisation": {
    ...companyBase,
    websiteUrl: "https://example.fr",
    siteName: "Example",
    serviceDescription:
      "Plateforme en ligne de génération de documents juridiques pour freelances et TPE.",
    liabilityClause:
      "Le service est fourni en l'état ; l'éditeur limite sa responsabilité aux dommages directs prouvés.",
    applicableLaw: "Droit français",
  },
  "accord-confidentialite": {
    ...companyBase,
    recipientName: "Partenaire SA",
    recipientAddress: "1 rue Partenaire, 33000 Bordeaux",
    recipientRole: "Directeur technique",
    confidentialScope: "Données techniques et commerciales échangées dans le cadre du projet",
    durationYears: 2,
    survivalYears: 3,
    purpose: "Projet de co-développement produit",
  },
  "convention-stage": {
    ...companyBase,
    traineeName: "Marie Étudiante",
    traineeAddress: "10 campus, 75013 Paris",
    schoolName: "Lycée Professionnel Test",
    schoolAddress: "20 rue École, 75013 Paris",
    schoolRepresentative: "M. Proviseur",
    tutorName: "M. Tuteur",
    startDate: "01/09/2026",
    endDate: "31/12/2026",
    weeklyHours: 35,
    missionDescription:
      "Participation au développement front-end sous supervision du tuteur.",
    gratificationAmount: "600 € mensuels",
  },
};

export function minimalPayloadForSlug(slug: DocumentSlug): Record<string, unknown> {
  return { ...payloads[slug] };
}

export function allDocumentSlugFixtures(): DocumentSlug[] {
  return [...documentSlugs];
}
