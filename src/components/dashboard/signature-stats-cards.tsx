import {
  CheckCircle2,
  Clock,
  FilePenLine,
  TimerOff,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { SignatureWorkspaceStats } from "@/lib/signing/workspace";

export function SignatureStatsCards({ stats }: { stats: SignatureWorkspaceStats }) {
  const cards = [
    {
      label: "En attente",
      value: stats.pending,
      icon: Clock,
      className: "text-amber-700 dark:text-amber-300",
    },
    {
      label: "À envoyer",
      value: stats.draft,
      icon: FilePenLine,
      className: "text-blue-700 dark:text-blue-300",
    },
    {
      label: "Signés",
      value: stats.signed,
      icon: CheckCircle2,
      className: "text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Expirés",
      value: stats.expired,
      icon: TimerOff,
      className: "text-muted-foreground",
    },
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex items-center gap-3 py-4">
            <span
              className={`flex size-10 items-center justify-center rounded-xl bg-muted ${card.className}`}
            >
              <card.icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-2xl font-bold tabular-nums">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
