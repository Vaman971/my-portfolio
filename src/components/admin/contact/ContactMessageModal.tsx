"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {ContactMessage} from "@/services/contact";

type Props = {
  open: boolean;
  onClose: () => void;
  contact: ContactMessage | null;
};

export default function ContactMessageModal({ open, onClose, contact }: Props) {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Message from {contact.name}</DialogTitle>
          <DialogDescription>
            Sent on {new Date(contact.createdAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{contact.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Message</p>
            <p className="text-sm whitespace-pre-line">{contact.message}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
