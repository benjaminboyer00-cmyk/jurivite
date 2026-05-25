import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";

import { CheckoutButton } from "@/components/auth/checkout-button";
import { DocumentDownloadButton } from "@/components/auth/document-download-button";
import { AccountPrivacyPanel } from "@/components/dashboard/account-privacy-panel";
import { ApiKeyPanel } from "@/components/dashboard/api-key-panel";
import { Alert } from "@/components/ui/alert";
import { ProgressBar } from "@/components/ui/progress-bar";
import { eq } from "drizzle-orm";

import { auth, signOut } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { listApiKeys } from "@/lib/db/api-keys";
import { countMonthlyPdfGenerations } from "@/lib/db/usage";
import { getUserDocuments } from "@/lib/db/documents";
import { PLAN_LIMITS, type Plan } from "@/lib/plans";
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
  searchParams: Promise<{ checkout?: string; plan?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const plan = session.user.plan;
  const docs = await getUserDocuments(session.user.id);
  const usedThisMonth = await countMonthlyPdfGenerations(session.user.id);
  const limit = PLAN_LIMITS[plan].pdfPerMonth;

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
    <div className="page-container max-w-4xl py-10 sm:py-14">
      {params.checkout === "success" && (
        <Alert variant="success" title="Paiement confirmé" className="mb-6">
          Plan{" "}
          <strong>{params.plan === "business" ? "Business" : "Pro"}</strong> — activation
          en cours (quelques secondes).
        </Alert>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="mt-1 text-muted-foreground">{session.user.email}</p>
        </div>
        <div className="flex items-center gap-3">
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

      {plan === "pro" && limit !== null && (
        <Card className="mt-6">
          <CardContent className="space-y-3 py-5">
            <ProgressBar
              value={usedThisMonth}
              max={limit}
              label="PDF sans filigrane ce mois"
            />
            {usedThisMonth >= limit && (
              <Alert variant="warning" title="Quota atteint">
                Passez Business pour des PDF illimités et l&apos;API REST.
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {plan === "business" && (
        <Card className="mt-6">
          <CardContent className="py-4 text-sm">
            <span className="font-medium">Générations ce mois :</span>{" "}
            {usedThisMonth} — <span className="text-primary">illimité</span>
          </CardContent>
        </Card>
      )}

      {plan === "free" && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle>Pro — 9 €/mois</CardTitle>
              <CardDescription>
                20 PDF/mois sans filigrane
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutButton plan="pro" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Business — 30 €/mois</CardTitle>
              <CardDescription>Illimité + clé API</CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutButton plan="business" />
            </CardContent>
          </Card>
        </div>
      )}

      {plan === "pro" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Besoin de plus ?</CardTitle>
            <CardDescription>
              Business : PDF illimités et intégration API pour votre équipe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutButton plan="business" />
          </CardContent>
        </Card>
      )}

      {plan === "business" && <ApiKeyPanel initialKeys={apiKeys} />}

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Mes documents</h2>
          <ButtonLink href="/#documents" size="sm" variant="outline">
            Nouveau document
          </ButtonLink>
        </div>

        {docs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
                <FileText className="size-7 text-muted-foreground" aria-hidden />
              </span>
              <p className="mt-4 font-medium">Aucun document pour le moment</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Générez un PDF connecté à votre compte — il apparaîtra ici pour
                retéléchargement.
              </p>
              <ButtonLink href="/generate/cgv" className="mt-6">
                Créer mes CGV
              </ButtonLink>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {docs.map((doc) => (
              <li key={doc.id}>
                <Card className="transition-colors hover:border-primary/25">
                  <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(doc.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {doc.hasWatermark ? " · Filigrane" : ` · ${planBadgeLabel(plan)}`}
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
