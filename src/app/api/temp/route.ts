import { getAuthSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getAuthSession();
  let token = req.headers.get("token");
  console.log(token);
  const user = jwt.verify(token!, process.env["NEXTAUTH_SECRET"]!) as any;
  console.log(user);

  if (!session && !user.id) {
    return NextResponse.json({ login: "no" });
  } else {
    return NextResponse.json({ login: "yes" });
  }
}
