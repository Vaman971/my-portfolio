"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail } from "lucide-react";

type Props = {
  socials: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

export default function SocialInputs({ socials, onChange }: Props) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Github className="h-4 w-4" /> GitHub URL
        </Label>
        <Input
          placeholder="https://github.com/your-handle"
          value={socials?.github ?? ""}
          onChange={(e) => onChange("github", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Linkedin className="h-4 w-4" /> LinkedIn URL
        </Label>
        <Input
          placeholder="https://linkedin.com/in/your-handle"
          value={socials?.linkedin ?? ""}
          onChange={(e) => onChange("linkedin", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Mail className="h-4 w-4" /> Contact Email
        </Label>
        <Input
          placeholder="you@example.com"
          value={socials?.email ?? ""}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>
    </div>
  );
}
