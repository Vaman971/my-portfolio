"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SiteConfig = {
  id?: string;
  ownerName: string;
  title: string;
  tagline?: string;
  socials?: Record<string, string>;
  theme?: Record<string, any>;
};

type Props = {
  form: SiteConfig;
  onChange: (key: keyof SiteConfig, value: any) => void;
};

export default function ConfigForm({ form, onChange }: Props) {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <Label>Owner name</Label>
        <Input
          placeholder="e.g., Aman Verma"
          value={form.ownerName}
          onChange={(e) => onChange("ownerName", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Shown in hero and footer.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Website title</Label>
        <Input
          placeholder="e.g., Aman’s Portfolio"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Used for hero heading and browser tab title.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Tagline</Label>
        <Textarea
          placeholder="Short one-liner about your craft."
          value={form.tagline ?? ""}
          onChange={(e) => onChange("tagline", e.target.value)}
          className="min-h-[90px]"
        />
        <p className="text-xs text-muted-foreground">
          Appears below the hero title.
        </p>
      </div>
    </div>
  );
}
