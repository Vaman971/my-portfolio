export type SkillInput = {
  name: string;
  icon?: string;
  level: number;
  category: string;
};

export async function fetchSkills() {
  const res = await fetch("/api/skills");
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function fetchOneSkills(id: string) {
  const res = await fetch(`/api/skills/${id}`,{
    method: "GET",
    headers: { "Content-Type": "application/json"},
  });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function createSkill(data: SkillInput) {
  const res = await fetch("/api/skills", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create skill");
  return res.json();
}

export async function updateSkill(id: string, data: Partial<SkillInput>) {
  const res = await fetch(`/api/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update skill");
  return res.json();
}

export async function deleteSkill(id: string) {
  const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete skill");
  return res.json();
}

export async function reorderSkills(payload: { id: string; order: number }[]) {
  const res = await fetch("/api/skills", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to reorder skills");
  return res.json();
}
