"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Scale, X } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#documents", label: "Documents" },
  { href: "/tarifs", label: "Tarifs" },
] as const;

type SiteHeaderNavProps = {
  isLoggedIn: boolean;
};

export function SiteHeaderNav({ isLoggedIn }: SiteHeaderNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-3 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-semibold tracking-tight transition-opacity hover:opacity-80 sm:gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Scale className="size-4 text-primary" aria-hidden />
          </span>
          <span className="truncate">{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {isLoggedIn ? "Tableau de bord" : "Connexion"}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/generate/cgv"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Générer un document
          </ButtonLink>

          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t bg-background md:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
          aria-label="Navigation mobile"
        >
          {[
            ...navLinks,
            {
              href: isLoggedIn ? "/dashboard" : "/login",
              label: isLoggedIn ? "Tableau de bord" : "Connexion",
            },
          ].map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3.5 text-sm font-medium transition-colors hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}
          <ButtonLink
            href="/generate/cgv"
            className="mt-2 w-full"
            onClick={() => setMobileOpen(false)}
          >
            Générer un document
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
