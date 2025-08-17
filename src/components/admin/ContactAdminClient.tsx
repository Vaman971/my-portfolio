"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import * as contactService from "@/services/contact";
import { Button } from "@/components/ui/button";
import { ContactMessage } from "@/services/contact";

import ContactTable from "./contact/ContactTable";
import ContactCardList from "./contact/ContactCardList";
import ContactSearchBar from "./contact/ContactSearchBar";
import ContactMessageModal from "./contact/ContactMessageModal";

export default function ContactAdminClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false); // 👈 now only affects content, not search bar
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit] = useState(Number(searchParams.get("limit")) || 10);
  const [totalPages, setTotalPages] = useState(1);

  // --- debounce state ---
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // 👈 wait 400ms after user stops typing
    return () => clearTimeout(handler);
  }, [search]);

  function updateUrl(q: string, page: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("page", String(page));
    params.set("limit", String(limit));
    router.replace(`${pathname}?${params.toString()}`);
  }

  async function fetchContacts() {
    if (debouncedSearch && debouncedSearch.length < 2) {
      // 👈 don't fetch if query too short
      setContacts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await contactService.fetchContacts({
        q: debouncedSearch,
        page,
        limit,
      });
      setContacts(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  }

  async function deleteContact(id: string) {
    toast.custom((t) => (
      <div className="w-full max-w-sm flex flex-col gap-3 p-3 rounded-lg bg-white shadow-md">
        <p className="text-sm text-gray-800"> Are you sure you want to delete this contact? <br />
          <span className="text-xs text-gray-500">(This action cannot be undone)</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button className="w-full sm:w-auto px-3 py-1.5 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={() => toast.dismiss(t)} >
            Cancel
          </button>
          <button className="w-full sm:w-auto px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
            onClick={async () => {
              try {
                await contactService.deleteContact(id);
                toast.success("Contact deleted successfully");
                fetchContacts();
              }
              catch (err) {
                toast.error("Failed to delete contact");
              }
              finally {
                toast.dismiss(t);
              }
            }}>
            Delete
          </button>
        </div>
      </div>
    ),
      { duration: Infinity });
  }

  useEffect(() => {
    updateUrl(debouncedSearch, page);
    fetchContacts();
  }, [debouncedSearch, page]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        {/* 👇 keep search bar always visible */}
        <ContactSearchBar
          value={search}
          onChange={setSearch}
          onSearch={() => setPage(1)}
        />
      </div>

      {contacts.length === 0 && !loading ? (
        <p className="text-muted-foreground text-center">No contacts found</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <ContactTable
              contacts={contacts}
              loading={loading} // 👈 only content loads
              onSelect={setSelected}
              onDeleted={deleteContact}
            />
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden">
            <ContactCardList
              contacts={contacts}
              loading={loading}
              onSelect={setSelected}
              onDeleted={deleteContact}
            />
          </div>
        </>
      )}

      {/* Pagination Controls */}
      {contacts.length > 0 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <ContactMessageModal
        open={!!selected}
        onClose={() => setSelected(null)}
        contact={selected}
      />
    </div>
  );
}
