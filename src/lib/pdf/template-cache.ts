import Handlebars from "handlebars";

import type { DocumentSlug } from "@/lib/documents/registry";
import { documentSlugs } from "@/lib/documents/registry";
import { loadTemplateSource } from "@/lib/pdf/templates";

const compiledTemplates = new Map<DocumentSlug, HandlebarsTemplateDelegate>();

/** Pré-charge les 10 templates au premier appel PDF (évite readFileSync à chaque requête). */
export function warmTemplateCache(): void {
  for (const slug of documentSlugs) {
    getCompiledTemplate(slug);
  }
}

export function getCompiledTemplate(
  slug: DocumentSlug,
): HandlebarsTemplateDelegate {
  let compiled = compiledTemplates.get(slug);
  if (!compiled) {
    const source = loadTemplateSource(slug);
    compiled = Handlebars.compile(source);
    compiledTemplates.set(slug, compiled);
  }
  return compiled;
}
