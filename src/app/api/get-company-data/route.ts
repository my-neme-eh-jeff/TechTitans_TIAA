import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { company } from "@/lib/db/schema/company";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    let token = req.headers.get("token");
    const user =
      token && (jwt.verify(token!, process.env["NEXTAUTH_SECRET"]!) as any);
    const id = user?.id || session?.user?.id;
    if (!id) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const companies = await db.select().from(company);
    return NextResponse.json({
      success: true,
      data: companies,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: err,
      success: false,
    });
  }
}
