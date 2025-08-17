import prisma from "@/lib/prisma";
import { z } from "zod";
import { NextResponse } from "next/server";

const updateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  order: z.number().optional(),
});

// UPDATE
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validated = updateSchema.parse(body);
    const updated = await prisma.project.update({
      where: { id: params.id },
      data: validated,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
