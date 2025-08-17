"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceEditor from "./ExperienceEditor";

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  bullets: string[];
  order: number;
}

export interface ExperienceInput {
  role: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  bullets: string[];
}

interface SortableExperienceItemProps {
  experience: Experience;
  onEdit: (id: string, values: Partial<ExperienceInput>) => void;
  onDelete: (id: string) => void;
}

export default function SortableExperienceItem({
  experience,
  onEdit,
  onDelete,
}: SortableExperienceItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: experience.id });

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
          <div className="font-medium">{experience.role}</div>
          <div className="text-sm text-muted-foreground">
            {experience.company} • {experience.startDate} –{" "}
            {experience.endDate || "Present"}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <ExperienceEditor
          initial={experience}
          onSave={(values) => onEdit(experience.id, values)}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(experience.id);
          }}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}
