import sanitizeHtml from "sanitize-html";

/** Tags nécessaires aux templates PDF Handlebars (pas de scripts / iframes). */
const PDF_ALLOWED_TAGS = [
  "html",
  "head",
  "meta",
  "title",
  "style",
  "body",
  "div",
  "p",
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "br",
  "hr",
  "section",
  "article",
  "header",
  "footer",
  "small",
  "blockquote",
  "dl",
  "dt",
  "dd",
  "colgroup",
  "col",
] as const;

const PDF_ALLOWED_ATTR: Record<string, string[]> = {
  "*": [
    "class",
    "style",
    "id",
    "lang",
    "align",
    "valign",
    "width",
    "height",
    "border",
    "cellpadding",
    "cellspacing",
    "colspan",
    "rowspan",
  ],
  meta: ["charset", "name", "content"],
  col: ["width", "span"],
  colgroup: ["span", "width"],
};

/**
 * Dernière barrière avant Puppeteer : supprime scripts, handlers inline,
 * iframes et liens javascript: même si une faille Handlebars passait.
 *
 * Utilise `sanitize-html` (pur Node, sans jsdom) — compatible Vercel serverless.
 */
export function sanitizePdfHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [...PDF_ALLOWED_TAGS],
    allowedAttributes: PDF_ALLOWED_ATTR,
    allowVulnerableTags: false,
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: false,
    parseStyleAttributes: false,
  });
}
