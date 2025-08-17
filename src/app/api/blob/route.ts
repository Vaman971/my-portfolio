// src/app/api/blob/route.ts
import { NextResponse } from "next/server";
import { del } from "@vercel/blob";

export const runtime = "nodejs";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const pathname = searchParams.get("pathname"); // e.g. from DB

  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    await del(pathname);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Blob delete error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
