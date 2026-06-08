"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard/signatures", label: "Signatures" },
  { href: "/dashboard/documents", label: "Documents" },
  { href: "/dashboard/compte", label: "Mon compte" },
] as const;

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav
      className="mb-8 flex gap-1 overflow-x-auto border-b pb-px"
      aria-label="Sections du tableau de bord"
    >
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (link.href === "/dashboard/signatures" && pathname === "/dashboard");

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
