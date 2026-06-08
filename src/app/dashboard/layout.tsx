import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { PLAN_LIMITS, type Plan } from "@/lib/plans";

function planBadgeLabel(plan: Plan) {
  return PLAN_LIMITS[plan].label;
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard/signatures");

  const plan = session.user.plan;

  return (
    <div className="page-container max-w-5xl py-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary">Espace client</p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Tableau de bord
          </h1>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {session.user.email}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={plan === "free" ? "secondary" : "default"}>
            {planBadgeLabel(plan)}
          </Badge>
          <ButtonLink href="/generate/contrat-prestation" size="sm">
            Nouveau contrat
          </ButtonLink>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              Déconnexion
            </Button>
          </form>
        </div>
      </div>

      <DashboardNav />

      {children}
    </div>
  );
}
