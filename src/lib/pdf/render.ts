import fs from "fs/promises";
import Handlebars from "handlebars";

import {
  enrichTemplateData,
  loadTemplateSource,
} from "@/lib/pdf/templates";
import type { DocumentSlug } from "@/lib/documents/registry";

const WATERMARK_STYLE = `
  .jurivite-watermark {
    position: fixed;
    top: 40%;
    left: 10%;
    width: 80%;
    text-align: center;
    font-size: 48pt;
    font-weight: bold;
    color: rgba(200, 0, 0, 0.12);
    transform: rotate(-35deg);
    z-index: 9999;
    pointer-events: none;
    user-select: none;
  }
`;

export async function renderDocumentHtml(
  slug: DocumentSlug,
  data: Record<string, unknown>,
  withWatermark: boolean,
): Promise<string> {
  const source = loadTemplateSource(slug);
  const compile = Handlebars.compile(source);
  const enriched = enrichTemplateData(slug, data);
  let html = compile(enriched);

  if (withWatermark) {
    const watermarkBlock = `
      <style>${WATERMARK_STYLE}</style>
      <div class="jurivite-watermark">JURIVITE — VERSION GRATUITE</div>
    `;
    html = html.replace("</body>", `${watermarkBlock}</body>`);
  }

  return html;
}
