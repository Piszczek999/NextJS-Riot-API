import { getMatch } from "@/app/fetchingFunctions";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const res = await getMatch(params.id);
  return NextResponse.json(res);
}
