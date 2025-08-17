// src/services/projects.ts
export type ProjectInput = {
  id: string;
  title: string;
  description: string;
  techStack: string[]; // string list
  liveUrl?: string | null;
  githubUrl?: string | null;
  imageUrl?: string | null;
  order?: number;
};

export async function fetchProjects() {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json();
}

export async function createProject(data: ProjectInput) {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id: string) {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
}

/** Reorder: accepts array of { id, order } */
export async function reorderProjects(orderPayload: { id: string; order: number }[]) {
  const res = await fetch(`/api/projects/reorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: orderPayload }),
  });
  if (!res.ok) throw new Error("Failed to reorder projects");
  return res.json();
}
