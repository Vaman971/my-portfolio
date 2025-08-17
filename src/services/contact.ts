export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

const BASE_URL = "/api/contact";

export async function fetchContacts(params?: { q?: string; page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.q) query.append("q", params.q);
  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));

  const res = await fetch(`/api/contact?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch contacts");

  return (await res.json()) as PaginatedResponse<ContactMessage>;
}

export async function fetchContactById(id: string): Promise<ContactMessage> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch contact");
  return res.json();
}

// export async function createContact(data: ContactMessageInput): Promise<ContactMessage> {
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Failed to create contact");
//   return res.json();
// }

export async function updateContact(id: string, data: Partial<ContactMessageInput>): Promise<ContactMessage> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update contact");
  return res.json();
}

export async function deleteContact(id: string) {
  const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete contact");
  return true;
}
