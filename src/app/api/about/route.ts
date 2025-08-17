import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all about sections
export async function GET() {
  try {
    const aboutSections = await prisma.about.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(aboutSections);
  } catch (error) {
    console.error("GET /about error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about sections" },
      { status: 500 }
    );
  }
}

// CREATE a new about section
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, avatar, order } = body;

    const newAbout = await prisma.about.create({
      data: { title, content, avatar, order },
    });

    return NextResponse.json(newAbout, { status: 201 });
  } catch (error) {
    console.error("POST /about error:", error);
    return NextResponse.json(
      { error: "Failed to create about section" },
      { status: 500 }
    );
  }
}

// REORDER about sections
export async function PUT(req: Request) {
  try {
    // Expecting { items: { id: string; order: number }[] }
    const { items }: { items: { id: string; order: number }[] } =
      await req.json();

    const updates = await Promise.all(
      items.map((item) =>
        prisma.about.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    return NextResponse.json(updates);
  } catch (error) {
    console.error("PUT /about error:", error);
    return NextResponse.json(
      { error: "Failed to reorder about sections" },
      { status: 500 }
    );
  }
}
