"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProject, reorderProjects } from "@/lib/actions";
import { SortableList, SortableTableRow } from "./sortable-list";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string | null;
  published: boolean | null;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [items, setItems] = useState(projects.map((p) => p.id));
  const [isReordering, setIsReordering] = useState(false);
  const { toast } = useToast();

  const handleReorder = async (newOrder: string[]) => {
    setItems(newOrder);
    setIsReordering(true);
    const result = await reorderProjects(newOrder);
    setIsReordering(false);
    if (result?.error) {
      toast({ title: "Error reordering", variant: "destructive" });
    }
  };

  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));

  return (
    <div className="border-2 rounded-xl overflow-hidden bg-card shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="w-10"></th>
            <th className="p-4 font-semibold text-sm">Project</th>
            <th className="p-4 font-semibold text-sm">Category</th>
            <th className="p-4 font-semibold text-sm">Status</th>
            <th className="p-4 font-semibold text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-12 text-center text-muted-foreground italic">No projects found.</td>
            </tr>
          ) : (
            <SortableList items={items} onReorder={handleReorder}>
              {items.map((id) => {
                const project = projectMap[id];
                if (!project) return null;
                return (
                  <SortableTableRow key={project.id} id={project.id}>
                    <td className="p-4">
                      <div className="font-semibold">{project.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">{project.description}</div>
                    </td>
                    <td className="p-4 text-sm font-medium text-primary uppercase">{project.category || "General"}</td>
                    <td className="p-4">
                      {project.published ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20">Active</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Draft</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/projects/edit/${project.id}`}><Pencil className="h-4 w-4" /></Link>
                        </Button>
                        <form action={async () => {
                          "use server";
                          await deleteProject(project.id);
                        }}>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
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
