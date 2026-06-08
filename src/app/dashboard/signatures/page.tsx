import type { Metadata } from "next";

import { SignatureWorkspace } from "@/components/dashboard/signature-workspace";
import { auth } from "@/auth";
import { getUserDocuments } from "@/lib/db/documents";
import { listSigningRequestsForUser } from "@/lib/db/signing";
import { buildSignatureWorkspace } from "@/lib/signing/workspace";
import { siteConfig } from "@/lib/seo";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Signatures — espace contrats",
  description:
    "Suivez vos contrats en attente de signature, renvoyez un lien client et téléchargez les PDF signés.",
  path: "/dashboard/signatures",
  noIndex: true,
});

export default async function DashboardSignaturesPage() {
  const session = await auth();
  if (!session?.user) return null;

  const docs = await getUserDocuments(session.user.id);
  const signingRows = await listSigningRequestsForUser(session.user.id);
  const items = buildSignatureWorkspace(docs, signingRows, siteConfig.url);

  return (
    <section>
      <header className="mb-6">
        <h2 className="text-lg font-semibold sm:text-xl">Signatures & contrats</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Envoyez un lien à votre client, suivez l&apos;état (en attente, signé,
          expiré) et retéléchargez le PDF à jour — sans passer par la liste devis.
        </p>
      </header>
      <SignatureWorkspace items={items} />
    </section>
  );
}
