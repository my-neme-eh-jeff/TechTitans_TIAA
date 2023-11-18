import { NextResponse } from "next/server";
import { CalculatorSchema } from "@/lib/validators/calculator";
import { safeParse } from "valibot";
import { getAuthSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema/roleBased";

export async function POST(req: Request) {
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

  const body = await req.json();
  const {
    salary,
    workExperience,
    age,
    goalRetirementAge,
    safetyInRetirement,
    typeOfRetirement,
  } = body;
  const isFormDataValid = safeParse(CalculatorSchema, {
    salary,
    workExperience,
    age,
    goalRetirementAge,
    safetyInRetirement,
    typeOfRetirement,
  });
  if (!isFormDataValid.success) {
    return NextResponse.json({
      success: false,
      error: isFormDataValid.issues,
    });
  }
  const insertedProfile = await db
    .insert(profile)
    .values({
      age,
      goalRetirementAge,
      safetyInRetirement,
      salary,
      typeOfRetirement,
      userId: id,
      workExperience,
    })
    .returning();
  return NextResponse.json({
    success: true,
    message: "Profile Created",
    profile: insertedProfile[0],
  });
}