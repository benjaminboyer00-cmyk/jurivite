import { getCompiledTemplate } from "@/lib/pdf/template-cache";
import { enrichTemplateData } from "@/lib/pdf/templates";
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
  const enriched = enrichTemplateData(slug, data);
  let html = getCompiledTemplate(slug)(enriched);

  if (withWatermark) {
    const watermarkBlock = `
      <style>${WATERMARK_STYLE}</style>
      <div class="jurivite-watermark">JURIVITE — VERSION GRATUITE</div>
    `;
    html = html.replace("</body>", `${watermarkBlock}</body>`);
  }

  return html;
}
