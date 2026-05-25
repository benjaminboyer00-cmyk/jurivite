import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin/auth";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Administration",
  description: "Back-office JuriVite",
  path: "/admin",
  noIndex: true,
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gate = await requireAdmin();

  if (!gate.ok) {
    if (gate.reason === "unauthenticated") {
      redirect("/login?callbackUrl=%2Fadmin");
    }
    redirect("/");
  }

  return (
    <div className="page-container max-w-6xl py-10">
      <header className="mb-8 border-b pb-6">
        <p className="text-sm font-medium text-primary">Back-office</p>
        <h1 className="text-2xl font-bold tracking-tight">Administration JuriVite</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connecté : {gate.session.user.email}
        </p>
      </header>
      {children}
    </div>
  );
}
