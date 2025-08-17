"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  reorderExperiences,
  ExperienceInput,
} from "@/services/experience";
import { toast } from "sonner";
import ExperienceEditor from "./experience/ExperienceEditor";
import ExperienceList from "./experience/ExperienceList";

export default function ExperienceAdminClient() {
  const qc = useQueryClient();

  // Fetch
  const { data: experiences, isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
    staleTime: 60_000,
  });

  // CREATE
  const createMut = useMutation({
    mutationFn: (payload: ExperienceInput) => createExperience(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience created");
    },
    onError: () => toast.error("Failed to create experience"),
  });

  // UPDATE
  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ExperienceInput> }) =>
      updateExperience(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience updated");
    },
    onError: () => toast.error("Failed to update experience"),
  });

  // DELETE
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience deleted");
    },
    onError: () => toast.error("Failed to delete experience"),
  });

  // REORDER
  const reorderMut = useMutation({
    mutationFn: (payload: { id: string; order: number }[]) =>
      reorderExperiences(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Order saved");
    },
    onError: () => toast.error("Failed to save order"),
  });


  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Experiences</h2>
        <ExperienceEditor onSave={(e : any) => createMut.mutate(e)} initial={null}/>
      </header>

      <div className="bg-white p-4 rounded-lg shadow">
        {isLoading && <div>Loading...</div>}
        {!isLoading && experiences.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No experiences yet.
          </div>
        )}

        {experiences?.length > 0 && (
          <ExperienceList
            experiences={experiences}
            onEdit={(id: any, values: any) => updateMut.mutate({ id, data: values })}
            onDelete={(id: string) => deleteMut.mutate(id)}
            onReorder={(payload: any) => reorderMut.mutate(payload)}
          />
        )}
      </div>

    </div>
  );
}
