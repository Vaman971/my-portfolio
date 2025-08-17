"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
  ProjectInput,
} from "@/services/projects";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProjectEditor from "./project/ProjectEditor";
import ProjectList from "./project/ProjectList";

export default function ProjectsAdminClient() {
  const qc = useQueryClient();
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<any | null>(null);

  const { data: projects = [], isLoading } = useQuery<ProjectInput[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 60_000,
  });

  const createMut = useMutation({
    mutationFn: (payload: ProjectInput) => createProject(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created");
    },
    onError: () => toast.error("Failed to create project"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectInput> }) => updateProject(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated");
    },
    onError: () => toast.error("Failed to update project"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: () => toast.error("Failed to delete project"),
  });

  const reorderMut = useMutation({
    mutationFn: (payload: { id: string; order: number }[]) => reorderProjects(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Order saved");
    },
    onError: () => toast.error("Failed to save order"),
  });

  function openNew() {
    setEditingProject(null);
    setEditorOpen(true);
  }

  function openEdit(id: string) {
    const p = projects.find((x: any) => x.id === id);
    if (!p) return;
    setEditingProject(p);
    setEditorOpen(true);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="flex items-center gap-2">
          <Button onClick={openNew}>New Project</Button>
        </div>
      </header>

      <div className="bg-white p-4 rounded-lg shadow">
        {isLoading && <div>Loading...</div>}
        {!isLoading && projects.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">No projects yet.</div>
        )}

        {projects.length > 0 && (
          <ProjectList
            projects={projects}
            onEdit={(id: string) => openEdit(id)}
            onDelete={(id: string) => deleteMut.mutate(id)}
            onReorder={(payload: any) => reorderMut.mutate(payload)}
          />
        )}
      </div>

      {/* Controlled editor modal used for both New + Edit */}
      <ProjectEditor
        initial={editingProject}
        onSave={(data: any, id?: string | null) => {
          if (id) updateMut.mutate({ id, data });
          else createMut.mutate(data);
        }}
        open={editorOpen}
        onOpenChange={(o) => {
          setEditorOpen(o);
          if (!o) setEditingProject(null);
        }}
        showTrigger={false}
      />
    </div>
  );
}
