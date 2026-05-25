"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2, Mail } from "lucide-react";

import { safeCallbackUrl } from "@/lib/auth/safe-redirect";
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

const ERROR_MESSAGES: Record<string, string> = {
  OAuthAccountNotLinked:
    "Cet e-mail est déjà enregistré avec un autre mode de connexion. Utilisez le mot de passe ou le lien magique associé à ce compte.",
  EmailAlreadyRegistered:
    "Un compte existe déjà avec cet e-mail. Connectez-vous avec votre mot de passe.",
  CredentialsSignin: "E-mail ou mot de passe incorrect.",
  Default: "Connexion impossible. Réessayez.",
};

export function LoginForm({
  showGoogle = false,
  showEmail = false,
  callbackUrl: callbackUrlProp,
}: {
  showGoogle?: boolean;
  showEmail?: boolean;
  callbackUrl?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorCode = searchParams.get("error");
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const siteOrigin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  const callbackUrl = safeCallbackUrl(
    callbackUrlProp ?? searchParams.get("callbackUrl"),
    siteOrigin,
  );

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

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setLoading("register");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Inscription impossible");

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setFormError(ERROR_MESSAGES.CredentialsSignin);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(null);
    }
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setLoading("password");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setFormError(ERROR_MESSAGES.CredentialsSignin);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading("email");
    await signIn("resend", { email, callbackUrl });
    setLoading(null);
  }

  const authError =
    errorCode && ERROR_MESSAGES[errorCode]
      ? ERROR_MESSAGES[errorCode]
      : errorCode
        ? ERROR_MESSAGES.Default
        : null;

  return (
    <Card className="w-full max-w-md border-border/80 shadow-md">
      <CardHeader className="text-center sm:text-left">
        <CardTitle className="text-2xl">
          {mode === "register" ? "Créer un compte" : "Connexion"}
        </CardTitle>
        <CardDescription>
          Un e-mail = un compte. Historique, abonnements Pro / Business.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {(authError || formError) && (
          <Alert variant="destructive" title="Erreur">
            {formError ?? authError}
          </Alert>
        )}

        <div className="flex rounded-lg border p-1 text-sm">
          <button
            type="button"
            className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
              mode === "login" ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => setMode("login")}
          >
            Connexion
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
              mode === "register" ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => setMode("register")}
          >
            Inscription
          </button>
        </div>

        {showGoogle && mode === "login" && (
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full"
            disabled={!!loading}
            onClick={() => {
              setLoading("google");
              void signIn("google", { callbackUrl });
            }}
          >
            {loading === "google" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}
            {loading === "google" ? "Redirection…" : "Continuer avec Google"}
          </Button>
        )}

        {mode === "register" ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <FormField id="name" label="Nom (optionnel)">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </FormField>
            <FormField id="reg-email" label="E-mail">
              <Input
                id="reg-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
            <FormField
              id="reg-password"
              label="Mot de passe"
              hint="8 caractères min., lettre + chiffre"
            >
              <Input
                id="reg-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>
            <Button type="submit" className="h-11 w-full" disabled={!!loading}>
              {loading === "register" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              Créer mon compte
            </Button>
          </form>
        ) : (
          <>
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <FormField id="email" label="E-mail">
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>
              <FormField id="password" label="Mot de passe">
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormField>
              <Button type="submit" className="h-11 w-full" disabled={!!loading}>
                {loading === "password" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                Se connecter
              </Button>
            </form>

            {showEmail && (
              <>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center" aria-hidden>
                    <span className="w-full border-t" />
                  </div>
                  <p className="relative mx-auto w-fit bg-card px-3 text-xs text-muted-foreground">
                    ou lien magique (sans mot de passe)
                  </p>
                </div>
                <form onSubmit={handleMagicLink} className="space-y-3">
                  <Button
                    type="submit"
                    variant="outline"
                    className="h-11 w-full"
                    disabled={!!loading || !email}
                  >
                    {loading === "email" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Mail className="size-4" />
                    )}
                    Recevoir un lien par e-mail
                  </Button>
                </form>
              </>
            )}
          </>
        )}

        <p className="text-center text-xs text-muted-foreground">
          En vous connectant, vous acceptez nos{" "}
          <Link href="/cgu" className="text-primary underline">
            CGU
          </Link>{" "}
          et notre{" "}
          <Link href="/confidentialite" className="text-primary underline">
            politique de confidentialité
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
