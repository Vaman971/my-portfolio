"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillEditor from "./SkillEditor";

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  order: number;
}

export interface SkillInput {
  name: string;
  category: string;
  level: number;
  icon?: string;
}

interface SortableSkillItemProps {
  skill: Skill;
  onEdit: (id: string, values: Partial<SkillInput>) => void;
  onDelete: (id: string) => void;
}

export default function SortableSkillItem({
  skill,
  onEdit,
  onDelete,
}: SortableSkillItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: skill.id });

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
          <div className="font-medium">{skill.name}</div>
          <div className="text-sm text-muted-foreground">
            {skill.category} • {skill.level}%
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <SkillEditor
          initial={skill}
          onSave={(values) => onEdit(skill.id, values)}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(skill.id);
          }}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}
