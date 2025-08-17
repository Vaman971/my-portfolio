// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs"; // (or "edge" if you prefer)

export async function POST(req: Request) {
  // Expect a multipart/form-data body with "file"
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const f = file as File;

  // Basic validation (you can tweak limits/types)
  if (!f.type?.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files allowed" }, { status: 415 });
  }
  // e.g. 5 MB limit
  const maxSize = 5 * 1024 * 1024;
  // @ts-ignore - size is available in the web File
  if (typeof f.size === "number" && f.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 413 });
  }

  // Give it a tidy path; addRandomSuffix prevents collisions
  const filename = `projects/${Date.now()}-${f.name}`;

  try {
    const blob = await put(filename, f, {
      access: "public",
      addRandomSuffix: true,
      contentType: f.type || "application/octet-stream",
    });

    // blob.url is your permanent, CDN-served URL
    return NextResponse.json(
      { url: blob.url, pathname: blob.pathname },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Blob upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
