import fs from "fs";
import path from "path";

import type { DocumentSlug } from "@/lib/documents/registry";
import {
  enrichLegalContext,
  enrichSlugSpecificData,
} from "@/lib/pdf/legal";

const TEMPLATE_FILES: Record<DocumentSlug, string> = {
  cgv: "cgv.html",
  "mentions-legales": "mentions-legales.html",
  "politique-confidentialite": "politique-confidentialite.html",
  "contrat-prestation": "contrat-prestation.html",
  devis: "devis.html",
  facture: "facture.html",
  "cession-droits-auteur": "cession-droits-auteur.html",
  "conditions-utilisation": "conditions-utilisation.html",
  "accord-confidentialite": "accord-confidentialite.html",
  "convention-stage": "convention-stage.html",
};

let legalStylesCache: string | null = null;
const templateSourceCache = new Map<DocumentSlug, string>();

export function getTemplatePath(slug: DocumentSlug): string {
  const file = TEMPLATE_FILES[slug];
  return path.join(process.cwd(), "templates", file);
}

export function loadTemplateSource(slug: DocumentSlug): string {
  const cached = templateSourceCache.get(slug);
  if (cached) return cached;

  const raw = fs.readFileSync(getTemplatePath(slug), "utf8");

  if (!legalStylesCache) {
    legalStylesCache = fs.readFileSync(
      path.join(process.cwd(), "templates/partials/legal-styles.html"),
      "utf8",
    );
  }

  let merged = raw.replace("<!-- LEGAL_STYLES -->", legalStylesCache);

  if (!merged.includes("pdfLegalDisclaimer")) {
    const disclaimerBlock = `
    <p class="legal-notice" style="margin-top:1.5em;border:1px solid #999;padding:0.8em;">
      <strong>Avertissement important</strong> — {{pdfLegalDisclaimer}}
    </p>`;
    merged = merged.replace("</body>", `${disclaimerBlock}\n</body>`);
  }

  templateSourceCache.set(slug, merged);
  return merged;
}

export function enrichTemplateData(
  slug: DocumentSlug,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const withLegal = enrichLegalContext(data);
  return enrichSlugSpecificData(slug, withLegal);
}
