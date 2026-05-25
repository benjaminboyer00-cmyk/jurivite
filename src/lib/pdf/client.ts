import type { DocumentSlug } from "@/lib/documents/registry";

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
    const err = await response.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ?? "Échec de la génération du PDF",
    );
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
