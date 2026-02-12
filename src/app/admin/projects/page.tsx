export const dynamic = "force-dynamic";

import Link from "next/link";

import { db } from "@/lib/db/index";
import { projects } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil, ExternalLink } from "lucide-react";
import { deleteProject } from "@/lib/actions";

export default async function AdminProjectsPage() {
  let allProjectsData: any[] = [];
  try {
    allProjectsData = await db.select().from(projects).orderBy(projects.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin projects:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Showcase your best work.</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      <div className="border-2 rounded-xl overflow-hidden bg-card shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="p-4 font-semibold text-sm">Project</th>
              <th className="p-4 font-semibold text-sm">Category</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProjectsData.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-muted-foreground italic">No projects found. Use the migration script or add manually (soon).</td>
              </tr>
            ) : (
              allProjectsData.map((project) => (
                <tr key={project.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
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
                  <td className="p-4 text-right flex justify-end gap-2">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
