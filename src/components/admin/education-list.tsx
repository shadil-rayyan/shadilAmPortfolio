"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, GraduationCap, Pencil } from "lucide-react";
import { deleteEducation, reorderEducation } from "@/lib/actions";
import { SortableList, SortableCard } from "./sortable-list";
import { useToast } from "@/hooks/use-toast";

interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}

interface EducationListProps {
  educations: Education[];
}

export function EducationList({ educations }: EducationListProps) {
  const [items, setItems] = useState(educations.map((e) => e.id));
  const [isReordering, setIsReordering] = useState(false);
  const { toast } = useToast();

  const handleReorder = async (newOrder: string[]) => {
    setItems(newOrder);
    setIsReordering(true);
    const result = await reorderEducation(newOrder);
    setIsReordering(false);
    if (result?.error) {
      toast({ title: "Error reordering", variant: "destructive" });
    }
  };

  const eduMap = Object.fromEntries(educations.map((e) => [e.id, e]));

  return (
    <div className="space-y-2">
      <SortableList items={items} onReorder={handleReorder}>
        {items.map((id) => {
          const edu = eduMap[id];
          if (!edu) return null;
          return (
            <SortableCard key={edu.id} id={edu.id}>
              <div className="p-4 border rounded-xl bg-card flex items-center justify-between shadow-sm w-full">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school} • {edu.period}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/education/edit/${edu.id}`}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                  <form action={async () => {
                    "use server";
                    await deleteEducation(edu.id);
                  }}>
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </SortableCard>
          );
        })}
      </SortableList>
      {isReordering && (
        <div className="p-2 text-center text-sm text-muted-foreground bg-muted/20 rounded">
          Saving order...
        </div>
      )}
    </div>
  );
}
