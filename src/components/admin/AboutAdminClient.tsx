"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAbouts,
  createAbout,
  updateAbout,
  deleteAbout,
  reorderAbouts,
  AboutInput,
} from "@/services/about";
import { toast } from "sonner";
import AboutEditor from "./about/AboutEditor";
import AboutList from "./about/AboutList";

export default function AboutAdminClient() {
  const qc = useQueryClient();

  // FETCH
  const { data: abouts, isLoading } = useQuery({
    queryKey: ["abouts"],
    queryFn: fetchAbouts,
    staleTime: 60_000,
  });

  // CREATE
  const createMut = useMutation({
    mutationFn: (payload: AboutInput) => createAbout(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["abouts"] });
      toast.success("About section created");
    },
    onError: () => toast.error("Failed to create about section"),
  });

  // UPDATE
  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AboutInput> }) =>
      updateAbout(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["abouts"] });
      toast.success("About section updated");
    },
    onError: () => toast.error("Failed to update about section"),
  });

  // DELETE
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteAbout(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["abouts"] });
      toast.success("About section deleted");
    },
    onError: () => toast.error("Failed to delete about section"),
  });

  // REORDER
  const reorderMut = useMutation({
    mutationFn: (payload: { id: string; order: number }[]) =>
      reorderAbouts(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["abouts"] });
      toast.success("Order saved");
    },
    onError: () => toast.error("Failed to save order"),
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">About Sections</h2>
        <AboutEditor onSave={(a: any) => createMut.mutate(a)} initial={null} />
      </header>

      <div className="bg-white p-4 rounded-lg shadow">
        {isLoading && <div>Loading...</div>}
        {!isLoading && abouts?.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No about sections yet.
          </div>
        )}

        {abouts?.length > 0 && (
          <AboutList
            abouts={abouts}
            onEdit={(id: any, values: any) =>
              updateMut.mutate({ id, data: values })
            }
            onDelete={(id: string) => deleteMut.mutate(id)}
            onReorder={(payload: any) => reorderMut.mutate(payload)}
          />
        )}
      </div>
    </div>
  );
}
