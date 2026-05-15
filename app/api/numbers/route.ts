import { NextResponse } from "next/server";
import { getAllNumbers } from "@/lib/numbers";

export async function GET() {
  return NextResponse.json(getAllNumbers());
}
