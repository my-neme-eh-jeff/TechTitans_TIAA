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
    if (token) {
      return NextResponse.json(
        {
          success: false,
          error: "User not logged in",
        },
        { status: 401 }
      );
    } else {
      return NextResponse.redirect("/login");
    }
  }
}

export const config = {
  matcher: ["/api/temp", "/api/calculator"],
};
