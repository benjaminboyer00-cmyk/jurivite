"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "jurivite-cookie-consent-v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "essential");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Information cookies"
      className="fixed inset-x-0 top-14 z-40 border-b bg-background/95 px-4 py-4 shadow-lg backdrop-blur-md sm:top-auto sm:z-50 sm:border-b-0 sm:border-t sm:safe-bottom"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-foreground">
          JuriVite utilise des cookies <strong>strictement nécessaires</strong>{" "}
          (session, sécurité). En production, des cookies de mesure d&apos;erreurs
          (Sentry) peuvent être activés — détail dans la{" "}
          <Link href="/confidentialite" className="text-primary underline">
            politique de confidentialité
          </Link>
          .
        </p>
        <Button type="button" size="sm" onClick={accept} className="h-11 w-full shrink-0 sm:h-9 sm:w-auto">
          J&apos;ai compris
        </Button>
      </div>
    </div>
  );
}
