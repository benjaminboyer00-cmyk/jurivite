import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");

    if (process.env.PDF_WARM_ON_START === "1") {
      const [{ getSharedBrowser }, { warmTemplateCache }] = await Promise.all([
        import("@/lib/pdf/browser-pool"),
        import("@/lib/pdf/template-cache"),
      ]);
      warmTemplateCache();
      await getSharedBrowser();
    }
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
