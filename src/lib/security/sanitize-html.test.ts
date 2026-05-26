import { describe, expect, it } from "vitest";

import { sanitizePdfHtml } from "@/lib/security/sanitize-html";

describe("sanitizePdfHtml", () => {
  it("supprime script et handlers inline", () => {
    const dirty = `<!DOCTYPE html><html><body>
      <p>OK</p>
      <script>fetch('https://evil.test')</script>
      <img src=x onerror="alert(1)">
      <iframe src="https://evil.test"></iframe>
    </body></html>`;
    const clean = sanitizePdfHtml(dirty);
    expect(clean).not.toContain("<script");
    expect(clean).not.toContain("onerror");
    expect(clean).not.toContain("<iframe");
    expect(clean).toContain("OK");
  });

  it("conserve la structure documentaire légitime", () => {
    const html = `<html><head><style>.x{color:red}</style></head><body><h1>Titre</h1></body></html>`;
    const clean = sanitizePdfHtml(html);
    expect(clean).toContain("<h1");
    expect(clean).toContain("Titre");
  });
});
