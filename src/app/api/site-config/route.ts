import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET site config
export async function GET() {
  try {
    const config = await prisma.siteConfig.findFirst();
    return NextResponse.json(config || {});
  } catch (error) {
    console.error("GET /site-config error:", error);
    return NextResponse.json({ error: "Failed to fetch site config" }, { status: 500 });
  }
}

// CREATE site config
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const existingConfig = await prisma.siteConfig.findFirst();

    if (existingConfig) {
      return NextResponse.json({ error: "Site config already exists" }, { status: 400 });
    }

    const newConfig = await prisma.siteConfig.create({
      data: body,
    });

    return NextResponse.json(newConfig, { status: 201 });
  } catch (error) {
    console.error("POST /site-config error:", error);
    return NextResponse.json({ error: "Failed to create site config" }, { status: 500 });
  }
}

