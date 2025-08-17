"use client";

import React, { useState, useEffect } from "react";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import SortableExperienceItem from "./SortableExperienceItem";

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

export type ReorderExperiencePayload = { id: string; order: number }[];

interface ExperienceListProps {
  experiences: Experience[];
  onEdit: (id: string, values: Partial<ExperienceInput>) => void;
  onDelete: (id: string) => void;
  onReorder: (payload: ReorderExperiencePayload) => void;
}

export default function ExperienceList({
  experiences,
  onEdit,
  onDelete,
  onReorder,
}: ExperienceListProps) {
  // local order state
  const [items, setItems] = useState(experiences);
  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {setItems(experiences);}, [experiences]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex).map((s, idx) => ({ ...s, order: idx }));
      setItems(newItems);
      onReorder(newItems.map((s) => ({ id: s.id, order: s.order })));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((i : any) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((experience : any) => {
            return (
              <SortableExperienceItem
                key={experience.id}
                experience={experience}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
      </SortableContext>
    </DndContext>
  );
}
