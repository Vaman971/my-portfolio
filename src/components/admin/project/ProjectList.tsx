"use client";

import React, { useState,useEffect } from "react";
import {SortableContext, arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {DndContext, PointerSensor, useSensor, useSensors, closestCenter, KeyboardSensor} from "@dnd-kit/core";
import SortableItem from "./SortableItem";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ProjectList({ projects, onEdit, onDelete, onReorder }: any) {
  // use local order state for optimistic UI
  const [items, setItems] = useState(projects.map((p: any) => p.id));
  useEffect(() => setItems(projects.map((p: any) => p.id)), [projects]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function findProjectById(id: string) {
    return projects.find((p: any) => p.id === id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    // compute new order payload (use new index + 1)
    const payload = newItems.map((id, idx) => ({ id, order: idx + 1 }));
    onReorder(payload);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <div className="space-y-3">
          {items.map((id: any) => {
            const p = findProjectById(id);
            return (
              <SortableItem
                key={id}
                id={id}
                title={p?.title}
                description={p?.description}
                techStack={p?.techStack}
                onEdit={() => onEdit(id)}
                onDelete={() => onDelete(id)}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
