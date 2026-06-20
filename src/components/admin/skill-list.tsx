"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import { deleteSkill, reorderSkills } from "@/lib/actions";
import { SortableGrid, SortableGridItem } from "./sortable-list";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  title: string;
  category: string | null;
}

interface SkillListProps {
  skills: Skill[];
}

export function SkillList({ skills }: SkillListProps) {
  const [items, setItems] = useState(skills.map((s) => s.id));
  const [isReordering, setIsReordering] = useState(false);
  const { toast } = useToast();

  const handleReorder = async (newOrder: string[]) => {
    setItems(newOrder);
    setIsReordering(true);
    const result = await reorderSkills(newOrder);
    setIsReordering(false);
    if (result?.error) {
      toast({ title: "Error reordering", variant: "destructive" });
    }
  };

  const skillMap = Object.fromEntries(skills.map((s) => [s.id, s]));

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await deleteSkill(id);
    window.location.reload();
  };

  return (
    <div className="space-y-2">
      <SortableGrid items={items} onReorder={handleReorder}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((id) => {
            const skill = skillMap[id];
            if (!skill) return null;
            return (
              <SortableGridItem key={skill.id} id={skill.id}>
                <div className="p-4 border rounded-xl bg-card flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-semibold">{skill.title}</h3>
                    <p className="text-[10px] text-muted-foreground italic uppercase tracking-widest">{skill.category}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/skills/edit/${skill.id}`}><Pencil className="h-3 w-3" /></Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(skill.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </SortableGridItem>
            );
          })}
        </div>
      </SortableGrid>
      {isReordering && (
        <div className="p-2 text-center text-sm text-muted-foreground bg-muted/20 rounded">
          Saving order...
        </div>
      )}
    </div>
  );
}
