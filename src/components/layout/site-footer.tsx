import Link from "next/link";

import { documents } from "@/lib/documents/registry";
import { seoLandingPages } from "@/lib/documents/seo-landings";
import { juriviteLegal } from "@/lib/legal/jurivite-site";
import { siteConfig } from "@/lib/seo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-semibold">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Générateur de documents juridiques pour freelances,
              auto-entrepreneurs et TPE. CGV, mentions légales, RGPD, contrats,
              devis — PDF en ligne.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {juriviteLegal.legalEntityName} — {juriviteLegal.tradeName}
              <br />
              <Link href="/mentions-legales" className="text-primary hover:underline">
                Mentions légales & contact
              </Link>
            </p>
          </div>

          <nav aria-label="Documents juridiques">
            <p className="text-sm font-semibold">Documents</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {documents.map((doc) => (
                <li key={doc.slug}>
                  <Link href={doc.href} className="hover:text-foreground">
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Guides SEO">
            <p className="text-sm font-semibold">Guides populaires</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {seoLandingPages.map((landing) => (
                <li key={landing.slug}>
                  <Link
                    href={`/generate/${landing.slug}`}
                    className="hover:text-foreground"
                  >
                    {landing.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Informations légales">
            <p className="text-sm font-semibold">Informations légales</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/avis-juridique" className="hover:text-foreground">
                  Avis juridique (disclaimer)
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-foreground">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-foreground">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-foreground">
                  À propos de l&apos;éditeur
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="hover:text-foreground">
                  CGU (service)
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-foreground">
                  CGV (abonnements)
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Liens utiles">
            <p className="text-sm font-semibold">JuriVite</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tarifs" className="hover:text-foreground">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/generate" className="hover:text-foreground">
                  Tous les générateurs
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t pt-6 text-center text-xs leading-relaxed text-muted-foreground">
          © {year} {juriviteLegal.legalEntityName} / {juriviteLegal.tradeName} — {juriviteLegal.siteName}.
          Modèles
          structurés — pas un conseil juridique.{" "}
          <Link href="/avis-juridique" className="text-primary hover:underline">
            Disclaimer
          </Link>
          {" · "}
          <Link href="/confidentialite" className="text-primary hover:underline">
            Confidentialité
          </Link>
          {" · "}
          <Link href="/mentions-legales" className="text-primary hover:underline">
            Mentions légales
          </Link>
          {" · "}
          <Link href="/cgu" className="text-primary hover:underline">
            CGU
          </Link>
          {" · "}
          v{juriviteLegal.softwareVersion}
        </p>
      </div>
    </footer>
  );
}
