import type { DocumentSlug } from "@/lib/documents/registry";
import { captureServerError } from "@/lib/observability/sentry";
import { PDF_TIMEOUT_MS, withPdfPage } from "@/lib/pdf/browser-pool";
import {
  PdfGenerationError,
  pdfTimed,
} from "@/lib/pdf/pdf-log";
import { renderDocumentHtml } from "@/lib/pdf/render";
import { warmTemplateCache } from "@/lib/pdf/template-cache";
import { withPdfConcurrency } from "@/lib/security/pdf-concurrency";
import { sanitizePdfHtml } from "@/lib/security/sanitize-html";

let templatesWarmed = false;

function ensureTemplatesReady(): void {
  if (!templatesWarmed) {
    warmTemplateCache();
    templatesWarmed = true;
  }
}

/**
 * Pipeline PDF sécurisé :
 * 1. sanitizePdfPayload (Zod + champs)
 * 2. Handlebars (échappement {{ }})
 * 3. sanitizePdfHtml (sanitize-html)
 * 4. Puppeteer : JS off, requêtes externes bloquées, timeout, page fermée en finally
 */
export async function generatePdfBuffer(
  slug: DocumentSlug,
  data: Record<string, unknown>,
  withWatermark: boolean,
): Promise<Buffer> {
  ensureTemplatesReady();

  let rawHtml: string;
  try {
    rawHtml = await pdfTimed("render_html", { slug, withWatermark }, () =>
      renderDocumentHtml(slug, data, withWatermark),
    );
  } catch (error) {
    captureServerError(error, { slug, stage: "render_html" });
    throw new PdfGenerationError(
      "render_html",
      "Impossible de compiler le modèle HTML",
      error,
    );
  }

  let html: string;
  try {
    html = await pdfTimed("sanitize_html", { slug, htmlBytes: rawHtml.length }, () =>
      Promise.resolve(sanitizePdfHtml(rawHtml)),
    );
  } catch (error) {
    captureServerError(error, { slug, stage: "sanitize_html" });
    throw new PdfGenerationError(
      "sanitize_html",
      "Échec de la sanitization HTML (sanitize-html)",
      error,
    );
  }

  try {
    return await withPdfConcurrency(() =>
      withPdfPage(async (page) => {
        await pdfTimed("puppeteer_set_content", { slug, htmlBytes: html.length }, () =>
          page.setContent(html, {
            waitUntil: "domcontentloaded",
            timeout: PDF_TIMEOUT_MS,
          }),
        );

        const pdf = await pdfTimed("puppeteer_pdf", { slug }, () =>
          page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "20mm", right: "15mm", bottom: "25mm", left: "15mm" },
            preferCSSPageSize: true,
          }),
        );

        return Buffer.from(pdf);
      }, slug),
    );
  } catch (error) {
    captureServerError(error, { slug, stage: "puppeteer_pdf" });
    if (error instanceof PdfGenerationError) throw error;
    throw new PdfGenerationError(
      "puppeteer_pdf",
      error instanceof Error ? error.message : "Échec Puppeteer / Chromium",
      error,
    );
  }
}
