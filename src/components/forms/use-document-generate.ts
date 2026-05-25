"use client";

import { downloadGeneratedPdf } from "@/lib/pdf/client";
import type { DocumentSlug } from "@/lib/documents/registry";

export function useDocumentGenerate(slug: DocumentSlug) {
  return async (data: Record<string, unknown>) => {
    await downloadGeneratedPdf(slug, data);
  };
}
