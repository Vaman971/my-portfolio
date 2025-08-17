import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// CREATE a new skill
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.category || typeof data.level !== "number") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const count = await prisma.skill.count();

    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        icon: data.icon ?? null,
        level: data.level,
        category: data.category,
        order: count, // append at the end
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}

// REORDER skills
export async function PUT(req: Request) {
  try {
    const payload: { id: string; order: number }[] = await req.json();

    if (!Array.isArray(payload)) {
      return NextResponse.json(
        { error: "Invalid payload format" },
        { status: 400 }
      );
    }

    const updates = await Promise.all(
      payload.map((item) =>
        prisma.skill.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    return NextResponse.json(updates);
  } catch (error) {
    console.error("PUT /api/skills error:", error);
    return NextResponse.json(
      { error: "Failed to reorder skills" },
      { status: 500 }
    );
  }
}
