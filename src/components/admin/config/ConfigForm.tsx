"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Upload } from "lucide-react";
import { useState } from "react";

type SiteConfig = {
  id?: string;
  ownerName: string;
  title: string;
  tagline?: string;
  socials?: Record<string, string>;
  theme?: Record<string, any>;
  cvUrl?: string; // ✅ new field
};

type Props = {
  form: SiteConfig;
  onChange: (key: keyof SiteConfig, value: any) => void;
};

export default function ConfigForm({ form, onChange }: Props) {

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      onChange("cvUrl", data.url); // ✅ store uploaded file URL
    } catch (err) {
      console.error(err);
      alert("Failed to upload CV");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!form.cvUrl) return;

    try {
      const url = new URL(form.cvUrl);
      const pathname = url.pathname; // extract from full URL

      await fetch(`/api/blob?pathname=${encodeURIComponent(pathname)}`, {
        method: "DELETE",
      });

      onChange("cvUrl", ""); // ✅ remove from state
    } catch (err) {
      console.error(err);
      alert("Failed to delete CV");
    }
  };

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

      {/* ✅ New CV Upload section */}
{/* ✅ New CV Upload section */}
<div className="space-y-2">
  <Label>Upload CV (PDF)</Label>

  {/* Hidden file input */}
  <input
    type="file"
    accept="application/pdf"
    onChange={handleUpload}
    className="hidden"
    id="cv-upload"
  />

  {form.cvUrl ? (
    <div className="flex items-center justify-between rounded-lg border p-3 bg-gray-50">
      <div className="flex items-center gap-2">
        <Upload className="h-5 w-5 text-red-500" />
        <span className="text-sm font-medium">CV Uploaded</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          asChild
        >
          <a href={form.cvUrl} target="_blank" rel="noopener noreferrer">
            View
          </a>
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ) : (
    <Button
      type="button"
      disabled={uploading}
      onClick={() => document.getElementById("cv-upload")?.click()}
      className="flex items-center gap-2"
    >
      <Upload className="h-4 w-4" />
      {uploading ? "Uploading..." : "Upload CV"}
    </Button>
  )}

  <p className="text-xs text-muted-foreground">
    Upload your CV as a PDF (max 5MB).
  </p>
</div>

    </div>
  );
}
