"use client";

import { useState } from "react";

import { adminSetUserPlan } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/plans";

export function AdminUserRow({
  userId,
  email,
  plan,
}: {
  userId: string;
  email: string;
  plan: Plan;
}) {
  const [selected, setSelected] = useState<Plan>(plan);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setLoading(true);
    setMessage(null);
    const result = await adminSetUserPlan(userId, selected);
    setMessage(result.ok ? "Plan mis à jour" : result.error ?? "Erreur");
    setLoading(false);
  }

  return (
    <tr className="border-b">
      <td className="py-3 pr-4 text-sm">{email}</td>
      <td className="py-3 pr-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value as Plan)}
          className="rounded-md border px-2 py-1 text-sm"
        >
          <option value="free">free</option>
          <option value="pro">pro</option>
          <option value="business">business</option>
        </select>
      </td>
      <td className="py-3">
        <Button type="button" size="sm" variant="outline" disabled={loading} onClick={save}>
          {loading ? "…" : "Appliquer"}
        </Button>
        {message ? (
          <span className="ml-2 text-xs text-muted-foreground">{message}</span>
        ) : null}
      </td>
    </tr>
  );
}
