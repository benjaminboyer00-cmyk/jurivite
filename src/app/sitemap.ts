import type { MetadataRoute } from "next";

import { documents } from "@/lib/documents/registry";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const documentPages: MetadataRoute.Sitemap = documents.map((doc) => ({
    url: `${siteConfig.url}${doc.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...documentPages];
}
