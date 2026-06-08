"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Scale } from "lucide-react";

import {
  LEGAL_MODEL_DISCLAIMER,
  SERVICE_DISCLAIMER,
} from "@/lib/legal/jurivite-site";
import { cn } from "@/lib/utils";

/** Bandeau légal compact — déplié sur demande pour ne pas bloquer le formulaire. */
export function CollapsibleLegalDisclaimer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-primary/15 bg-primary/[0.03] text-sm">
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-primary/[0.05]"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Scale className="size-4 text-primary" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-medium text-foreground">
            Modèle automatique — pas un conseil juridique
          </span>
          {!open ? (
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Cliquez pour lire l&apos;avertissement avant génération
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="space-y-2 border-t border-primary/10 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          <p>{SERVICE_DISCLAIMER}</p>
          <p>{LEGAL_MODEL_DISCLAIMER}</p>
          <p>
            <Link href="/avis-juridique" className="font-medium text-primary hover:underline">
              Avis juridique complet
            </Link>
            {" · "}
            <Link href="/cgu" className="font-medium text-primary hover:underline">
              CGU
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}
