import { NextResponse } from "next/server";
import { z } from "zod";

import { isValidEmailFormat, normalizeEmail } from "@/lib/auth/email";
import { hashPassword } from "@/lib/auth/password";
import { createUserWithPassword } from "@/lib/auth/user-repository";
import { captureServerError } from "@/lib/observability/sentry";

const bodySchema = z.object({
  email: z.string().min(5).max(254),
  password: z
    .string()
    .min(8, "Minimum 8 caractères")
    .max(128)
    .regex(/[A-Za-z]/, "Au moins une lettre")
    .regex(/[0-9]/, "Au moins un chiffre"),
  name: z.string().max(120).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Données invalides";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const email = normalizeEmail(parsed.data.email);
    if (!isValidEmailFormat(email)) {
      return NextResponse.json({ error: "E-mail invalide" }, { status: 400 });
    }

    const passwordHash = await hashPassword(parsed.data.password);

    await createUserWithPassword({
      email,
      passwordHash,
      name: parsed.data.name,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return NextResponse.json(
        {
          error:
            "Un compte existe déjà avec cet e-mail. Connectez-vous ou utilisez le lien magique.",
        },
        { status: 409 },
      );
    }
    captureServerError(error, { route: "auth-register" });
    return NextResponse.json(
      { error: "Impossible de créer le compte." },
      { status: 500 },
    );
  }
}
