"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export interface SkillInput {
  name: string;
  category: string;
  level: number;
  icon?: string;
}

interface SkillEditorProps {
  initial: SkillInput | null;
  onSave: (payload: SkillInput) => void;
  saving?: boolean;
}

export default function SkillEditor({ initial, onSave, saving }: SkillEditorProps) {
  const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm<SkillInput>({
    defaultValues: { name: "", category: "", level: 50, icon: "" },
  });

  // Reset values when modal opens
  React.useEffect(() => {
    if (open) {
      reset(initial || { name: "", category: "", level: 50, icon: "" });
    }
  }, [initial, open, reset]);

  const iconUrl = watch("icon");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setValue("icon", data.url, { shouldValidate: true });
      } else {
        console.error("Upload error:", data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setValue("icon", "", { shouldValidate: true });
  };

  const submit = (values: SkillInput) => {
    onSave(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={initial ? "outline" : "default"} size="sm">
          {initial ? "Edit" : "Add Skill"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Skill" : "Add New Skill"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4 py-2">
          <div>
            <Label>Name</Label>
            <Input {...register("name", { required: true })} placeholder="React" />
          </div>

          <div>
            <Label>Category</Label>
            <Input {...register("category", { required: true })} placeholder="Frontend" />
          </div>

          <div>
            <Label>Level (%)</Label>
            <Input type="number" min={0} max={100} {...register("level", { valueAsNumber: true })} />
          </div>

          <div>
            <Label>Icon</Label>
            {!iconUrl ? (
              <div className="mt-2">
                <input
                  id="icon-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="icon-upload"
                  className="cursor-pointer px-3 py-2 bg-gray-100 rounded-md border hover:bg-gray-200 text-sm"
                >
                  {uploading ? "Uploading..." : "Upload Icon"}
                </label>
              </div>
            ) : (
              <div className="mt-3 flex flex-col items-center gap-2">
                <img
                  src={iconUrl}
                  alt="Icon preview"
                  className="w-20 h-20 rounded-full border object-cover shadow-sm"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving || uploading}>
              {saving || uploading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
