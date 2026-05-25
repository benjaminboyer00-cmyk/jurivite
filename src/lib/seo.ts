import type { Metadata } from "next";

const SITE_NAME = "JuriVite";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Générateur de documents juridiques pour freelances et TPE : CGV, mentions légales, contrats. PDF conformes en quelques minutes.",
  locale: "fr_FR",
} as const;

type CreateMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    path === "" || path === "/"
      ? `${title} | ${siteConfig.name}`
      : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "documents juridiques",
      "freelance",
      "auto-entrepreneur",
      "CGV",
      "mentions légales",
      ...keywords,
    ],
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
