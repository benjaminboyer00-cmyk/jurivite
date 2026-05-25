"use client";

import { useState } from "react";
import { Copy, Key, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ApiKeyRow = {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
};

export function ApiKeyPanel({ initialKeys }: { initialKeys: ApiKeyRow[] }) {
  const [keys, setKeys] = useState(initialKeys);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createKey() {
    setLoading(true);
    try {
      const res = await fetch("/api/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Clé API" }),
      });
      const data = (await res.json()) as {
        apiKey?: string;
        id?: string;
        name?: string;
        keyPrefix?: string;
        createdAt?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Erreur");

      if (data.apiKey) setNewKey(data.apiKey);
      if (data.id && data.keyPrefix && data.createdAt) {
        setKeys((k) => [
          {
            id: data.id!,
            name: data.name ?? "Clé API",
            keyPrefix: data.keyPrefix!,
            createdAt: data.createdAt!,
            lastUsedAt: null,
          },
          ...k,
        ]);
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  function copyKey() {
    if (newKey) {
      void navigator.clipboard.writeText(newKey);
      alert("Clé copiée dans le presse-papiers");
    }
  }

  return (
    <Card className="mt-8 border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="size-5" />
          Clé API
        </CardTitle>
        <CardDescription>
          Intégrez JuriVite dans vos outils. Endpoint :{" "}
          <code className="text-xs">POST /api/v1/generate-pdf</code> avec{" "}
          <code className="text-xs">Authorization: Bearer votre_clé</code>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {newKey && (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
            <p className="text-sm font-medium text-amber-950 dark:text-amber-100">
              Copiez cette clé maintenant — elle ne sera plus affichée.
            </p>
            <div className="mt-2 flex gap-2">
              <Input readOnly value={newKey} className="font-mono text-xs" />
              <Button type="button" variant="outline" size="icon" onClick={copyKey}>
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
        )}

        <Button onClick={createKey} disabled={loading}>
          <Plus className="size-4" />
          {loading ? "Création…" : "Générer une nouvelle clé"}
        </Button>

        {keys.length > 0 && (
          <ul className="space-y-2 text-sm">
            {keys.map((k) => (
              <li
                key={k.id}
                className="flex justify-between rounded-md border px-3 py-2"
              >
                <span>
                  {k.name} — <code>{k.keyPrefix}…</code>
                </span>
                <span className="text-muted-foreground">
                  {k.lastUsedAt
                    ? `Utilisée ${new Date(k.lastUsedAt).toLocaleDateString("fr-FR")}`
                    : "Jamais utilisée"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
