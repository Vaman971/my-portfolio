import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// UPDATE site config
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const existingConfig = await prisma.siteConfig.findFirst();

    if (!existingConfig) {
      return NextResponse.json({ error: "No site config found" }, { status: 404 });
    }

    // Exclude `id` if present in the body
    const { id, ...data } = body;

    const updatedConfig = await prisma.siteConfig.update({
      where: { id: existingConfig.id },
      data,
    });

    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error("PUT /site-config error:", error);
    return NextResponse.json({ error: "Failed to update site config" }, { status: 500 });
  }
}

// DELETE site config
export async function DELETE(req: Request) {
  try {
    const existingConfig = await prisma.siteConfig.findFirst();

    if (!existingConfig) {
      return NextResponse.json({ error: "No site config found" }, { status: 404 });
    }

    await prisma.siteConfig.delete({
      where: { id: existingConfig.id }, // Use the id from the database
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /site-config error:", error);
    return NextResponse.json({ error: "Failed to delete site config" }, { status: 500 });
  }
}
