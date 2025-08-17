import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("GET /experience error:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

// CREATE a new experience
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, company, startDate, endDate, bullets, order } = body;

    // Normalize bullets into a string[]
    const normalizedBullets = Array.isArray(bullets)
      ? bullets
      : bullets
      ? bullets
          .split("\n")
          .map((b: string) => b.trim())
          .filter((b: string) => b.length > 0)
      : [];

    const newExperience = await prisma.experience.create({
      data: { role, company, startDate, endDate, bullets: normalizedBullets, order },
    });

    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error("POST /experience error:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

// REORDER experiences
export async function PUT(req: Request) {
  try {
    const { items }: { items: { id: string; order: number }[] } = await req.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid reorder payload" },
        { status: 400 }
      );
    }

    const updates = await Promise.all(
      items.map((item) =>
        prisma.experience.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    return NextResponse.json(updates);
  } catch (error) {
    console.error("PUT /experience error:", error);
    return NextResponse.json(
      { error: "Failed to reorder experiences" },
      { status: 500 }
    );
  }
}
