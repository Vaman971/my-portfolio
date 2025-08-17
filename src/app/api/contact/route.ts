import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma"; // Prisma client
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message is too short"),
  honeypot: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

// Optional: reCAPTCHA verification
async function verifyRecaptcha(token?: string) {
  if (!token || !process.env.RECAPTCHA_SECRET) return false;
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    { method: "POST" }
  );
  const data = await res.json();
  return data.success && data.score > 0.5;
}

// Optional: basic rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 min
const MAX_REQUESTS = 3;
const ipStore = new Map<string, { count: number; last: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = ipStore.get(ip) || { count: 0, last: now };
  if (now - record.last > RATE_LIMIT_WINDOW) {
    ipStore.set(ip, { count: 1, last: now });
    return false;
  }
  record.count++;
  record.last = now;
  ipStore.set(ip, record);
  return record.count > MAX_REQUESTS;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, honeypot, recaptchaToken } = contactSchema.parse(body);

    // Honeypot check
    if (honeypot && honeypot.trim() !== "") {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Rate limit
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests, please wait." }, { status: 429 });
    }

    // Verify reCAPTCHA
    if (process.env.RECAPTCHA_SECRET && !(await verifyRecaptcha(recaptchaToken))) {
      return NextResponse.json({ error: "Failed reCAPTCHA verification" }, { status: 400 });
    }

    // Store in DB
    await prisma.contactMessage.create({
      data: { name, email, message },
    });

    // Send email via Resend
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL,
        subject: "New Contact Form Message",
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET all messages with optional search
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    // Query messages with search + pagination
    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where: q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
                { message: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({
        where: q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
                { message: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
      }),
    ]);

    return NextResponse.json({
      data: messages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /contact-messages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
