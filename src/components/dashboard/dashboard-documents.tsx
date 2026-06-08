import { FileText, Receipt } from "lucide-react";

import { DocumentDownloadButton } from "@/components/auth/document-download-button";
import { SendSignButton } from "@/components/signing/send-sign-button";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import type { documents, signingRequests } from "@/db/schema";
import { isSignableDocumentSlug } from "@/lib/signing/constants";

type Doc = typeof documents.$inferSelect;
type SigningRow = typeof signingRequests.$inferSelect;

function signingStatusLabel(status: SigningRow["status"] | undefined) {
  switch (status) {
    case "pending":
      return { label: "En attente de signature", variant: "secondary" as const };
    case "signed":
      return { label: "Signé", variant: "default" as const };
    case "expired":
      return { label: "Lien expiré", variant: "outline" as const };
    case "cancelled":
      return { label: "Lien remplacé", variant: "outline" as const };
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
          <DocumentDownloadButton
            documentId={doc.id}
            fileName={doc.fileName}
          />
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
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
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
  const contracts = docs.filter((d) => isSignableDocumentSlug(d.slug));
  const invoices = docs.filter((d) => d.slug === "facture");
  const others = docs.filter(
    (d) => !isSignableDocumentSlug(d.slug) && d.slug !== "facture",
  );

  if (docs.length === 0) {
    return (
      <EmptySection
        icon={FileText}
        title="Aucun document pour l'instant"
        description="Générez votre premier PDF depuis le catalogue (CGV, contrat, facture…)."
        href="/generate/contrat-prestation"
        cta="Créer un contrat"
      />
    );
  }

  return (
    <div className="space-y-10">
      <section>
        <h3 className="mb-4 text-base font-semibold">Contrats & signatures</h3>
        {contracts.length === 0 ? (
          <EmptySection
            icon={FileText}
            title="Aucun contrat"
            description="Créez un contrat de prestation, puis envoyez-le à votre client par lien pour signature."
            href="/generate/contrat-prestation"
            cta="Créer un contrat"
          />
        ) : (
          <ul className="space-y-3">
            {contracts.map((doc) => (
              <li key={doc.id}>
                <DocumentRow
                  doc={doc}
                  signing={signingByDocumentId.get(doc.id)}
                  showSignActions
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="mb-4 text-base font-semibold">Factures</h3>
        {invoices.length === 0 ? (
          <EmptySection
            icon={Receipt}
            title="Aucune facture"
            description="Générez une facture depuis le catalogue pour la retrouver ici."
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
