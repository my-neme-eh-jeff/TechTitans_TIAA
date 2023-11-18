import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import jwt from "jsonwebtoken";

export default async function middleware(req: NextRequest) {
  const session = await getAuthSession();
  let token = req.headers.get("token");
  const user = jwt.verify(token!, process.env["NEXTAUTH_SECRET"]!) as any;
  const id = user.id || session?.user?.id;
  if (!id) {
    return NextResponse.json(
      {
        success: false,
        error: "User not logged in",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/dashboard/*", "/api/temp", "/api/calculator"],
};
