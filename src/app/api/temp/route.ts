import { getAuthSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ login: "yes" });
}
