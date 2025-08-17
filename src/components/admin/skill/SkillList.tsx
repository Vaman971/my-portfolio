"use client";

import * as React from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableSkillItem from "./SortableSkillItem";

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

export type ReorderSkillPayload = { id: string; order: number }[];

interface SkillListProps {
  skills: Skill[];
  onEdit: (id: string, values: Partial<SkillInput>) => void;
  onDelete: (id: string) => void;
  onReorder: (payload: ReorderSkillPayload) => void;
}

export default function SkillList({ skills, onEdit, onDelete, onReorder }: SkillListProps) {
  const [items, setItems] = React.useState(skills);
  const sensors = useSensors(useSensor(PointerSensor));

  React.useEffect(() => {
    setItems(skills);
  }, [skills]);

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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        {items.map((skill) => (
          <SortableSkillItem key={skill.id} skill={skill} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
