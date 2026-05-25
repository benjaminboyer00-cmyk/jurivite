import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

const PDF_TIMEOUT_MS = 45_000;

const LAUNCH_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--disable-extensions",
  "--no-first-run",
  "--font-render-hinting=none",
];

let browserPromise: Promise<Browser> | null = null;

async function launchBrowser(): Promise<Browser> {
  return puppeteer.launch({
    headless: true,
    args: LAUNCH_ARGS,
  });
}

/** Instance Chromium partagée — évite 2–4 s de lancement à chaque PDF (VPS / Node long-running). */
export async function getSharedBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = launchBrowser().catch((error) => {
      browserPromise = null;
      throw error;
    });
  }

  const browser = await browserPromise;
  if (!browser.connected) {
    browserPromise = null;
    return getSharedBrowser();
  }

  return browser;
}

export async function withPdfPage<T>(
  fn: (page: Page) => Promise<T>,
): Promise<T> {
  const browser = await getSharedBrowser();
  const page = await browser.newPage();
  page.setDefaultTimeout(PDF_TIMEOUT_MS);

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
