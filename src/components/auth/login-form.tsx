"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/fields/form-field";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm({
  showGoogle = false,
  showEmail = false,
}: {
  showGoogle?: boolean;
  showEmail?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  if (!showGoogle && !showEmail) {
    return (
      <Card className="w-full max-w-md border-border/80 shadow-md">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Configure <code className="text-xs">RESEND_API_KEY</code> ou{" "}
            <code className="text-xs">GOOGLE_CLIENT_*</code> dans{" "}
            <code className="text-xs">.env.local</code> pour activer la
            connexion. Voir SETUP.md.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="info" title="Mode démo">
            Le générateur PDF fonctionne sans connexion — créez vos documents
            directement depuis l&apos;accueil.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading("email");
    await signIn("resend", { email, callbackUrl: "/dashboard" });
    setLoading(null);
  }

  return (
    <Card className="w-full max-w-md border-border/80 shadow-md">
      <CardHeader className="text-center sm:text-left">
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Historique de documents, PDF sans filigrane et clés API.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showGoogle && (
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full"
            disabled={!!loading}
            onClick={() => {
              setLoading("google");
              void signIn("google", { callbackUrl: "/dashboard" });
            }}
          >
            {loading === "google" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}
            {loading === "google" ? "Redirection…" : "Continuer avec Google"}
          </Button>
        )}

        {showGoogle && showEmail && (
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <span className="w-full border-t" />
            </div>
            <p className="relative mx-auto w-fit bg-card px-3 text-xs text-muted-foreground">
              ou par e-mail
            </p>
          </div>
        )}

        {showEmail && (
          <form onSubmit={handleEmail} className="space-y-4">
            <FormField id="email" label="E-mail professionnel">
              <Input
                id="email"
                type="email"
                required
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.fr"
              />
            </FormField>
            <Button type="submit" className="h-11 w-full" disabled={!!loading}>
              {loading === "email" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Mail className="size-4" />
              )}
              {loading === "email" ? "Envoi en cours…" : "Recevoir un lien magique"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
