import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ login: "no" });
  }else{
    return NextResponse.json({ login: "yes" });
  }
}
