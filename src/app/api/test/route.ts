import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/roleBased";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await db.select().from(users)
  return NextResponse.json({
    name: "Cron job",
  });
}
