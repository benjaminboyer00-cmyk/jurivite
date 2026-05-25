/**
 * Sentry côté navigateur — uniquement si NEXT_PUBLIC_SENTRY_DSN est défini.
 * Sans DSN : pas d'init (évite les hooks router qui ralentissent le dev).
 */
import * as Sentry from "@sentry/nextjs";

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment:
      process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
    enabled: true,
  });
}

export const onRouterTransitionStart = sentryDsn
  ? Sentry.captureRouterTransitionStart
  : function noopRouterTransitionStart() {
      /* Sentry désactivé en dev sans DSN */
    };
