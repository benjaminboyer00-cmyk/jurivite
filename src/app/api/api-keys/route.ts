import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { createApiKey, listApiKeys } from "@/lib/db/api-keys";
import { resolveUserPlan } from "@/lib/pdf/document-service";

const createSchema = z.object({
  name: z.string().min(1).max(80).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const plan = await resolveUserPlan(session.user.id);
  if (plan !== "business") {
    return NextResponse.json(
      { error: "Clés API réservées au plan Business" },
      { status: 403 },
    );
  }

  const keys = await listApiKeys(session.user.id);
  return NextResponse.json({ keys });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const plan = await resolveUserPlan(session.user.id);
  if (plan !== "business") {
    return NextResponse.json(
      { error: "Clés API réservées au plan Business (30 €/mois)" },
      { status: 403 },
    );
  }

  const json = await request.json().catch(() => ({}));
  const parsed = createSchema.safeParse(json);
  const name = parsed.success ? parsed.data.name : undefined;

  const key = await createApiKey(session.user.id, name);

  return NextResponse.json({
    id: key.id,
    name: key.name,
    keyPrefix: key.keyPrefix,
    /** Affichée une seule fois — copiez-la maintenant */
    apiKey: key.rawKey,
    createdAt: key.createdAt,
  });
}
