"use client";

import { ContactMessage } from "@/services/contact";
import ContactCard from "./ContactCard";

type Props = {
  contacts: ContactMessage[];
  loading: boolean;
  onSelect: (contact: ContactMessage) => void;
  onDeleted: (id: string) => void;
};

export default function ContactCardList({ contacts, loading, onSelect, onDeleted }: Props) {
  return (
    <div className="grid gap-4">
      {loading ? (
        <p className="text-center text-muted-foreground">Loading contacts...</p>
      ) : contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={onDeleted}
            onSelect={onSelect}
          />
        ))
      ) : (
        <p className="text-center text-muted-foreground">No contacts found</p>
      )}
    </div>
  );
}
