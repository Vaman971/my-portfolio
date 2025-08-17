"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutEditor from "./AboutEditor";

export interface About {
  id: string;
  title: string;
  content: string;
  avatar?: string | null;
  order: number;
}

export interface AboutInput {
  title: string;
  content: string;
  avatar?: string | null;
}

interface SortableAboutItemProps {
  about: About;
  onEdit: (id: string, values: Partial<AboutInput>) => void;
  onDelete: (id: string) => void;
}

export default function SortableAboutItem({
  about,
  onEdit,
  onDelete,
}: SortableAboutItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: about.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "transform 0.05s linear" : transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between bg-gray-50 dark:bg-neutral-800 
        rounded-lg mb-2 shadow-sm hover:shadow-md transition p-3 ${
          isDragging ? "shadow-lg scale-[1.02]" : ""
        }`}
    >
      {/* Left content + drag handle */}
      <div className="flex items-center gap-3 flex-1">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>

        <div>
          <div className="font-medium">{about.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {about.content}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <AboutEditor
          initial={about}
          onSave={(values) => onEdit(about.id, values)}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(about.id);
          }}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}
