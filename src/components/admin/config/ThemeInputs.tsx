"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Props = {
  theme: Record<string, any>;
  onChange: (key: string, value: any) => void;
};

export default function ThemeInputs({ theme, onChange }: Props) {
  const color = theme?.primaryColor ?? "#3b82f6";
  const mode = theme?.mode ?? "light";

  return (
    <div className="grid gap-4">
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

      <div className="space-y-2">
        <Label>Primary color</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            className="h-10 w-14 cursor-pointer rounded-md border"
            value={color}
            onChange={(e) => onChange("primaryColor", e.target.value)}
            aria-label="Primary color"
          />
          <span className="text-sm text-muted-foreground">{color}</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Preview:</span>
          <div
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium",
              "border"
            )}
            style={{ backgroundColor: color, color: "#fff", borderColor: color }}
          >
            Primary Button
          </div>
          <div className="rounded-md border px-3 py-1 text-xs">Outline Button</div>
          <div
            className="rounded-full h-4 w-4 border"
            style={{ backgroundColor: color, borderColor: color }}
          />
        </div>
      </div>
    </div>
  );
}
