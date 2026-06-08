import type { Metadata } from "next";

const SITE_NAME = "JuriVite";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Générateur de documents juridiques en ligne pour freelances, auto-entrepreneurs et TPE : CGV, mentions légales, RGPD, contrats, devis. PDF en 5 minutes.",
  locale: "fr_FR",
  tagline: "Documents juridiques conformes, générés en ligne",
} as const;

const DEFAULT_KEYWORDS = [
  "documents juridiques",
  "générateur documents juridiques",
  "freelance",
  "auto-entrepreneur",
  "micro-entreprise",
  "TPE",
  "CGV",
  "mentions légales",
  "RGPD",
  "contrat prestation",
  "contrat freelance norme",
  "modèle contrat freelance",
  "devis conforme",
  "modèle juridique pdf",
] as const;

type CreateMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  /** Titre absolu (accueil) sans suffixe */
  absoluteTitle?: boolean;
};

const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
} as const;

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
  absoluteTitle = false,
}: CreateMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = absoluteTitle
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: { "fr-FR": url },
    },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "business",
    applicationName: siteConfig.name,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultOgImage.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
