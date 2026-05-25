import Link from "next/link";

import { documents } from "@/lib/documents/registry";
import { seoLandingPages } from "@/lib/documents/seo-landings";
import { siteConfig } from "@/lib/seo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-semibold">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Générateur de documents juridiques pour freelances,
              auto-entrepreneurs et TPE. CGV, mentions légales, RGPD, contrats,
              devis — PDF en ligne.
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
              {seoLandingPages.slice(0, 5).map((landing) => (
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
                <Link href="/mentions-legales" className="hover:text-foreground">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-foreground">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-foreground">
                  CGV
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
                <Link href="/#documents" className="hover:text-foreground">
                  Tous les générateurs
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {year} {siteConfig.name}. Modèles à personnaliser — ne remplace pas
          un conseil juridique.
        </p>
      </div>
    </footer>
  );
}
