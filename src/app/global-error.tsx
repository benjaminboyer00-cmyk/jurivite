"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 font-sans">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <p className="max-w-md text-center text-muted-foreground">
          Notre équipe a été notifiée. Réessayez dans quelques instants.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
