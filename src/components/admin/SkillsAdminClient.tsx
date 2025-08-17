"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
  SkillInput,
} from "@/services/skills";
import { toast } from "sonner";
import SkillEditor from "./skill/SkillEditor";
import SkillList from "./skill/SkillList";

export default function SkillsAdminClient() {
  const qc = useQueryClient();

  // GET all skills
  const { data: skills, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 1000 * 60,
  });

  // CREATE
  const createMut = useMutation({
    mutationFn: (payload: SkillInput) => createSkill(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill created");
    },
    onError: () => toast.error("Failed to create skill"),
  });

  // UPDATE
  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SkillInput> }) =>
      updateSkill(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill updated");
    },
    onError: () => toast.error("Failed to update skill"),
  });

  // DELETE
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted");
    },
    onError: () => toast.error("Failed to delete skill"),
  });

  // REORDER
  const reorderMut = useMutation({
    mutationFn: (payload: { id: string; order: number }[]) =>
      reorderSkills(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill order saved");
    },
    onError: () => toast.error("Failed to reorder skills"),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skills</h2>
        <SkillEditor onSave={(s : any) => createMut.mutate(s)} initial={null} />
      </header>

      {/* Main content */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
        {isLoading && (
          <div className="p-6 text-center text-muted-foreground">
            Loading skills...
          </div>
        )}

        {!isLoading && skills?.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No skills added yet.
          </div>
        )}

        {skills && skills.length > 0 && (
          <SkillList
            skills={skills}
            onEdit={(id: any, values: any) => updateMut.mutate({ id, data: values })}
            onDelete={(id: any) => deleteMut.mutate(id)}
            onReorder={(payload :any) => reorderMut.mutate(payload)}
          />
        )}
      </div>
    </div>
  );
}
