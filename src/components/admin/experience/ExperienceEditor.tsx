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
  DialogTrigger,
} from "@/components/ui/dialog";

type EditorProps = {
  initial?: any | null;
  onSave: (data: any) => void;
  saving?: boolean;
};

export default function ExperienceEditor({
  initial,
  onSave,
  saving
}: EditorProps) {
  const [open, setOpen] = React.useState(false);

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      bullets: "",
    },
  });

  // Reset form when editing
  React.useEffect(() => {
    if (open){
      reset(
        initial
          ? {
              role: initial.role ?? "",
              company: initial.company ?? "",
              startDate: initial.startDate ?? "",
              endDate: initial.endDate ?? "",
              bullets: Array.isArray(initial.bullets)
                ? initial.bullets.join("\n")
                : initial.bullets ?? "",
            }
          : {
              role: "",
              company: "",
              startDate: "",
              endDate: "",
              bullets: "",
            }
      );
    }
  }, [initial,open, reset]);

  const bulletsInput = watch("bullets") || "";
  const bulletsPreview = bulletsInput
    .split("\n")
    .map((t: string) => t.trim())
    .filter(Boolean);

  const submit = (data: any) => {
    console.log("Submitting data:", data);
    onSave(data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={initial ? "outline" : "default"} size="sm">
          {initial ? "Edit" : "Add Experience"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Experience" : "Add Experience"}</DialogTitle>
        </DialogHeader>

          <form onSubmit={handleSubmit(submit)} className="space-y-4 mt-3">
            <div className="grid grid-cols-1 gap-3">
              <label className="flex flex-col">
                <span className="text-sm font-medium">Role / Position</span>
                <input
                  {...register("role", { required: true })}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Software Engineer"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium">Company</span>
                <input
                  {...register("company", { required: true })}
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Google"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Start Date</span>
                  <input
                    type="date"
                    {...register("startDate", { required: true })}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">End Date</span>
                  <input
                    type="date"
                    {...register("endDate")}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                  />
                  <span className="text-xs text-muted-foreground mt-1">
                    Leave empty if ongoing
                  </span>
                </label>
              </div>

              <label className="flex flex-col">
                <span className="text-sm font-medium">Key Contributions (one per line)</span>
                <textarea
                  {...register("bullets")}
                  className="mt-1 w-full rounded-md border px-3 py-2 min-h-[100px] resize-none"
                  placeholder="Improved system performance by 30%..."
                />
                <div className="flex flex-col gap-1 mt-2">
                  {bulletsPreview.slice(0, 5).map((b: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-100 rounded border text-muted-foreground"
                    >
                      • {b}
                    </span>
                  ))}
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {saving ? "Save changes" : "Save"}
              </Button>
            </div>
          </form>
      </DialogContent>
    </Dialog>
  );
}
