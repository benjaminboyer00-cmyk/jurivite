import { FileText, Receipt } from "lucide-react";
import Link from "next/link";

import { DocumentDownloadButton } from "@/components/auth/document-download-button";
import { SendSignButton } from "@/components/signing/send-sign-button";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import type { documents, signingRequests } from "@/db/schema";
import {
  isSignableDocumentSlug,
  isSignatureHubSlug,
} from "@/lib/signing/constants";

type Doc = typeof documents.$inferSelect;
type SigningRow = typeof signingRequests.$inferSelect;

function signingStatusLabel(status: SigningRow["status"] | undefined) {
  switch (status) {
    case "pending":
      return { label: "Lien actif", variant: "secondary" as const };
    case "signed":
      return { label: "Signé", variant: "default" as const };
    default:
      return null;
  }
}

function DocumentRow({
  doc,
  signing,
  showSignActions,
}: {
  doc: Doc;
  signing?: SigningRow;
  showSignActions?: boolean;
}) {
  const formData = doc.formData as Record<string, unknown>;
  const clientSigned = Boolean(formData.hasClientSignature);
  const status = clientSigned
    ? { label: "Signé (PDF à jour)", variant: "default" as const }
    : signingStatusLabel(signing?.status);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{doc.title}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
            {doc.hasWatermark ? " · Filigrane" : " · Sans filigrane"}
          </p>
          {status ? (
            <Badge variant={status.variant} className="mt-2">
              {status.label}
            </Badge>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
          {showSignActions ? (
            <SendSignButton
              documentId={doc.id}
              defaultClientName={String(formData.clientName ?? "")}
            />
          ) : null}
          <DocumentDownloadButton documentId={doc.id} fileName={doc.fileName} />
        </div>
      </CardContent>
    </Card>
  );
}

function EmptySection({
  icon: Icon,
  title,
  description,
  href,
  cta,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center py-10 text-center">
        <Icon className="size-10 text-muted-foreground/50" />
        <p className="mt-3 font-medium">{title}</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
        <ButtonLink href={href} className="mt-4" size="sm">
          {cta}
        </ButtonLink>
      </CardContent>
    </Card>
  );
}

export function DashboardDocuments({
  docs,
  signingByDocumentId,
}: {
  docs: Doc[];
  signingByDocumentId: Map<string, SigningRow>;
}) {
  const archiveDocs = docs.filter((d) => !isSignatureHubSlug(d.slug));
  const devis = archiveDocs.filter((d) => d.slug === "devis");
  const invoices = archiveDocs.filter((d) => d.slug === "facture");
  const others = archiveDocs.filter(
    (d) => d.slug !== "devis" && d.slug !== "facture",
  );

  if (docs.length === 0) {
    return (
      <EmptySection
        icon={FileText}
        title="Aucun document pour l'instant"
        description="Générez votre premier PDF depuis le catalogue."
        href="/generate/contrat-prestation"
        cta="Créer un document"
      />
    );
  }

  return (
    <div className="space-y-10">
      <p className="rounded-lg border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
        Les <strong className="text-foreground">contrats</strong> et leur suivi
        de signature sont dans{" "}
        <Link href="/dashboard/signatures" className="font-medium text-primary hover:underline">
          Signatures
        </Link>
        .
      </p>

      {devis.length > 0 ? (
        <section>
          <h3 className="mb-4 text-base font-semibold">Devis</h3>
          <ul className="space-y-3">
            {devis.map((doc) => (
              <li key={doc.id}>
                <DocumentRow
                  doc={doc}
                  signing={signingByDocumentId.get(doc.id)}
                  showSignActions={isSignableDocumentSlug(doc.slug)}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h3 className="mb-4 text-base font-semibold">Factures</h3>
        {invoices.length === 0 ? (
          <EmptySection
            icon={Receipt}
            title="Aucune facture"
            description="Générez une facture depuis le catalogue."
            href="/generate/facture"
            cta="Créer une facture"
          />
        ) : (
          <ul className="space-y-3">
            {invoices.map((doc) => (
              <li key={doc.id}>
                <DocumentRow doc={doc} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {others.length > 0 ? (
        <section>
          <h3 className="mb-4 text-base font-semibold">Autres documents</h3>
          <ul className="space-y-3">
            {others.map((doc) => (
              <li key={doc.id}>
                <DocumentRow doc={doc} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
