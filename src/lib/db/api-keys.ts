import { createHash, randomBytes } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { apiKeys } from "@/db/schema";

const KEY_PREFIX = "jv_live_";

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export function generateApiKeyRaw(): string {
  return `${KEY_PREFIX}${randomBytes(24).toString("base64url")}`;
}

export async function createApiKey(userId: string, name = "Clé principale") {
  if (!db) throw new Error("Base de données non configurée");

  const rawKey = generateApiKeyRaw();
  const keyHash = hashKey(rawKey);
  const keyPrefix = rawKey.slice(0, 16);

  const [row] = await db
    .insert(apiKeys)
    .values({ userId, name, keyHash, keyPrefix })
    .returning();

  return { ...row, rawKey };
}

export async function listApiKeys(userId: string) {
  if (!db) return [];

  return db.query.apiKeys.findMany({
    where: eq(apiKeys.userId, userId),
    columns: {
      id: true,
      name: true,
      keyPrefix: true,
      createdAt: true,
      lastUsedAt: true,
      keyHash: false,
    },
  });
}

export async function verifyApiKey(
  rawKey: string,
): Promise<{ userId: string; keyId: string } | null> {
  if (!db || !rawKey.startsWith(KEY_PREFIX)) return null;

  const keyHash = hashKey(rawKey);
  const row = await db.query.apiKeys.findFirst({
    where: eq(apiKeys.keyHash, keyHash),
  });

  if (!row) return null;

  await db
    .update(apiKeys)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiKeys.id, row.id));

  return { userId: row.userId, keyId: row.id };
}
