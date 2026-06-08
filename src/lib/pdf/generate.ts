import type { DocumentSlug } from "@/lib/documents/registry";
import { captureServerError } from "@/lib/observability/sentry";
import { PDF_TIMEOUT_MS, withPdfPage } from "@/lib/pdf/browser-pool";
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
  const rawHtml = await renderDocumentHtml(slug, data, withWatermark);
  const html = sanitizePdfHtml(rawHtml);

  try {
    return await withPdfConcurrency(() =>
      withPdfPage(async (page) => {
        await page.setContent(html, {
          waitUntil: "domcontentloaded",
          timeout: PDF_TIMEOUT_MS,
        });

        const pdf = await page.pdf({
          format: "A4",
          printBackground: true,
          margin: { top: "20mm", right: "15mm", bottom: "25mm", left: "15mm" },
          preferCSSPageSize: true,
        });

        return Buffer.from(pdf);
      }),
    );
  } catch (error) {
    captureServerError(error, { slug, stage: "puppeteer" });
    throw error;
  }
}
