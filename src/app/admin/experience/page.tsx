export const dynamic = "force-dynamic";

import Link from "next/link";

import { db } from "@/lib/db/index";
import { experience } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExperienceList } from "@/components/admin/experience-list";

export default async function AdminExperiencePage() {
  let allExp: any[] = [];
  try {
    allExp = await db.select().from(experience).orderBy(experience.order, experience.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin experience list:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Work Experience</h1>
          <p className="text-muted-foreground mt-1">Your professional journey. Drag to reorder.</p>
        </div>
        <Button asChild>
          <Link href="/admin/experience/new">
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Link>
        </Button>
      </div>

      <ExperienceList experiences={allExp} />
    </div>
  );
}
