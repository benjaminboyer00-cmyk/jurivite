import { captureServerError } from "@/lib/observability/sentry";
import { PDF_TIMEOUT_MS, withPdfPage } from "@/lib/pdf/browser-pool";
import { renderDocumentHtml } from "@/lib/pdf/render";
import { warmTemplateCache } from "@/lib/pdf/template-cache";
import type { DocumentSlug } from "@/lib/documents/registry";

let templatesWarmed = false;

function ensureTemplatesReady(): void {
  if (!templatesWarmed) {
    warmTemplateCache();
    templatesWarmed = true;
  }
}

export async function generatePdfBuffer(
  slug: DocumentSlug,
  data: Record<string, unknown>,
  withWatermark: boolean,
): Promise<Buffer> {
  ensureTemplatesReady();
  const html = await renderDocumentHtml(slug, data, withWatermark);

  try {
    return await withPdfPage(async (page) => {
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
    });
  } catch (error) {
    captureServerError(error, { slug, stage: "puppeteer" });
    throw error;
  }
}
