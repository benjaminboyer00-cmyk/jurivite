import type { Metadata } from "next";

import { SignContractClient } from "@/components/signing/sign-contract-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Signer un document",
  description: "Signature électronique simple de votre contrat JuriVite.",
  path: "/sign",
  noIndex: true,
});

export default async function SignPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <SignContractClient token={token} />;
}
