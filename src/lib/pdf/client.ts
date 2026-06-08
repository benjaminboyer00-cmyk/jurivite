import type { DocumentSlug } from "@/lib/documents/registry";

type PdfApiError = {
  error?: string;
  code?: string;
  detail?: string;
  requestId?: string;
};

function formatPdfError(status: number, payload: PdfApiError): string {
  const parts: string[] = [
    payload.error ?? "Échec de la génération du PDF",
  ];

  if (payload.code) {
    parts.push(`[${payload.code}]`);
  }

  if (payload.detail) {
    parts.push(payload.detail);
  }

  if (payload.requestId) {
    parts.push(`ref: ${payload.requestId.slice(0, 12)}`);
  }

  if (status === 402) {
    parts.push("— voir /tarifs");
  }

  return parts.join(" ");
}

export async function downloadGeneratedPdf(
  slug: DocumentSlug,
  data: Record<string, unknown>,
): Promise<void> {
  const response = await fetch("/api/generate-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, data }),
  });

  if (!response.ok) {
    const err = (await response.json().catch(() => ({}))) as PdfApiError;
    throw new Error(formatPdfError(response.status, err));
  }

  const blob = await response.blob();
  const disposition = response.headers.get("Content-Disposition");
  const fallback = `jurivite-${slug}.pdf`;
  const fileName =
    disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? fallback;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
