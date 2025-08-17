"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  ownerName: string;
  title: string;
  tagline?: string;
  socials?: Record<string, string>;
  theme?: Record<string, any>;
};

export default function LivePreview({ ownerName, title, tagline, socials, theme }: Props) {
  const color = theme?.primaryColor ?? "#3b82f6";

  return (
    <Card className="border-muted shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Hero */}
        <div className="rounded-xl border p-6 text-center">
          <h1 className="text-3xl font-extrabold">
            Hi, I’m <span style={{ color }}>{ownerName || "Your Name"}</span> 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            {title || "Your site title"}
          </p>
          {tagline ? (
            <p className="mt-3 text-sm text-muted-foreground">{tagline}</p>
          ) : null}
          <div className="mt-5 flex items-center justify-center gap-3">
            <div
              className="rounded-md px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: color }}
            >
              View Projects
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">Contact Me</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 rounded-xl border p-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {ownerName || "Your Name"}. Built with Next.js & Tailwind CSS.
          <div className="mt-2 flex justify-center gap-4">
            {socials?.github ? <span>GitHub ✓</span> : <span className="opacity-50">GitHub</span>}
            {socials?.linkedin ? <span>LinkedIn ✓</span> : <span className="opacity-50">LinkedIn</span>}
            {socials?.email ? <span>Email ✓</span> : <span className="opacity-50">Email</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
