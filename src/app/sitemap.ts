import type { MetadataRoute } from "next";

import { documents } from "@/lib/documents/registry";
import { seoLandingPages } from "@/lib/documents/seo-landings";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/generate`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/tarifs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/cgu`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.55,
    },
    {
      url: `${siteConfig.url}/cgv`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const documentPages: MetadataRoute.Sitemap = documents.map((doc) => ({
    url: `${siteConfig.url}${doc.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  const landingPages: MetadataRoute.Sitemap = seoLandingPages.map(
    (landing) => ({
      url: `${siteConfig.url}/generate/${landing.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }),
  );

  return [...staticPages, ...documentPages, ...landingPages];
}
