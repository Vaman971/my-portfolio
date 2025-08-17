// src/app/api/experience/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET one experience
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error("GET /experience/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}

// UPDATE an experience
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    const body = await req.json();

    // Normalize bullets into a string[]
    const data = {
      ...body,
      bullets: Array.isArray(body.bullets)
        ? body.bullets
        : body.bullets
        ? body.bullets
            .split("\n")
            .map((b: string) => b.trim())
            .filter((b: string) => b.length > 0)
        : [],
    };

    const updatedExperience = await prisma.experience.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedExperience);
  } catch (error) {
    console.error("PUT /experience/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

// DELETE an experience
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /experience/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
