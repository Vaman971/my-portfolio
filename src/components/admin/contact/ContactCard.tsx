"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Eye } from "lucide-react";
import { ContactMessage } from "@/services/contact";

type Props = {
  contact: ContactMessage;
  onDelete: (id: string) => void;
  onSelect: (contact: ContactMessage) => void; // ✅ added
  
};

export default function ContactCard({ contact, onDelete, onSelect }: Props) {

  return (
    <>
      <Card className="w-full shadow-md hover:shadow-lg transition">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{contact.name}</span>
            <span className="text-sm text-muted-foreground">
              {new Date(contact.createdAt).toLocaleDateString()}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Mail size={16} /> {contact.email}
          </p>
          <p className="mt-2 line-clamp-3">{contact.message}</p>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onSelect(contact); // ✅ notify parent
              }}
            >
              <Eye size={16} className="mr-1" /> View
            </Button>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(contact.id)}
          >
            <Trash2 size={16} className="mr-1" /> Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
