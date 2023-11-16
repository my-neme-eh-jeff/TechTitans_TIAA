import db from "@/lib/db";
import { genSaltSync, hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email} = body;

    const exsiterUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    console.log(exsiterUserByEmail)
    if (exsiterUserByEmail) {
      return NextResponse.json(
        { user: null, message: "asdasd" },
        { status: 404 }
      );
    }

    // const hashedPassword = await hash(password, genSaltSync());
    const newUser = await db.user.findMany()

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
