"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Props = {
  theme: Record<string, any>;
  onChange: (key: string, value: any) => void;
};

export default function ThemeInputs({ theme, onChange }: Props) {
  const primary = theme?.primaryColor ?? "#3b82f6";
  const secondary = theme?.secondaryColor ?? "#f97316";
  // const background = theme?.backgroundColor ?? "#ffffff";
  // const text = theme?.textColor ?? "#111827";
  const mode = theme?.mode ?? "light";

  return (
    <div className="grid gap-6">
      {/* Dark Mode */}
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <Label>Dark mode</Label>
          <p className="text-xs text-muted-foreground">Turn on dark theme globally.</p>
        </div>
        <Switch
          checked={mode === "dark"}
          onCheckedChange={(c) => onChange("mode", c ? "dark" : "light")}
        />
      </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* Primary color */}
      <ColorPicker
        label="Primary color"
        value={primary}
        onChange={(val) => onChange("primaryColor", val)}
      />

      {/* Secondary color */}
      <ColorPicker
        label="Secondary color"
        value={secondary}
        onChange={(val) => onChange("secondaryColor", val)}
      />

      {/* Background color */}
      {/* <ColorPicker
        label="Background color"
        value={background}
        onChange={(val) => onChange("backgroundColor", val)}
      /> */}

      {/* Text color */}
      {/* <ColorPicker
        label="Text color"
        value={text}
        onChange={(val) => onChange("textColor", val)}
      /> */}
    </div>
    </div>
  );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          className="h-10 w-14 cursor-pointer rounded-md border"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
        />
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div
          className={cn("rounded-md px-3 py-1 text-xs font-medium border")}
          style={{ backgroundColor: value, color: "#fff", borderColor: value }}
        >
          Example
        </div>
        <div className="rounded-full h-4 w-4 border" style={{ backgroundColor: value, borderColor: value }} />
      </div>
    </div>
  );
}
