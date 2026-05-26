import Link from "next/link";
import { Scale } from "lucide-react";

import { DISCLAIMER_FULL_TEXT, juriviteLegal } from "@/lib/legal/jurivite-site";

/** Bandeau transparence — accueil et pages clés */
export function LegalTrustStrip() {
  return (
    <section
      aria-labelledby="legal-trust-heading"
      className="border-y border-border/80 bg-muted/40"
    >
      <div className="page-container py-8 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary">
              <Scale className="size-5" aria-hidden />
              <h2 id="legal-trust-heading" className="text-lg font-semibold text-foreground">
                Transparence & responsabilité
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {DISCLAIMER_FULL_TEXT}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Éditeur : <strong className="text-foreground">{juriviteLegal.legalEntityName}</strong>{" "}
              ({juriviteLegal.tradeName}) —{" "}
              <Link href="/mentions-legales" className="text-primary hover:underline">
                identification complète (LCEN)
              </Link>
            </p>
          </div>
          <nav
            aria-label="Documents légaux du site"
            className="flex shrink-0 flex-col gap-2 sm:min-w-[14rem]"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Informations légales
            </p>
            <ul className="grid gap-1.5 text-sm">
              <li>
                <Link href="/avis-juridique" className="text-primary hover:underline">
                  Avis juridique (disclaimer)
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-primary hover:underline">
                  Politique de confidentialité (RGPD)
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-primary hover:underline">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-primary hover:underline">
                  CGU du service
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-primary hover:underline">
                  À propos de l&apos;éditeur
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
