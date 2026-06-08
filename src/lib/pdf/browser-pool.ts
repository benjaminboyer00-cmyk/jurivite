import type { Browser, Page } from "puppeteer";

const PDF_TIMEOUT_MS = 45_000;

const isVercel = process.env.VERCEL === "1";

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

async function launchBrowser(): Promise<Browser> {
  if (isVercel) {
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteer = (await import("puppeteer-core")).default;
    return (await puppeteer.launch({
      args: [...chromium.args, ...LAUNCH_ARGS],
      executablePath: await chromium.executablePath(),
      headless: true,
    })) as unknown as Browser;
  }

  const puppeteer = await import("puppeteer");
  return puppeteer.default.launch({
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
): Promise<T> {
  const browser = await getSharedBrowser();
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
