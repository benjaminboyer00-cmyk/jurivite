import { auth } from "@/auth";

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin() {
  const session = await auth();
  const admins = getAdminEmails();

  if (!session?.user?.email) {
    return { ok: false as const, reason: "unauthenticated" as const };
  }

  if (admins.length === 0) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const email = session.user.email.toLowerCase();
  if (!admins.includes(email)) {
    return { ok: false as const, reason: "forbidden" as const };
  }

  return { ok: true as const, session };
}
