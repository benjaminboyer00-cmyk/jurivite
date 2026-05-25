import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Scale } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { createMetadata, siteConfig } from "@/lib/seo";
import { safeCallbackUrl } from "@/lib/auth/safe-redirect";

export const metadata: Metadata = createMetadata({
  title: "Connexion",
  description:
    "Connectez-vous à JuriVite pour sauvegarder et retélécharger vos documents juridiques.",
  path: "/login",
  noIndex: true,
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string; mode?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl, siteConfig.url);

  const showGoogle = !!(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );
  const showEmail = !!process.env.RESEND_API_KEY;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <Scale className="size-4 text-primary" aria-hidden />
        </span>
        Retour à JuriVite
      </Link>
      <Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse rounded-xl bg-muted" />}>
        <LoginForm
          showGoogle={showGoogle}
          showEmail={showEmail}
          callbackUrl={callbackUrl}
        />
      </Suspense>
      <p className="mt-6 max-w-sm text-center text-xs text-muted-foreground">
        Pas de compte requis pour générer un PDF. La connexion sert à l&apos;historique
        et aux abonnements Pro / Business.
      </p>
    </div>
  );
}
