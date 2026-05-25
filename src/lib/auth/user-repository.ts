import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { normalizeEmail } from "@/lib/auth/email";

export async function findUserByEmail(email: string) {
  if (!db) return null;
  const normalized = normalizeEmail(email);
  return db.query.users.findFirst({
    where: eq(users.email, normalized),
  });
}

export async function findUserById(id: string) {
  if (!db) return null;
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function createUserWithPassword({
  email,
  passwordHash,
  name,
}: {
  email: string;
  passwordHash: string;
  name?: string;
}) {
  if (!db) throw new Error("Base de données non configurée");

  const normalized = normalizeEmail(email);
  const existing = await findUserByEmail(normalized);
  if (existing) {
    throw new Error("EMAIL_TAKEN");
  }

  const [user] = await db
    .insert(users)
    .values({
      email: normalized,
      passwordHash,
      name: name?.trim() || null,
      emailVerified: new Date(),
    })
    .returning();

  return user;
}

export async function updateUserPassword(
  userId: string,
  passwordHash: string,
): Promise<void> {
  if (!db) throw new Error("Base de données non configurée");
  await db
    .update(users)
    .set({ passwordHash })
    .where(eq(users.id, userId));
}
