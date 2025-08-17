"use client";

import { ContactMessage } from "@/services/contact";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Eye } from "lucide-react";

type ContactTableProps = {
  contacts: ContactMessage[];
  loading: boolean;
  onSelect: (contact: ContactMessage) => void;
  onDeleted: (id: string) => void;
};

export default function ContactTable({
  contacts,
  loading,
  onSelect,
  onDeleted,
}: ContactTableProps) {

  function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // add suffix to day
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year}`;
}

  return (
    <Card className="p-4 shadow-md rounded-2xl">
      <div className="overflow-x-auto max-h-[70vh] rounded-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="sticky top-0 bg-muted z-10">
            <tr className="text-left text-muted-foreground">
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Message</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6">
                  <div className="flex justify-center items-center py-10">
                    <TableSkeleton rows={5} />
                  </div>
                </td>
              </tr>
            ) : contacts.length > 0 ? (
              contacts.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-muted/40 transition-colors"
                >
                  <td className="p-3 font-medium">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3 max-w-[200px] truncate whitespace-nowrap overflow-hidden">{c.message}</td>
                  <td className="p-3 mx-5 text-sm whitespace-nowrap">
                    {formatDate(c.createdAt)}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onSelect(c)}
                        className="rounded-full"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDeleted(c.id)}
                        className="rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-10 text-muted-foreground italic"
                >
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/**
 * Skeleton Loader for table
 */
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex items-center gap-4 justify-between"
        >
          <div className="h-4 w-1/5 bg-muted rounded"></div>
          <div className="h-4 w-1/5 bg-muted rounded"></div>
          <div className="h-4 w-1/3 bg-muted rounded"></div>
          <div className="h-4 w-1/6 bg-muted rounded"></div>
          <div className="h-8 w-20 bg-muted rounded"></div>
        </div>
      ))}
    </div>
  );
}
