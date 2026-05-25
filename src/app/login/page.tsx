import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Connexion",
  description:
    "Connectez-vous à JuriVite pour sauvegarder et retélécharger vos documents juridiques.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
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
      <LoginForm showGoogle={showGoogle} showEmail={showEmail} />
      <p className="mt-6 max-w-sm text-center text-xs text-muted-foreground">
        Pas de compte requis pour générer un PDF. La connexion sert à l&apos;historique
        et aux abonnements Pro / Business.
      </p>
    </div>
  );
}
