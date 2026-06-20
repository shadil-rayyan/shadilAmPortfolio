"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteExperience, reorderExperience } from "@/lib/actions";
import { SortableList, SortableTableRow } from "./sortable-list";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
}

interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  const [items, setItems] = useState(experiences.map((e) => e.id));
  const [isReordering, setIsReordering] = useState(false);
  const { toast } = useToast();

  const handleReorder = async (newOrder: string[]) => {
    setItems(newOrder);
    setIsReordering(true);
    const result = await reorderExperience(newOrder);
    setIsReordering(false);
    if (result?.error) {
      toast({ title: "Error reordering", variant: "destructive" });
    }
  };

  const expMap = Object.fromEntries(experiences.map((e) => [e.id, e]));

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await deleteExperience(id);
    window.location.reload();
  };

  return (
    <div className="border-2 rounded-xl overflow-hidden bg-card shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="w-10"></th>
            <th className="p-4 font-semibold text-sm">Company</th>
            <th className="p-4 font-semibold text-sm">Position</th>
            <th className="p-4 font-semibold text-sm">Period</th>
            <th className="p-4 font-semibold text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-12 text-center text-muted-foreground italic">No experience added yet.</td>
            </tr>
          ) : (
            <SortableList items={items} onReorder={handleReorder}>
              {items.map((id) => {
                const exp = expMap[id];
                if (!exp) return null;
                return (
                  <SortableTableRow key={exp.id} id={exp.id}>
                    <td className="p-4 font-semibold">{exp.company}</td>
                    <td className="p-4">{exp.position}</td>
                    <td className="p-4 text-sm text-muted-foreground italic">{exp.period}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/experience/edit/${exp.id}`}><Pencil className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(exp.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </SortableTableRow>
                );
              })}
            </SortableList>
          )}
        </tbody>
      </table>
      {isReordering && (
        <div className="p-2 text-center text-sm text-muted-foreground bg-muted/20">
          Saving order...
        </div>
      )}
    </div>
  );
}
