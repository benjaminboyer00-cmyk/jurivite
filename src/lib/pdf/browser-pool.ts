import type { Browser, Page } from "puppeteer";

import { pdfTimed } from "@/lib/pdf/pdf-log";

const PDF_TIMEOUT_MS = 45_000;

const isVercel = process.env.VERCEL === "1";

/** Pack Chromium hébergé sur GitHub si le dossier bin/ n'est pas bundlé (Vercel) */
const CHROMIUM_PACK_URL =
  process.env.CHROMIUM_REMOTE_EXEC_PATH ??
  "https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.x64.tar";

/** Sandbox Chromium activé par défaut. Docker/VPS : PDF_CHROME_NO_SANDBOX=1 */
const LAUNCH_ARGS = [
  ...(process.env.PDF_CHROME_NO_SANDBOX === "1" || isVercel
    ? ["--no-sandbox", "--disable-setuid-sandbox"]
    : []),
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--disable-extensions",
  "--no-first-run",
  "--font-render-hinting=none",
];

let browserPromise: Promise<Browser> | null = null;

async function resolveChromiumExecutablePath(
  chromium: Awaited<typeof import("@sparticuz/chromium")>["default"],
): Promise<string> {
  try {
    return await chromium.executablePath();
  } catch {
    return chromium.executablePath(CHROMIUM_PACK_URL);
  }
}

async function launchVercelBrowser(slug?: string): Promise<Browser> {
  return pdfTimed("puppeteer_launch", { slug, runtime: "vercel" }, async () => {
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteer = (await import("puppeteer-core")).default;

    chromium.setGraphicsMode = false;

    const executablePath = await resolveChromiumExecutablePath(chromium);
    const headless = "shell" as const;

    return (await puppeteer.launch({
      args: puppeteer.defaultArgs({
        args: [...chromium.args, ...LAUNCH_ARGS],
        headless,
      }),
      executablePath,
      headless,
    })) as unknown as Browser;
  });
}

async function launchLocalBrowser(slug?: string): Promise<Browser> {
  return pdfTimed("puppeteer_launch", { slug, runtime: "local" }, async () => {
    const puppeteer = await import("puppeteer");
    return puppeteer.default.launch({
      headless: true,
      args: LAUNCH_ARGS,
    });
  });
}

async function launchBrowser(slug?: string): Promise<Browser> {
  if (isVercel) {
    return launchVercelBrowser(slug);
  }
  return launchLocalBrowser(slug);
}

/** Instance Chromium partagée — VPS / Node long-running uniquement. */
export async function getSharedBrowser(slug?: string): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = launchBrowser(slug).catch((error) => {
      browserPromise = null;
      throw error;
    });
  }

  const browser = await browserPromise;
  if (!browser.connected) {
    browserPromise = null;
    return getSharedBrowser(slug);
  }

  return browser;
}

async function hardenPdfPage(page: Page): Promise<void> {
  await page.setJavaScriptEnabled(false);
  await page.setRequestInterception(true);

  page.on("request", (req) => {
    const url = req.url();
    const isInline =
      url === "about:blank" ||
      url.startsWith("data:") ||
      url.startsWith("blob:");
    if (isInline) {
      void req.continue();
      return;
    }
    void req.abort("blockedbyclient");
  });
}

export async function withPdfPage<T>(
  fn: (page: Page) => Promise<T>,
  slug?: string,
): Promise<T> {
  if (isVercel) {
    const browser = await launchVercelBrowser(slug);
    const page = await browser.newPage();
    page.setDefaultTimeout(PDF_TIMEOUT_MS);
    await hardenPdfPage(page);

    try {
      return await fn(page);
    } finally {
      await page.close().catch(() => undefined);
      await browser.close().catch(() => undefined);
    }
  }

  const browser = await getSharedBrowser(slug);
  const page = await browser.newPage();
  page.setDefaultTimeout(PDF_TIMEOUT_MS);
  await hardenPdfPage(page);

  try {
    return await fn(page);
  } finally {
    await page.close().catch(() => undefined);
  }
}

export async function closeBrowserPool(): Promise<void> {
  const pending = browserPromise;
  browserPromise = null;
  if (!pending) return;

  const browser = await pending.catch(() => null);
  await browser?.close().catch(() => undefined);
}

if (typeof process !== "undefined") {
  const shutdown = () => {
    void closeBrowserPool();
  };
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
}

export { PDF_TIMEOUT_MS };
