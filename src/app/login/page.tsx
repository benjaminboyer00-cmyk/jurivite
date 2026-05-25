import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Connexion",
  description: "Connectez-vous à JuriVite pour sauvegarder et retélécharger vos documents juridiques.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <LoginForm />
    </div>
  );
}
