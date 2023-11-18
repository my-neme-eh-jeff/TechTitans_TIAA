import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  let token = req.headers.get("token");
  const user = jwt.verify(token!, process.env["NEXTAUTH_SECRET"]!) as any;
  const id = user.id || session?.user?.id;
  if (id) {
    return NextResponse.json({ wow: "wow" });
  } else {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
  
  
}
