import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const expected = (process.env.DEV_MODE_PASSWORD ?? "").trim();
  if (!expected) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  try {
    const { password } = await req.json();
    const trimmed = (typeof password === "string" ? password : "").trim();
    const ok = trimmed === expected;
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
