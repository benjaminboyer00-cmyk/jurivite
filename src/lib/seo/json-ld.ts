import { documents, type DocumentSlug } from "@/lib/documents/registry";
import {
  getPublisherSameAsLinks,
  juriviteLegal,
} from "@/lib/legal/jurivite-site";
import { PRICING } from "@/lib/plans";
import { siteConfig } from "@/lib/seo";

type FaqItem = { question: string; answer: string };

type BreadcrumbItem = { name: string; path: string };

export function organizationJsonLd() {
  const sameAs = getPublisherSameAsLinks();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: juriviteLegal.siteName,
    legalName: `${juriviteLegal.legalEntityName} (${juriviteLegal.tradeName})`,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description: siteConfig.description,
    email: juriviteLegal.email,
    telephone: juriviteLegal.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: juriviteLegal.address,
      addressCountry: "FR",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "SIRET",
      value: juriviteLegal.siret,
    },
    founder: {
      "@type": "Person",
      name: juriviteLegal.legalEntityName,
      jobTitle: juriviteLegal.publisherRole,
      email: juriviteLegal.email,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "fr-FR",
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function softwareApplicationJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description,
    url: `${siteConfig.url}${path}`,
  };
}

export function itemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Documents juridiques JuriVite",
    itemListElement: documents.map((doc, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: doc.title,
      url: `${siteConfig.url}${doc.href}`,
    })),
  };
}

export function namedItemListJsonLd(
  name: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function productOffersJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "JuriVite — Générateur de documents juridiques",
    description: siteConfig.description,
    url: `${siteConfig.url}/tarifs`,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: [
      {
        "@type": "Offer",
        name: "Gratuit",
        price: "0",
        priceCurrency: "EUR",
        description: "PDF avec filigrane",
      },
      {
        "@type": "Offer",
        name: "Document à l'unité",
        price: "4.9",
        priceCurrency: "EUR",
        description: "1 document sans filigrane, mises à jour à vie",
      },
      {
        "@type": "Offer",
        name: "Pack Essentiel",
        price: String(PRICING.packEssential),
        priceCurrency: "EUR",
        description: "3 documents + 3 mois de mises à jour",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "29.9",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "29.9",
          priceCurrency: "EUR",
          unitText: "MONTH",
        },
        description: "PDF illimités sans filigrane",
      },
    ],
  };
}

export function howToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text,
      text,
    })),
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: "fr-FR",
  };
}

export function documentHowToSteps(slug: DocumentSlug): string[] {
  const steps: Record<DocumentSlug, string[]> = {
    cgv: [
      "Renseignez votre entreprise (SIRET, adresse, contact)",
      "Décrivez votre activité, délais et modalités de paiement",
      "Vérifiez et téléchargez votre PDF de CGV",
    ],
    "mentions-legales": [
      "Indiquez l'identité de votre entreprise",
      "Ajoutez l'URL du site et les infos hébergeur",
      "Téléchargez vos mentions légales en PDF",
    ],
    "politique-confidentialite": [
      "Définissez le responsable du traitement",
      "Listez les données collectées et leur finalité",
      "Générez votre politique RGPD en PDF",
    ],
    "contrat-prestation": [
      "Saisissez vos informations prestataire",
      "Détaillez la mission, le client et le prix",
      "Exportez le contrat prêt à signer",
    ],
    devis: [
      "Complétez votre profil entreprise",
      "Renseignez client, prestation et montants HT/TVA",
      "Téléchargez un devis conforme en PDF",
    ],
    facture: [
      "Identifiez votre structure (forme juridique, SIRET)",
      "Saisissez client, numéro de facture et montants",
      "Exportez une facture PDF prête à envoyer",
    ],
    "cession-droits-auteur": [
      "Renseignez le cédant (auteur / studio)",
      "Définissez l'œuvre, le territoire et la rémunération",
      "Générez le contrat de cession en PDF",
    ],
    "conditions-utilisation": [
      "Indiquez l'éditeur du service",
      "Décrivez le service et la clause de responsabilité",
      "Publiez vos CGU en PDF",
    ],
    "accord-confidentialite": [
      "Identifiez la partie divulgatrice",
      "Précisez le destinataire et le périmètre confidentiel",
      "Signez un NDA structuré en PDF",
    ],
    "convention-stage": [
      "Renseignez l'organisme d'accueil et le tuteur",
      "Décrivez le stagiaire, l'école et la mission",
      "Téléchargez la convention de stage",
    ],
  };
  return steps[slug];
}
