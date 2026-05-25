import Link from "next/link";

import { documents } from "@/lib/documents/registry";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Page introuvable",
  description: "Cette page n'existe pas sur JuriVite.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="page-container max-w-2xl py-20 text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page introuvable</h1>
      <p className="mt-3 text-muted-foreground">
        Le lien est peut-être obsolète. Retrouvez nos générateurs de documents
        juridiques ci-dessous.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Accueil
        </Link>
        <Link
          href="/generate"
          className="inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Tous les générateurs
        </Link>
        <Link
          href="/tarifs"
          className="inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Tarifs
        </Link>
      </div>
      <ul className="mt-10 space-y-2 text-left text-sm text-muted-foreground">
        {documents.slice(0, 5).map((doc) => (
          <li key={doc.slug}>
            <Link href={doc.href} className="text-primary hover:underline">
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
