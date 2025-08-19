"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  ownerName: string;
  title: string;
  tagline?: string;
  socials?: Record<string, string>;
  theme?: {
    mode?: "light" | "dark";
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  cvUrl?: string;
};

// Helpers: choose readable text (black/white) on top of a hex color
function parseHex(hex: string) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}
function contrastText(hex: string): "#000000" | "#ffffff" {
  try {
    const { r, g, b } = parseHex(hex);
    // YIQ brightness
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#ffffff";
  } catch {
    return "#ffffff";
  }
}

export default function LivePreview({
  ownerName,
  title,
  tagline,
  socials,
  theme,
  cvUrl,
}: Props) {
  const mode = theme?.mode === "dark" ? "dark" : "light";
  const isDark = mode === "dark";

  const primary = theme?.primaryColor ?? "#2563eb"; // navbar bg
  const background = theme?.backgroundColor ?? (isDark ? "#0b1220" : "#ffffff");
  const text = theme?.textColor ?? (isDark ? "#e5e7eb" : "#111827");

  const navText = contrastText(primary); // readable text on navbar

  return (
    <Card className="border-muted shadow-sm overflow-hidden h-full flex flex-col">
      <CardHeader className="py-3 border-b">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Live Preview
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-hidden">
        {/* Scope dark mode locally to the preview using `dark` class */}
        <div
          className={cn(
            "h-full flex flex-col overflow-hidden",
            isDark && "dark"
          )}
          style={{
            backgroundColor: background,
            color: text,
          }}
        >
          {/* NAVBAR — uses PRIMARY as background */}
          <div
            className="w-full border-b backdrop-blur-sm"
            style={{ backgroundColor: background, color: navText }}
          >
            <div className="flex justify-between items-center px-6 py-3">
              <span className="text-lg font-bold" style={{ color: primary }}>
                {ownerName || "Your Name"}
              </span>

              <div className="hidden md:flex space-x-5 text-sm">
                {["About", "Skills", "Projects", "Experience", "Contact"].map(
                  (link) => (
                    <span
                      key={link}
                      className="cursor-pointer transition-opacity hover:opacity-80"
                      style={{ color: text, opacity: 0.9 }}
                    >
                      {link}
                    </span>
                  )
                )}
              </div>

              {cvUrl && (
                <Button
                  asChild
                  className="ml-4 h-8 px-3 text-xs border-0"
                  style={{
                    backgroundColor: primary,
                    color: contrastText(primary),
                  }}
                >
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* HERO */}
          <div className="flex-1 p-6 text-center flex flex-col justify-center">
            <h1 className="text-3xl font-extrabold">
              Hi, I’m{" "}
              <span style={{ color: primary }}>{ownerName || "Your Name"}</span>{" "}
              👋
            </h1>
            <p className="mt-2 opacity-80" style={{ color: primary }}>
              {title || "Your site title"}
            </p>
            {tagline ? (
              <p className="mt-3 text-sm opacity-70">{tagline}</p>
            ) : null}

            <div className="mt-5 flex items-center justify-center gap-3">
              <div
                className="rounded-md px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: primary, color: contrastText(primary) }}
              >
                View Projects
              </div>
              <div
                className="rounded-md border px-4 py-2 text-sm"
                style={{ borderColor: primary, color: text }}
              >
                Contact Me
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t p-4 text-center text-xs opacity-80 bg-gray-900 text-white">
            © {new Date().getFullYear()} {ownerName || "Your Name"}. Built with
            Next.js & Tailwind CSS.
            <div className="mt-2 flex justify-center gap-4 text-white">
              {socials?.github ? (
                <span>GitHub ✓</span>
              ) : (
                <span className="opacity-50">GitHub</span>
              )}
              {socials?.linkedin ? (
                <span>LinkedIn ✓</span>
              ) : (
                <span className="opacity-50">LinkedIn</span>
              )}
              {socials?.email ? (
                <span>Email ✓</span>
              ) : (
                <span className="opacity-50">Email</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
