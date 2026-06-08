import { notFound } from "next/navigation";

import {
  SignContractClient,
  type SignPageInfo,
} from "@/components/signing/sign-contract-client";
import { getSigningRequestByToken } from "@/lib/db/signing";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Signer un document",
  description: "Signature électronique simple de votre contrat JuriVite.",
  path: "/sign",
  noIndex: true,
});

function toSignPageInfo(
  request: NonNullable<Awaited<ReturnType<typeof getSigningRequestByToken>>>,
): SignPageInfo {
  const formData = request.document.formData as Record<string, unknown>;
  return {
    status: request.status,
    clientName: request.clientName,
    documentTitle: request.document.title,
    companyName: String(formData.companyName ?? ""),
    expiresAt: request.expiresAt.toISOString(),
    signedAt: request.signedAt?.toISOString() ?? null,
  };
}

export default async function SignPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const request = await getSigningRequestByToken(token);

  if (!request) {
    return (
      <SignContractClient
        token={token}
        initialInfo={null}
        initialError="Lien introuvable ou invalide."
      />
    );
  }

  if (!request.document) {
    notFound();
  }

  return (
    <SignContractClient
      token={token}
      initialInfo={toSignPageInfo(request)}
      initialError={null}
    />
  );
}
