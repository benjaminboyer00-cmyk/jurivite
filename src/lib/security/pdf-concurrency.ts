const MAX_CONCURRENT = Math.max(
  1,
  Math.min(10, Number(process.env.PDF_MAX_CONCURRENT ?? "2") || 2),
);

let active = 0;
const waitQueue: Array<() => void> = [];

function releaseSlot(): void {
  active -= 1;
  const next = waitQueue.shift();
  if (next) next();
}

function acquireSlot(): Promise<void> {
  if (active < MAX_CONCURRENT) {
    active += 1;
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    waitQueue.push(() => {
      active += 1;
      resolve();
    });
  });
}

/** Limite les PDF simultanés pour éviter l'épuisement CPU/RAM sur le serveur Next. */
export async function withPdfConcurrency<T>(fn: () => Promise<T>): Promise<T> {
  await acquireSlot();
  try {
    return await fn();
  } finally {
    releaseSlot();
  }
}
