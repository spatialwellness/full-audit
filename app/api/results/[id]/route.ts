import { NextRequest, NextResponse } from "next/server";
import { getResult } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid ID" }, { status: 400 });
  }

  try {
    const result = await getResult(id);

    if (!result) {
      return NextResponse.json({ ok: false, error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Results fetch error:", error);
    return NextResponse.json(
      { ok: false, error: "Could not retrieve results" },
      { status: 500 }
    );
  }
}
