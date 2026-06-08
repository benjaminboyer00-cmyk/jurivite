import { describe, expect, it } from "vitest";

import {
  getPdfErrorDetail,
  PdfGenerationError,
  shouldExposePdfErrorDetail,
} from "@/lib/pdf/pdf-log";

describe("pdf-log", () => {
  it("extrait stage et code depuis PdfGenerationError", () => {
    const err = new PdfGenerationError("sanitize_html", "test failure");
    const detail = getPdfErrorDetail(err);
    expect(detail.stage).toBe("sanitize_html");
    expect(detail.code).toBe("PDF_SANITIZE_HTML");
    expect(detail.message).toBe("test failure");
  });

  it("shouldExposePdfErrorDetail suit NODE_ENV", () => {
    expect(typeof shouldExposePdfErrorDetail()).toBe("boolean");
  });
});
