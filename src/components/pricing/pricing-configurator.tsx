"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import { documents, type DocumentSlug } from "@/lib/documents/registry";
import {
  formatPriceEur,
  ONE_SHOT_MARKETING_FEATURES,
  ONE_SHOT_PRODUCTS,
  PRICING,
} from "@/lib/plans";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const profiles = [
  { id: "freelance", label: "Freelance / indépendant" },
  { id: "agency", label: "Agence / studio" },
  { id: "tpe", label: "TPE / association" },
] as const;

type ProfileId = (typeof profiles)[number]["id"];

const profileHints: Record<ProfileId, string> = {
  freelance:
    "Souvent 1 à 2 documents à finaliser (CGV + mentions légales). Le pack ou l'unité suffit.",
  agency:
    "Plusieurs clients → abonnement Pro pour volume et mises à jour continues.",
  tpe: "Dossier complet au lancement : Pack Essentiel (3 docs) puis Pro si besoin récurrent.",
};

export function PricingConfigurator() {
  const [profile, setProfile] = useState<ProfileId>("freelance");
  const [slug, setSlug] = useState<DocumentSlug>("cgv");

  const doc = documents.find((d) => d.slug === slug)!;

  const recommendation = useMemo(() => {
    if (profile === "agency") {
      return {
        title: "Pro — abonnement",
        price: formatPriceEur(PRICING.proMonthly) + " / mois",
        reason: "PDF illimités, dashboard et mises à jour pour toute l'équipe.",
        href: "/tarifs#pro",
        cta: "Voir l'abonnement Pro",
      };
    }
    return {
      title: `Document à l'unité — ${doc.shortTitle}`,
      price: formatPriceEur(PRICING.singleDoc),
      reason:
        "Un besoin immédiat, sans engagement : payez une fois, mises à jour à vie sur ce document.",
      href: `/generate/${slug}`,
      cta: "Tester puis débloquer le PDF",
    };
  }, [profile, doc.shortTitle, slug]);

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <CardTitle>Quelle offre pour vous ?</CardTitle>
        <CardDescription>
          Choisissez votre profil et le document — nous vous suggérons l&apos;offre
          la plus adaptée (aperçu gratuit avec filigrane sur le générateur).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="profile">
              Votre profil
            </label>
            <select
              id="profile"
              value={profile}
              onChange={(e) => setProfile(e.target.value as ProfileId)}
              className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted-foreground">
              {profileHints[profile]}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="document">
              Document
            </label>
            <select
              id="document"
              value={slug}
              onChange={(e) => setSlug(e.target.value as DocumentSlug)}
              className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {documents.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <p className="text-sm font-medium text-primary">Recommandation</p>
          <p className="mt-2 text-lg font-bold">{recommendation.title}</p>
          <p className="text-2xl font-bold text-primary">{recommendation.price}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {recommendation.reason}
          </p>
          <ButtonLink href={recommendation.href} className="mt-4 gap-2">
            {recommendation.cta}
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
          <div>
            <p className="font-medium text-foreground">
              {ONE_SHOT_PRODUCTS.single_doc.label}
            </p>
            <ul className="mt-1 list-inside list-disc">
              {ONE_SHOT_MARKETING_FEATURES.single_doc.slice(0, 2).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground">
              {ONE_SHOT_PRODUCTS.pack_essential.label}
            </p>
            <ul className="mt-1 list-inside list-disc">
              {ONE_SHOT_MARKETING_FEATURES.pack_essential.slice(0, 2).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-xs">
          <Link href="/generate/cgv" className="text-primary underline">
            Essayer gratuitement
          </Link>{" "}
          — PDF avec filigrane, sans carte bancaire.
        </p>
      </CardContent>
    </Card>
  );
}
