import { db } from "@/lib/db";
import { company } from "@/lib/db/schema/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("data")
    const companies = await db.select().from(company);
    console.log("sent")
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
