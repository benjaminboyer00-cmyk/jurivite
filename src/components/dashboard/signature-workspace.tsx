"use client";

import { useMemo, useState } from "react";
import { Check, Copy, FileSignature } from "lucide-react";

import { DocumentDownloadButton } from "@/components/auth/document-download-button";
import { SignatureStatsCards } from "@/components/dashboard/signature-stats-cards";
import { SignatureStatusBadge } from "@/components/dashboard/signature-status-badge";
import { SendSignButton } from "@/components/signing/send-sign-button";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import {
  computeSignatureStats,
  filterSignatureItems,
  type SignatureWorkspaceItem,
  type SignatureWorkspaceStatus,
} from "@/lib/signing/workspace";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all" as const, label: "Tous" },
  { id: "pending" as const, label: "En attente" },
  { id: "draft" as const, label: "À envoyer" },
  { id: "signed" as const, label: "Signés" },
  { id: "expired" as const, label: "Expirés" },
];

function CopySignLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={copy}>
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copié" : "Copier le lien"}
    </Button>
  );
}

function SignatureRow({ item }: { item: SignatureWorkspaceItem }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid gap-4 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-semibold">{item.clientName}</p>
              <SignatureStatusBadge status={item.status} />
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {item.slugLabel}
              </span>
            </div>
            <p className="truncate text-sm text-muted-foreground">{item.title}</p>
            <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {item.amount ? (
                <div>
                  <dt className="sr-only">Montant</dt>
                  <dd className="font-medium text-foreground">{item.amount}</dd>
                </div>
              ) : null}
              <div>
                <dt className="sr-only">Créé le</dt>
                <dd>
                  {item.documentCreatedAt.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </dd>
              </div>
              {item.signedAt ? (
                <div>
                  <dt className="sr-only">Signé le</dt>
                  <dd>
                    Signé le{" "}
                    {item.signedAt.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </dd>
                </div>
              ) : null}
              {item.expiresAt && item.status === "pending" ? (
                <div>
                  <dt className="sr-only">Expire le</dt>
                  <dd>
                    Lien jusqu&apos;au{" "}
                    {item.expiresAt.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </dd>
                </div>
              ) : null}
              {item.hasWatermark ? (
                <dd className="text-amber-700 dark:text-amber-300">Filigrane</dd>
              ) : null}
            </dl>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
            {item.signingUrl ? (
              <CopySignLinkButton url={item.signingUrl} />
            ) : null}
            {(item.status === "draft" ||
              item.status === "expired" ||
              item.status === "cancelled") && (
              <SendSignButton
                documentId={item.documentId}
                defaultClientName={item.clientName}
              />
            )}
            {item.status === "pending" ? (
              <SendSignButton
                documentId={item.documentId}
                defaultClientName={item.clientName}
                label="Nouveau lien"
              />
            ) : null}
            <DocumentDownloadButton
              documentId={item.documentId}
              fileName={item.fileName}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SignatureWorkspace({ items }: { items: SignatureWorkspaceItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const stats = useMemo(() => computeSignatureStats(items), [items]);
  const filtered = useMemo(
    () => filterSignatureItems(items, filter),
    [items, filter],
  );

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center py-14 text-center">
          <FileSignature className="size-12 text-muted-foreground/40" />
          <h2 className="mt-4 text-lg font-semibold">Aucun contrat pour l&apos;instant</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Créez un contrat de prestation, envoyez le lien à votre client et
            suivez la signature ici — comme un mini espace DevisPropre dédié aux
            contrats.
          </p>
          <ButtonLink href="/generate/contrat-prestation" className="mt-6">
            Créer un contrat
          </ButtonLink>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <SignatureStatsCards stats={stats} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((tab) => {
            const count =
              tab.id === "all"
                ? items.length
                : stats[tab.id as keyof typeof stats] ?? 0;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  filter === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
                <span className="ml-1.5 tabular-nums opacity-80">{count}</span>
              </button>
            );
          })}
        </div>
        <ButtonLink href="/generate/contrat-prestation" size="sm">
          Nouveau contrat
        </ButtonLink>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
          Aucun document dans cette catégorie.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((item) => (
            <li key={item.documentId}>
              <SignatureRow item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
