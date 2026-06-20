export const dynamic = "force-dynamic";

import Link from "next/link";

import { db } from "@/lib/db/index";
import { projects } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectList } from "@/components/admin/project-list";

export default async function AdminProjectsPage() {
  let allProjectsData: any[] = [];
  try {
    allProjectsData = await db.select().from(projects).orderBy(projects.order, projects.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin projects:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Showcase your best work. Drag to reorder.</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      <ProjectList projects={allProjectsData} />
    </div>
  );
}
