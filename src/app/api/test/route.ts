import { db } from "@/lib/db";
import { genSaltSync, hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    return NextResponse.json(
      { user: null, message: "asdasd" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
}
