import {
  documentPageContent,
  type DocumentPageContent,
  type SeoFaq,
} from "@/lib/documents/content";
import {
  getDocumentBySlug,
  isDocumentSlug,
  type DocumentDefinition,
  type DocumentSlug,
} from "@/lib/documents/registry";
import {
  getSeoLanding,
  isSeoLandingSlug,
  type SeoLandingPage,
} from "@/lib/documents/seo-landings";

export type ResolvedGeneratePage = {
  path: string;
  documentSlug: DocumentSlug;
  doc: DocumentDefinition;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  seoKeywords: string[];
  seoBlocks: { heading: string; body: string }[];
  faqs: SeoFaq[];
  breadcrumbLabel: string;
  isLanding: boolean;
};

export function resolveGeneratePage(slug: string): ResolvedGeneratePage | null {
  if (isDocumentSlug(slug)) {
    const doc = getDocumentBySlug(slug)!;
    const content = documentPageContent[slug];
    return buildResolved(`/generate/${slug}`, doc, content, false);
  }

  const landing = getSeoLanding(slug);
  if (landing) {
    const doc = getDocumentBySlug(landing.documentSlug)!;
    return {
      path: `/generate/${landing.slug}`,
      documentSlug: landing.documentSlug,
      doc,
      metaTitle: landing.metaTitle,
      metaDescription: landing.metaDescription,
      h1: landing.h1,
      intro: landing.intro,
      seoKeywords: landing.seoKeywords,
      seoBlocks: landing.seoBlocks,
      faqs: landing.faqs,
      breadcrumbLabel: landing.h1,
      isLanding: true,
    };
  }

  return null;
}

function buildResolved(
  path: string,
  doc: DocumentDefinition,
  content: DocumentPageContent,
  isLanding: boolean,
): ResolvedGeneratePage {
  return {
    path,
    documentSlug: doc.slug,
    doc,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    h1: content.h1,
    intro: content.intro,
    seoKeywords: doc.seoKeywords,
    seoBlocks: content.seoBlocks,
    faqs: content.faqs,
    breadcrumbLabel: isLanding ? content.h1 : doc.shortTitle,
    isLanding,
  };
}

export function isValidGenerateSlug(slug: string): boolean {
  return isDocumentSlug(slug) || isSeoLandingSlug(slug);
}
