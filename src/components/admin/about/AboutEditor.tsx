"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

type EditorProps = {
  initial?: any | null;
  onSave: (data: any) => void;
  saving?: boolean;
};

export default function AboutEditor({
  initial,
  onSave,
  saving,
}: EditorProps) {
  const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      content: "",
      avatar: "",
    },
  });

  const avatar = watch("avatar");

  // Reset form values on open
  React.useEffect(() => {
    if (open) {
      reset(
        initial
          ? {
              title: initial.title ?? "",
              content: initial.content ?? "",
              avatar: initial.avatar ?? "",
            }
          : {
              title: "",
              content: "",
              avatar: "",
            }
      );
    }
  }, [initial, open, reset]);

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
        setValue("avatar", data.url, { shouldValidate: true });
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
    setValue("avatar", "", { shouldValidate: true });
  };

  const submit = (data: any) => {
    onSave(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={initial ? "outline" : "default"} size="sm">
          {initial ? "Edit" : "Add About"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit About Section" : "Add About Section"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4 mt-3">
          <div className="grid grid-cols-1 gap-3">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Title</span>
              <input
                {...register("title", { required: true })}
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="About Me"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium">Content</span>
              <textarea
                {...register("content")}
                className="mt-1 w-full rounded-md border px-3 py-2 min-h-[120px] resize-none"
                placeholder="Write a short bio or about section..."
              />
            </label>

            <div className="flex flex-col">
              <span className="text-sm font-medium">Avatar</span>
              {!avatar ? (
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer px-3 py-2 bg-gray-100 rounded-md border hover:bg-gray-200 text-sm"
                  >
                    {uploading ? "Uploading..." : "Upload Avatar"}
                  </label>
                </div>
              ) : (
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={avatar}
                    alt="Avatar Preview"
                    className="w-16 h-16 rounded-full border object-cover"
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
          </div>

          <DialogFooter className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
