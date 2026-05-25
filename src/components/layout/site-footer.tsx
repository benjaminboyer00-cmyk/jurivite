import Link from "next/link";

import { documents } from "@/lib/documents/registry";
import { siteConfig } from "@/lib/seo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{siteConfig.name}</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Générateur de documents juridiques pour freelances et petites
            entreprises. Modèles à personnaliser — ne remplace pas un conseil
            juridique.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"
          aria-label="Liens pied de page"
        >
          {documents.map((doc) => (
            <Link
              key={doc.slug}
              href={doc.href}
              className="hover:text-foreground"
            >
              {doc.shortTitle}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {year} {siteConfig.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
