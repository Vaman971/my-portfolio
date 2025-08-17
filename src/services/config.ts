// src/services/config.ts

export type SiteConfigInput = {
  ownerName: string;
  title: string;
  tagline?: string;
  socials?: Record<string, string>;
  theme?: Record<string, any>;
};

export async function fetchConfig() {
  const res = await fetch("/api/site-config");
  if (!res.ok) throw new Error("Failed to fetch site config");
  return res.json();
}

export async function createConfig(data: SiteConfigInput) {
  const res = await fetch("/api/site-config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create site config");
  return res.json();
}

export async function updateConfig(id: string, data: Partial<SiteConfigInput>) {
  const res = await fetch(`/api/site-config/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update site config");
  return res.json();
}

export async function deleteConfig(id: string) {
  const res = await fetch(`/api/site-config/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete site config");
  return res.json();
}
