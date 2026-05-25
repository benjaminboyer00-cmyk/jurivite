"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/fields/form-field";
import { Input } from "@/components/ui/input";

export function AccountPasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const { update } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: hasPassword ? currentPassword : undefined,
          newPassword,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erreur");

      setMessage(
        hasPassword
          ? "Mot de passe mis à jour."
          : "Mot de passe défini — vous pouvez vous connecter avec e-mail + mot de passe.",
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      await update();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" title="Erreur">
          {error}
        </Alert>
      )}
      {message && (
        <Alert variant="success" title="Succès">
          {message}
        </Alert>
      )}

      {hasPassword && (
        <FormField id="current" label="Mot de passe actuel">
          <Input
            id="current"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </FormField>
      )}

      <FormField id="new" label={hasPassword ? "Nouveau mot de passe" : "Mot de passe"}>
        <Input
          id="new"
          type="password"
          autoComplete="new-password"
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </FormField>

      <FormField id="confirm" label="Confirmer le mot de passe">
        <Input
          id="confirm"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </FormField>

      <p className="text-xs text-muted-foreground">
        8 caractères minimum, au moins une lettre et un chiffre.
      </p>

      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : null}
        {hasPassword ? "Modifier le mot de passe" : "Définir un mot de passe"}
      </Button>
    </form>
  );
}
