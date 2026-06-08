"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SendSignButtonProps = {
  documentId: string;
  defaultClientName?: string;
  label?: string;
};

export function SendSignButton({
  documentId,
  defaultClientName = "",
  label = "Envoyer à signer",
}: SendSignButtonProps) {
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState(defaultClientName);
  const [clientEmail, setClientEmail] = useState("");
  const [signingUrl, setSigningUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleCreateLink() {
    if (clientName.trim().length < 2) {
      setError("Indiquez le nom du signataire client.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/documents/${documentId}/send-sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        signingUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.signingUrl) {
        throw new Error(data.error ?? "Impossible de créer le lien");
      }
      setSigningUrl(data.signingUrl);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!signingUrl) return;
    await navigator.clipboard.writeText(signingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!open) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-11 w-full shrink-0 sm:h-8 sm:w-auto"
        onClick={() => setOpen(true)}
      >
        <Link2 className="size-4" />
        {label}
      </Button>
    );
  }

  return (
    <div className="w-full space-y-3 rounded-md border bg-muted/30 p-3 sm:min-w-[280px]">
      {!signingUrl ? (
        <>
          <div className="space-y-1">
            <Label htmlFor={`client-${documentId}`}>Nom du client</Label>
            <Input
              id={`client-${documentId}`}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Société Dupont ou M. Martin"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`email-${documentId}`}>E-mail (optionnel)</Label>
            <Input
              id={`email-${documentId}`}
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="client@exemple.fr"
            />
          </div>
          {error ? (
            <p className="text-xs text-destructive">{error}</p>
          ) : null}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleCreateLink}
              disabled={loading}
              className="flex-1"
            >
              {loading ? "…" : "Générer le lien"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Fermer
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            Envoyez ce lien à votre client (valide 30 jours) :
          </p>
          <div className="flex gap-2">
            <Input readOnly value={signingUrl} className="text-xs" />
            <Button size="sm" variant="outline" onClick={copyLink}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setOpen(false);
              setSigningUrl(null);
            }}
          >
            Fermer
          </Button>
        </>
      )}
    </div>
  );
}
