"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";

type EditorProps = {
  initial?: any | null;
  onSave: (data: any, id?: string | null) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
};

export default function ProjectEditor({
  initial = null,
  onSave,
  open,
  onOpenChange,
  showTrigger = false,
}: EditorProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      techStack: "",
      liveUrl: "",
      githubUrl: "",
      imageUrl: "",
      imagePathname: "",
    },
  });

  const [localFile, setLocalFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  React.useEffect(() => {
    reset(
      initial
        ? {
          title: initial.title ?? "",
          description: initial.description ?? "",
          techStack: Array.isArray(initial.techStack)
            ? initial.techStack.join(", ")
            : initial.techStack ?? "",
          liveUrl: initial.liveUrl ?? "",
          githubUrl: initial.githubUrl ?? "",
          imageUrl: initial.imageUrl ?? "",
          imagePathname: initial.imagePathname ?? "",
        }
        : {
          title: "",
          description: "",
          techStack: "",
          liveUrl: "",
          githubUrl: "",
          imageUrl: "",
          imagePathname: "",
        }
    );
    setLocalFile(null);
  }, [initial, reset]);

  const imageUrl = watch("imageUrl");
  const imagePathname = watch("imagePathname");

  async function uploadToBlob(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("filename", file.name);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) throw new Error("Upload failed");

    return (await res.json()) as { url: string; pathname: string };
  }

  async function removeFromBlob(pathname: string) {
    try {
      await fetch(`/api/blob?pathname=${encodeURIComponent(pathname)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Blob delete failed:", err);
    }
  }

  async function submit(data: any) {
    try {
      let finalImageUrl = data.imageUrl || null;
      let finalPathname = data.imagePathname || null;

      // Upload new file if selected
      if (localFile) {
        setIsUploading(true);
        const { url, pathname } = await uploadToBlob(localFile);

        finalImageUrl = url;
        finalPathname = pathname;

        setValue("imageUrl", url);
        setValue("imagePathname", pathname);

        setIsUploading(false);
      }

      const payload = {
        title: data.title,
        description: data.description,
        techStack: data.techStack
          ? data.techStack.split(",").map((s: string) => s.trim())
          : [],
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        imageUrl: finalImageUrl,
        imagePathname: finalPathname,
      };

      onSave(payload, initial?.id ?? null);

      if (onOpenChange) onOpenChange(false);
      else reset();

      setLocalFile(null);
      toast.success(initial ? "Project updated" : "Project created");
    } catch (err: any) {
      console.error(err);
      setIsUploading(false);
      toast.error(err?.message || "Failed to save project");
    }
  }

  const handleRemoveImage = async () => {
    if (imagePathname) {
      await removeFromBlob(imagePathname);
    }
    setValue("imageUrl", "");
    setValue("imagePathname", "");
    setLocalFile(null);
    toast.success("Image removed");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <div className="inline-block">
          <Button variant="default">New Project</Button>
        </div>
      )}

      <DialogContent className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.99 }}
          transition={{ duration: 0.16 }}
        >
          <DialogHeader>
            <DialogTitle>
              {initial ? "Edit Project" : "New Project"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(submit)} className="space-y-4 mt-3">
            <div className="grid grid-cols-1 gap-3">
              <label className="flex flex-col">
                <span className="text-sm font-medium">Title</span>
                <input
                  {...register("title", { required: true })}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Project title"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium">Short description</span>
                <textarea
                  {...register("description")}
                  className="mt-1 w-full rounded-md border px-3 py-2 min-h-[80px] resize-none"
                  placeholder="What does it do?"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium">
                  Tech stack (comma separated)
                </span>
                <input
                  {...register("techStack")}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="React, Next.js, Prisma"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Live URL</span>
                  <input
                    {...register("liveUrl")}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    placeholder="https://..."
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">GitHub URL</span>
                  <input
                    {...register("githubUrl")}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    placeholder="https://github.com/your/repo"
                  />
                </label>
              </div>

              {/* --- Image Upload Section --- */}
              <div>
                <span className="text-sm font-medium">Project Image</span>
                {imageUrl ? (
                  <div className="relative mt-2 w-40 h-28 rounded-md overflow-hidden border">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={isUploading}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs">
                        Uploading...
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="mt-2 flex flex-col items-center justify-center w-40 h-28 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-xs text-muted-foreground">
                      {isUploading ? "Uploading..." : "Upload image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setIsUploading(true);

                        try {
                          const fd = new FormData();
                          fd.append("file", file);

                          const res = await fetch("/api/upload", {
                            method: "POST",
                            body: fd,
                          });

                          const data = await res.json();
                          if (res.ok && data.url) {
                            setValue("imageUrl", data.url);
                            setValue("imagePathname", data.pathname);
                            toast.success("Image uploaded!");
                          } else {
                            toast.error(data.error || "Upload failed");
                          }
                        } catch (err) {
                          toast.error("Upload failed");
                        } finally {
                          setIsUploading(false);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              {/* --- End Image Upload Section --- */}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  if (onOpenChange) onOpenChange(false);
                  else reset();
                  setLocalFile(null);
                }}
                disabled={isUploading}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isUploading}>
                {isUploading
                  ? "Uploading..."
                  : initial
                    ? "Save changes"
                    : "Create project"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
