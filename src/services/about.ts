// src/services/about.ts

export type AboutInput = {
  title: string;
  content: string;
  avatar?: string | null;
  order?: number;
};

export async function fetchAbouts() {
  const res = await fetch("/api/about");
  if (!res.ok) throw new Error("Failed to load about items");
  return res.json();
}

export async function createAbout(data: AboutInput) {
  const res = await fetch("/api/about", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create about item");
  return res.json();
}

export async function updateAbout(id: string, data: Partial<AboutInput>) {
  const res = await fetch(`/api/about/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update about item");
  return res.json();
}

export async function deleteAbout(id: string) {
  const res = await fetch(`/api/about/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete about item");
  return res.json();
}

/** Reorder: accepts array of { id, order } */
export async function reorderAbouts(orderPayload: { id: string; order: number }[]) {
  const res = await fetch(`/api/about`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: orderPayload }),
  });
  if (!res.ok) throw new Error("Failed to reorder about items");
  return res.json();
}
