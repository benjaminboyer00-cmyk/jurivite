import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { SessionPlanSync } from "@/components/auth/session-plan-sync";
import { CheckoutButton } from "@/components/auth/checkout-button";
import { OneShotCheckoutButton } from "@/components/auth/one-shot-checkout-button";
import { DashboardDocuments } from "@/components/dashboard/dashboard-documents";
import { Alert } from "@/components/ui/alert";
import { auth } from "@/auth";
import {
  getPackCreditsRemaining,
  listUserEntitlements,
} from "@/lib/db/entitlements";
import { countMonthlyPdfGenerations } from "@/lib/db/usage";
import { getUserDocuments } from "@/lib/db/documents";
import { listSigningRequestsForUser } from "@/lib/db/signing";
import {
  formatPriceEur,
  PLAN_LIMITS,
  PRICING,
  type Plan,
} from "@/lib/plans";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
import { juriviteLegal } from "@/lib/legal/jurivite-site";

export const metadata: Metadata = createMetadata({
  title: "Mes documents",
  description: "Historique de vos PDF générés : factures, CGV et autres documents.",
  path: "/dashboard/documents",
  noIndex: true,
});

export default async function DashboardDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string; product?: string }>;
}) {
  const session = await auth();
  if (!session?.user) return null;

  const params = await searchParams;
  const plan = session.user.plan;
  const docs = await getUserDocuments(session.user.id);
  const signingRows = await listSigningRequestsForUser(session.user.id);
  const signingByDocumentId = new Map<string, (typeof signingRows)[number]>();
  for (const row of signingRows) {
    if (!signingByDocumentId.has(row.documentId)) {
      signingByDocumentId.set(row.documentId, row);
    }
  }
  const usedThisMonth = await countMonthlyPdfGenerations(session.user.id);
  const packCredits = await getPackCreditsRemaining(session.user.id);
  const entitlements = await listUserEntitlements(session.user.id);

  return (
    <>
      <Suspense fallback={null}>
        <SessionPlanSync />
      </Suspense>

      {params.checkout === "success" && (
        <Alert variant="success" title="Paiement confirmé" className="mb-6">
          {params.product === "pack_essential" ? (
            <>
              Pack Essentiel activé — <strong>{packCredits}</strong> document(s)
              à débloquer depuis les générateurs.
            </>
          ) : params.product === "single_doc" ? (
            <>Document débloqué — régénérez-le sans filigrane.</>
          ) : (
            <>
              Abonnement <strong>Pro</strong> — activation en cours (quelques
              secondes).
            </>
          )}
        </Alert>
      )}

      {(plan === "pro" || plan === "business") && (
        <Card className="mb-6">
          <CardContent className="py-4 text-sm">
            <span className="font-medium">Générations ce mois :</span>{" "}
            {usedThisMonth} —{" "}
            <span className="text-primary">PDF illimités sans filigrane</span>
          </CardContent>
        </Card>
      )}

      {plan === "free" && (packCredits > 0 || entitlements.length > 0) && (
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">Vos achats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {packCredits > 0 ? (
              <p>
                Pack Essentiel : <strong>{packCredits}</strong> crédit(s)
                document restant(s).
              </p>
            ) : null}
            {entitlements.length > 0 ? (
              <p>
                Documents débloqués :{" "}
                {[...new Set(entitlements.map((e) => e.slug))].join(", ")}
              </p>
            ) : null}
          </CardContent>
        </Card>
      )}

      {plan === "free" && (
        <div className="mb-8 grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">À l&apos;unité</CardTitle>
              <CardDescription>
                {formatPriceEur(PRICING.singleDoc)} — 1 document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ButtonLink href="/#documents" variant="outline" className="w-full">
                Choisir un document
              </ButtonLink>
            </CardContent>
          </Card>
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-base">Pack Essentiel</CardTitle>
              <CardDescription>
                {formatPriceEur(PRICING.packEssential)} — 3 documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OneShotCheckoutButton product="pack_essential" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pro</CardTitle>
              <CardDescription>
                {formatPriceEur(PRICING.proMonthly)}/mois — illimité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutButton />
            </CardContent>
          </Card>
        </div>
      )}

      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">Archives PDF</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Factures, devis, CGV et autres documents. Les contrats à faire
              signer sont dans{" "}
              <Link href="/dashboard/signatures" className="text-primary hover:underline">
                Signatures
              </Link>
              .
            </p>
          </div>
          <ButtonLink href="/#documents" size="sm" variant="outline">
            Nouveau document
          </ButtonLink>
        </div>

        <DashboardDocuments
          docs={docs}
          signingByDocumentId={signingByDocumentId}
        />
      </section>

      {plan === "free" && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Business (API, volume) :{" "}
          <Link
            href={`mailto:${juriviteLegal.email}?subject=JuriVite%20Business`}
            className="text-primary underline"
          >
            contactez-nous
          </Link>
        </p>
      )}
    </>
  );
}
