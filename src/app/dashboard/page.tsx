import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FileText } from "lucide-react";
import { eq } from "drizzle-orm";

import { SessionPlanSync } from "@/components/auth/session-plan-sync";
import { CheckoutButton } from "@/components/auth/checkout-button";
import { OneShotCheckoutButton } from "@/components/auth/one-shot-checkout-button";
import { DocumentDownloadButton } from "@/components/auth/document-download-button";
import { AccountPrivacyPanel } from "@/components/dashboard/account-privacy-panel";
import { ApiKeyPanel } from "@/components/dashboard/api-key-panel";
import { Alert } from "@/components/ui/alert";
import { auth, signOut } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { listApiKeys } from "@/lib/db/api-keys";
import {
  getPackCreditsRemaining,
  listUserEntitlements,
} from "@/lib/db/entitlements";
import { countMonthlyPdfGenerations } from "@/lib/db/usage";
import { getUserDocuments } from "@/lib/db/documents";
import {
  formatPriceEur,
  PLAN_LIMITS,
  PRICING,
  type Plan,
} from "@/lib/plans";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  title: "Mon tableau de bord",
  description: "Historique de vos documents juridiques générés avec JuriVite.",
  path: "/dashboard",
  noIndex: true,
});

function planBadgeLabel(plan: Plan) {
  return PLAN_LIMITS[plan].label;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string; plan?: string; product?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const plan = session.user.plan;
  const docs = await getUserDocuments(session.user.id);
  const usedThisMonth = await countMonthlyPdfGenerations(session.user.id);
  const packCredits = await getPackCreditsRemaining(session.user.id);
  const entitlements = await listUserEntitlements(session.user.id);

  const dbUser = db
    ? await db.query.users.findFirst({
        where: eq(users.id, session.user.id),
      })
    : null;

  const apiKeys =
    plan === "business"
      ? (await listApiKeys(session.user.id)).map((k) => ({
          ...k,
          createdAt: k.createdAt.toISOString(),
          lastUsedAt: k.lastUsedAt?.toISOString() ?? null,
        }))
      : [];

  return (
    <div className="page-container max-w-4xl py-8 sm:py-14">
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Tableau de bord
          </h1>
          <p className="mt-1 truncate text-sm text-muted-foreground sm:text-base">
            {session.user.email}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <ButtonLink href="/dashboard/compte" variant="outline" size="sm">
            Mon compte
          </ButtonLink>
          <Badge variant={plan === "free" ? "secondary" : "default"}>
            {planBadgeLabel(plan)}
          </Badge>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              Déconnexion
            </Button>
          </form>
        </div>
      </div>

      {(plan === "pro" || plan === "business") && (
        <Card className="mt-6">
          <CardContent className="py-4 text-sm">
            <span className="font-medium">Générations ce mois :</span>{" "}
            {usedThisMonth} —{" "}
            <span className="text-primary">PDF illimités sans filigrane</span>
          </CardContent>
        </Card>
      )}

      {plan === "free" && (packCredits > 0 || entitlements.length > 0) && (
        <Card className="mt-6 border-primary/30 bg-primary/5">
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
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">À l&apos;unité</CardTitle>
              <CardDescription>
                {formatPriceEur(PRICING.singleDoc)} — 1 document, mises à jour à
                vie
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

      {plan === "business" && <ApiKeyPanel initialKeys={apiKeys} />}

      {plan === "free" && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Business (API, volume) :{" "}
          <Link
            href={`mailto:${juriviteLegal.email}?subject=JuriVite%20Business`}
            className="text-primary underline"
          >
            contactez-nous
          </Link>
        </p>
      )}

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">Mes documents</h2>
          <ButtonLink
            href="/#documents"
            size="sm"
            variant="outline"
            className="w-full sm:w-auto"
          >
            Nouveau document
          </ButtonLink>
        </div>

        {docs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center py-14 text-center">
              <FileText className="size-12 text-muted-foreground/50" />
              <p className="mt-4 font-medium">Aucun document pour l&apos;instant</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Générez votre premier PDF depuis le catalogue (CGV, mentions
                légales, etc.).
              </p>
              <ButtonLink href="/generate/cgv" className="mt-6">
                Créer des CGV
              </ButtonLink>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {docs.map((doc) => (
              <li key={doc.id}>
                <Card>
                  <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                        {doc.hasWatermark ? " · Filigrane" : " · Sans filigrane"}
                      </p>
                    </div>
                    <DocumentDownloadButton
                      documentId={doc.id}
                      fileName={doc.fileName}
                    />
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AccountPrivacyPanel
        hasStripeCustomer={Boolean(dbUser?.stripeCustomerId)}
      />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/tarifs" className="hover:text-foreground">
          Voir les tarifs
        </Link>
      </p>
    </div>
  );
}
