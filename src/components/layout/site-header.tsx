import Link from "next/link";
import { Scale } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/seo";

const navLinks = [
  { href: "/#documents", label: "Documents" },
  { href: "/generate/mentions-legales", label: "Mentions légales" },
  { href: "/generate/politique-confidentialite", label: "RGPD" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Scale className="size-5 text-primary" aria-hidden />
          <span>{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/#documents" size="sm">
          Générer un document
        </ButtonLink>
      </div>
    </header>
  );
}
