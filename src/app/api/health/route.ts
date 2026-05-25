import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";

export async function GET() {
  let database: "ok" | "error" | "missing" = "missing";

  if (db) {
    try {
      await db.execute(sql`SELECT 1`);
      database = "ok";
    } catch {
      database = "error";
    }
  }

  const healthy = database === "ok" || database === "missing";

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      database,
    },
    { status: healthy ? 200 : 503 },
  );
}
