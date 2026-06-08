export type PdfLogStage =
  | "validate"
  | "sanitize_payload"
  | "render_html"
  | "sanitize_html"
  | "puppeteer_launch"
  | "puppeteer_set_content"
  | "puppeteer_pdf"
  | "persist"
  | "complete";

export class PdfGenerationError extends Error {
  readonly stage: PdfLogStage;

  constructor(stage: PdfLogStage, message: string, cause?: unknown) {
    super(message);
    this.name = "PdfGenerationError";
    this.stage = stage;
    if (cause instanceof Error && cause.stack) {
      this.stack = `${this.stack}\nCaused by: ${cause.stack}`;
    }
  }
}

function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function pdfLog(
  stage: PdfLogStage,
  meta: Record<string, unknown>,
  level: "info" | "error" = "info",
): void {
  const payload = {
    service: "pdf",
    stage,
    vercel: process.env.VERCEL === "1",
    vercelEnv: process.env.VERCEL_ENV ?? "local",
    ...meta,
    ts: new Date().toISOString(),
  };

  const line = `[pdf] ${JSON.stringify(payload)}`;
  if (level === "error") {
    console.error(line);
  } else {
    console.log(line);
  }
}

export async function pdfTimed<T>(
  stage: PdfLogStage,
  meta: Record<string, unknown>,
  fn: () => Promise<T>,
): Promise<T> {
  const started = Date.now();
  try {
    const result = await fn();
    pdfLog(stage, { ...meta, durationMs: Date.now() - started, ok: true });
    return result;
  } catch (error) {
    pdfLog(
      stage,
      {
        ...meta,
        durationMs: Date.now() - started,
        ok: false,
        error: formatError(error),
        errorName: error instanceof Error ? error.name : typeof error,
      },
      "error",
    );
    throw error;
  }
}

export function getPdfErrorDetail(error: unknown): {
  stage: PdfLogStage;
  message: string;
  code: string;
} {
  if (error instanceof PdfGenerationError) {
    return {
      stage: error.stage,
      message: error.message,
      code: `PDF_${error.stage.toUpperCase()}`,
    };
  }

  const message =
    error instanceof Error ? error.message : "Erreur inconnue lors de la génération PDF";

  return {
    stage: "puppeteer_pdf",
    message,
    code: "PDF_UNKNOWN",
  };
}

/** Expose le détail technique côté client (preview / dev uniquement). */
export function shouldExposePdfErrorDetail(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "preview" ||
    process.env.PDF_DEBUG_ERRORS === "1"
  );
}
