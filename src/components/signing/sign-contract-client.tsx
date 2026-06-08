"use client";

import { useState } from "react";
import { CheckCircle2, FileSignature } from "lucide-react";

import { SignaturePad } from "@/components/signing/signature-pad";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type SignPageInfo = {
  status: string;
  clientName: string;
  documentTitle: string;
  companyName: string;
  expiresAt: string;
  signedAt: string | null;
};

type SignContractClientProps = {
  token: string;
  initialInfo: SignPageInfo | null;
  initialError: string | null;
};

export function SignContractClient({
  token,
  initialInfo,
  initialError,
}: SignContractClientProps) {
  const [info] = useState(initialInfo);
  const [error] = useState(initialError);
  const [signature, setSignature] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(
    initialInfo?.status === "signed" || false,
  );

  async function handleSubmit() {
    if (!signature) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/sign/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signatureDataUrl: signature }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Signature refusée");
      setDone(true);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  }

  if (error && !info) {
    return (
      <div className="page-container max-w-lg py-16">
        <Alert variant="destructive" title="Lien indisponible">
          {error}
        </Alert>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="page-container max-w-lg py-16 text-center text-muted-foreground">
        Lien introuvable.
      </div>
    );
  }

  const expired = info.status === "expired";
  const cancelled = info.status === "cancelled";

  return (
    <div className="page-container max-w-lg py-10 sm:py-16">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <FileSignature className="size-6" />
            <CardTitle>Signature du document</CardTitle>
          </div>
          <CardDescription>
            {info.companyName} vous invite à signer :{" "}
            <strong>{info.documentTitle}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {done || info.status === "signed" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="size-12 text-green-600" />
              <p className="font-medium">Document signé avec succès</p>
              <p className="text-sm text-muted-foreground">
                Merci {info.clientName}. Le prestataire pourra télécharger la
                version signée depuis son espace Signatures.
              </p>
            </div>
          ) : expired || cancelled ? (
            <Alert variant="destructive" title="Lien expiré">
              Ce lien de signature n&apos;est plus valide. Demandez un nouveau
              lien à {info.companyName}.
            </Alert>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Signataire : <strong>{info.clientName}</strong>
                <br />
                Valide jusqu&apos;au{" "}
                {new Date(info.expiresAt).toLocaleDateString("fr-FR")}
              </p>
              <div>
                <p className="mb-2 text-sm font-medium">
                  Dessinez votre signature ci-dessous
                </p>
                <SignaturePad onChange={setSignature} disabled={submitting} />
              </div>
              <p className="text-xs text-muted-foreground">
                En signant, vous confirmez avoir lu le document et acceptez les
                conditions qui y figurent (signature électronique simple).
              </p>
              <Button
                className="w-full"
                disabled={!signature || submitting}
                onClick={handleSubmit}
              >
                {submitting ? "Enregistrement…" : "Valider ma signature"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
