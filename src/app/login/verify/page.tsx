import type { Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Vérifiez votre e-mail",
  description: "Un lien de connexion vous a été envoyé.",
  path: "/login/verify",
  noIndex: true,
});

export default function VerifyRequestPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-bold">Vérifiez votre boîte mail</h1>
      <p className="mt-4 text-muted-foreground">
        Un lien de connexion vous a été envoyé. Cliquez dessus pour accéder à
        votre tableau de bord.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm text-primary hover:underline">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
