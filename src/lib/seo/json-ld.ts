import { documents, type DocumentSlug } from "@/lib/documents/registry";
import { siteConfig } from "@/lib/seo";

type FaqItem = { question: string; answer: string };

type BreadcrumbItem = { name: string; path: string };

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description: siteConfig.description,
    sameAs: [],
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/generate/cgv?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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

export function productOffersJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "JuriVite — Générateur de documents juridiques",
    description: siteConfig.description,
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
        name: "Pro",
        price: "9",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "9",
          priceCurrency: "EUR",
          unitText: "MONTH",
        },
        description: "20 PDF/mois sans filigrane",
      },
      {
        "@type": "Offer",
        name: "Business",
        price: "30",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "30",
          priceCurrency: "EUR",
          unitText: "MONTH",
        },
        description: "PDF illimités + clé API",
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
  };
  return steps[slug];
}
