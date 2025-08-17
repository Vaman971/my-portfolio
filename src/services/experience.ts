// src/services/experience.ts

export type ExperienceInput = {
  role: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  bullets: string[];
  order?: number;
};

export async function fetchExperiences() {
  const res = await fetch("/api/experience");
  if (!res.ok) throw new Error("Failed to load experiences");
  return res.json();
}

export async function createExperience(data: ExperienceInput) {
  const res = await fetch("/api/experience", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create experience");
  return res.json();
}

export async function updateExperience(
  id: string,
  data: Partial<ExperienceInput>
) {
  const res = await fetch(`/api/experience/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update experience");
  return res.json();
}

export async function deleteExperience(id: string) {
  const res = await fetch(`/api/experience/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete experience");
  return res.json();
}

/** Reorder: accepts array of { id, order } */
export async function reorderExperiences(
  orderPayload: { id: string; order: number }[]
) {
  const res = await fetch(`/api/experience`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: orderPayload }),
  });
  if (!res.ok) throw new Error("Failed to reorder experiences");
  return res.json();
}
