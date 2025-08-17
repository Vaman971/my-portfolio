// src/app/api/projects/reorder/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  // optional: check admin session
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") return new NextResponse("Unauthorized", { status: 403 });

  const body = await req.json();
  const items: { id: string; order: number }[] = body.items || [];

  try {
    const updates = items.map((it) =>
      prisma.project.update({ where: { id: it.id }, data: { order: it.order } })
    );
    await Promise.all(updates);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
