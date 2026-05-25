import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";

import { CheckoutButton } from "@/components/auth/checkout-button";
import { DocumentDownloadButton } from "@/components/auth/document-download-button";
import { auth, signOut } from "@/auth";
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
import { getUserDocuments } from "@/lib/db/documents";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Mon tableau de bord",
  description: "Historique de vos documents juridiques générés avec JuriVite.",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const docs = await getUserDocuments(session.user.id);
  const isPro = session.user.plan === "pro";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {params.checkout === "success" && (
        <p className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Paiement réussi. Votre compte Pro sera actif sous quelques secondes.
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="mt-1 text-muted-foreground">{session.user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isPro ? "default" : "secondary"}>
            {isPro ? "Pro" : "Gratuit"}
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

      {!isPro && (
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle>Passez Pro</CardTitle>
            <CardDescription>
              PDF sans filigrane, historique illimité — 9 €/mois, résiliable à
              tout moment via Stripe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutButton />
          </CardContent>
        </Card>
      )}

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Mes documents</h2>
          <ButtonLink href="/#documents" size="sm" variant="outline">
            Nouveau document
          </ButtonLink>
        </div>

        {docs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="mx-auto mb-4 size-10 opacity-50" />
              <p>Aucun document généré pour le moment.</p>
              <ButtonLink href="/generate/cgv" className="mt-4">
                Créer mes CGV
              </ButtonLink>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {docs.map((doc) => (
              <li key={doc.id}>
                <Card>
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
                        {doc.hasWatermark ? " · Filigrane" : " · Pro"}
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

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/tarifs" className="hover:text-foreground">
          Voir les tarifs
        </Link>
      </p>
    </div>
  );
}
