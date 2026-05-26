"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { NicheSearch } from "@/components/marketing/niche-search";
import { getCgvNiche, getCgvNichePath } from "@/lib/documents/niches-seo";

function CgvNichePickerInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const metier = searchParams.get("metier");
  const niche = metier ? getCgvNiche(metier) : undefined;

  if (niche) {
    return (
      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm">
          <p className="font-medium text-foreground">
            Modèle actif : {niche.profession}
          </p>
          <p className="mt-1 text-muted-foreground">
            {niche.industrySpecificClauses.length} clause(s) métier seront ajoutées au
            PDF.{" "}
            <Link href={niche.path} className="text-primary hover:underline">
              Voir la fiche
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/generate/cgv")}
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          Changer de métier
        </button>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="cgv-niche-search-heading"
      className="mb-8 rounded-xl border bg-muted/30 p-4 sm:p-5"
    >
      <h2 id="cgv-niche-search-heading" className="text-base font-semibold">
        Choisissez votre métier
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Le formulaire se préremplit et les clauses adaptées à votre activité sont
        injectées dans le PDF.
      </p>
      <NicheSearch
        label=""
        directToGenerate
        submitLabel="Appliquer ce modèle"
        compactFooter
        className="mt-4 [&_label]:sr-only"
      />
    </section>
  );
}

export function CgvNichePicker() {
  return (
    <Suspense
      fallback={
        <div className="mb-8 h-28 animate-pulse rounded-xl border bg-muted/40" />
      }
    >
      <CgvNichePickerInner />
    </Suspense>
  );
}
