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
  DragEndEvent,
} from "@dnd-kit/core";
import SortableAboutItem from "./SortableAboutItem";

export interface About {
  id: string;
  title: string;
  content: string;
  avatar?: string | null;
  order: number;
}

export type AboutInput = {
  title: string;
  content: string;
  avatar?: string | null;
};

export type ReorderAboutPayload = { id: string; order: number }[];

interface AboutListProps {
  abouts: About[];
  onEdit: (id: string, values: Partial<AboutInput>) => void;
  onDelete: (id: string) => void;
  onReorder: (payload: ReorderAboutPayload) => void;
}

export default function AboutList({
  abouts,
  onEdit,
  onDelete,
  onReorder,
}: AboutListProps) {
  const [items, setItems] = useState(abouts);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setItems(abouts);
  }, [abouts]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex).map((s, idx) => ({
        ...s,
        order: idx,
      }));
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
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((about) => (
          <SortableAboutItem
            key={about.id}
            about={about}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
