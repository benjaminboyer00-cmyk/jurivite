import * as Sentry from "@sentry/nextjs";

export function captureServerError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  console.error("[jurivite]", error, context ?? "");

  if (!process.env.SENTRY_DSN) return;

  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext("extra", context);
    }
    Sentry.captureException(error);
  });
}

export function captureServerMessage(
  message: string,
  level: Sentry.SeverityLevel = "warning",
  context?: Record<string, unknown>,
): void {
  if (!process.env.SENTRY_DSN) return;

  Sentry.withScope((scope) => {
    if (context) scope.setContext("extra", context);
    Sentry.captureMessage(message, level);
  });
}
