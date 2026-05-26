import Link from "next/link";

import { JsonLdScript } from "@/components/seo/json-ld-script";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  path: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
};

export function legalPageMetadata({
  title,
  description,
  path,
}: Pick<LegalPageLayoutProps, "title" | "description" | "path">) {
  return createMetadata({
    title,
    description,
    path,
    noIndex: false,
  });
}

export function LegalPageLayout({
  title,
  description,
  path,
  breadcrumbLabel,
  children,
}: LegalPageLayoutProps) {
  const jsonLd = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: breadcrumbLabel, path },
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <article className="page-container max-w-3xl py-10 sm:py-16">
        <nav
          className="mb-8 text-sm text-muted-foreground"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{breadcrumbLabel}</span>
        </nav>

        <header className="mb-10 border-b pb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-muted-foreground">{description}</p>
        </header>

        <div className="legal-prose space-y-8 text-[15px] leading-relaxed text-foreground/95">
          {children}
        </div>

        <footer className="mt-12 border-t pt-8 text-sm text-muted-foreground">
          <p className="flex flex-wrap gap-x-2 gap-y-1">
            Voir aussi :{" "}
            <Link href="/avis-juridique" className="text-primary hover:underline">
              Avis juridique
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
            <Link href="/a-propos" className="text-primary hover:underline">
              À propos
            </Link>
            {" · "}
            <Link href="/cgu" className="text-primary hover:underline">
              CGU
            </Link>
            {" · "}
            <Link href="/cgv" className="text-primary hover:underline">
              CGV
            </Link>
          </p>
        </footer>
      </article>
    </>
  );
}
