import puppeteer from "puppeteer";

import { renderDocumentHtml } from "@/lib/pdf/render";
import type { DocumentSlug } from "@/lib/documents/registry";

export async function generatePdfBuffer(
  slug: DocumentSlug,
  data: Record<string, unknown>,
  withWatermark: boolean,
): Promise<Buffer> {
  const html = await renderDocumentHtml(slug, data, withWatermark);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
