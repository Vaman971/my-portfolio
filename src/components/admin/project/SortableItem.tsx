"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGripVertical } from "react-icons/fa";

export default function SortableItem({
  id,
  title,
  description,
  techStack,
  onEdit,
  onDelete,
}: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Live drag style
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "transform 0.05s linear" : transition, // keep it snappy
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-lg border flex items-start justify-between bg-white shadow-sm ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      {/* Drag handle + content */}
      <div className="flex flex-1 items-start">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing mr-3 mt-1 flex-shrink-0"
        >
          <FaGripVertical className="text-gray-400" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="mt-2 text-xs text-muted-foreground">
            {Array.isArray(techStack) ? techStack.join(" • ") : techStack}
          </div>
        </motion.div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 ml-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
