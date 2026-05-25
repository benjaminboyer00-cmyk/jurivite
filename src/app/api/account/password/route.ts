import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { findUserById, updateUserPassword } from "@/lib/auth/user-repository";
import { captureServerError } from "@/lib/observability/sentry";

const bodySchema = z.object({
  currentPassword: z.string().min(1).optional(),
  newPassword: z
    .string()
    .min(8, "Minimum 8 caractères")
    .max(128)
    .regex(/[A-Za-z]/, "Au moins une lettre")
    .regex(/[0-9]/, "Au moins un chiffre"),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Données invalides";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const user = await findUserById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "Compte introuvable" }, { status: 404 });
    }

    if (user.passwordHash) {
      if (!parsed.data.currentPassword) {
        return NextResponse.json(
          { error: "Mot de passe actuel requis" },
          { status: 400 },
        );
      }
      const valid = await verifyPassword(
        parsed.data.currentPassword,
        user.passwordHash,
      );
      if (!valid) {
        return NextResponse.json(
          { error: "Mot de passe actuel incorrect" },
          { status: 403 },
        );
      }
    }

    const passwordHash = await hashPassword(parsed.data.newPassword);
    await updateUserPassword(session.user.id, passwordHash);

    return NextResponse.json({ ok: true });
  } catch (error) {
    captureServerError(error, { route: "account-password" });
    return NextResponse.json(
      { error: "Impossible de mettre à jour le mot de passe." },
      { status: 500 },
    );
  }
}
