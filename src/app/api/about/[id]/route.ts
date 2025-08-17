import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET one about section
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const about = await prisma.about.findUnique({ where: { id } });

    if (!about) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("GET /about/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about section" },
      { status: 500 }
    );
  }
}

// UPDATE an about section
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updatedAbout = await prisma.about.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error("PUT /about/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update about section" },
      { status: 500 }
    );
  }
}

// DELETE an about section
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.about.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /about/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete about section" },
      { status: 500 }
    );
  }
}
