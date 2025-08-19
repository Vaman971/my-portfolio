import prisma from "@/lib/prisma";
import { z } from "zod";
import { NextResponse } from "next/server";

const updateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  techStack: z.array(z.string()).optional(),

  // preprocess empty string -> null
  liveUrl: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().url().nullable().optional()
  ),
  githubUrl: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().url().nullable().optional()
  ),
  imageUrl: z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().url().nullable().optional()
  ),

  order: z.number().optional(),
});

// UPDATE
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    const body = await req.json();
    const validated = updateSchema.parse(body);

    const updated = await prisma.project.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
