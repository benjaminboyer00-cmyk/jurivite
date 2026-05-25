"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/fields/form-field";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading("email");
    await signIn("resend", { email, callbackUrl: "/dashboard" });
    setLoading(null);
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>
          Accédez à votre historique de documents et passez Pro.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={!!loading}
          onClick={() => {
            setLoading("google");
            void signIn("google", { callbackUrl: "/dashboard" });
          }}
        >
          {loading === "google" ? "Redirection…" : "Continuer avec Google"}
        </Button>

        <div className="relative text-center text-xs text-muted-foreground">
          <span className="bg-card px-2">ou par e-mail</span>
        </div>

        <form onSubmit={handleEmail} className="space-y-4">
          <FormField id="email" label="E-mail">
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.fr"
            />
          </FormField>
          <Button type="submit" className="w-full" disabled={!!loading}>
            {loading === "email" ? "Envoi…" : "Recevoir un lien magique"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
