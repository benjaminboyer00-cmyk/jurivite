import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { deleteUserAccount } from "@/lib/db/account";
import { captureServerError } from "@/lib/observability/sentry";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    await deleteUserAccount(session.user.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    captureServerError(error, { route: "account-delete" });
    return NextResponse.json(
      { error: "Impossible de supprimer le compte." },
      { status: 500 },
    );
  }
}
