"use client";

import { useState } from "react";

import {
  adminRegenerateDocument,
  adminUpdateDocumentFormData,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function AdminDocumentRow({
  documentId,
  title,
  userEmail,
  slug,
  fileName,
  formDataJson,
}: {
  documentId: string;
  title: string;
  userEmail: string;
  slug: string;
  fileName: string;
  formDataJson: string;
}) {
  const [json, setJson] = useState(formDataJson);
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function saveJson() {
    setLoading("save");
    setMessage(null);
    const result = await adminUpdateDocumentFormData(documentId, json);
    setMessage(result.ok ? "Données enregistrées" : result.error ?? "Erreur");
    setLoading(null);
  }

  async function regenerate() {
    setLoading("pdf");
    setMessage(null);
    const result = await adminRegenerateDocument(documentId);
    if (result.ok) {
      setMessage(
        `PDF regénéré : ${result.fileName}${result.withWatermark ? " (filigrane)" : ""}`,
      );
    } else {
      setMessage(result.error ?? "Erreur");
    }
    setLoading(null);
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">
            {userEmail} · {slug} · {fileName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!!loading}
            onClick={saveJson}
          >
            {loading === "save" ? "…" : "Sauver JSON"}
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={!!loading}
            onClick={regenerate}
          >
            {loading === "pdf" ? "…" : "Regénérer PDF"}
          </Button>
          <a
            href={`/api/admin/documents/${documentId}/download`}
            className="inline-flex h-8 items-center justify-center rounded-lg border bg-secondary px-3 text-sm font-medium"
            target="_blank"
            rel="noreferrer"
          >
            Télécharger
          </a>
        </div>
      </div>
      <textarea
        className="mt-3 min-h-24 w-full rounded-md border bg-muted/30 p-2 font-mono text-xs"
        value={json}
        onChange={(e) => setJson(e.target.value)}
        spellCheck={false}
      />
      {message ? (
        <p className="mt-2 text-xs text-muted-foreground">{message}</p>
      ) : null}
    </div>
  );
}
