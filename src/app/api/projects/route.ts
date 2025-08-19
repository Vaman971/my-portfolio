import prisma from "@/lib/prisma";
import { z } from "zod";
import { NextResponse } from "next/server";

// Validation schema
const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string()).default([]),

  // Convert "" → null before validation
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

  order: z.number().default(0),
});

// GET projects (sorted by order)
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

// CREATE new project
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = projectSchema.parse(data);

    const project = await prisma.project.create({ data: validated });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
