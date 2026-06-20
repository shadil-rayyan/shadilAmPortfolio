export const dynamic = "force-dynamic";

import { db } from "@/lib/db/index";
import { skills } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SkillList } from "@/components/admin/skill-list";

export default async function AdminSkillsPage() {
  let allSkills: any[] = [];
  try {
    allSkills = await db.select().from(skills).orderBy(skills.order, skills.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin skills:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground mt-1">Technologies you master. Drag to reorder.</p>
        </div>
        <Button asChild>
          <Link href="/admin/skills/new">
            <Plus className="mr-2 h-4 w-4" /> Add Skill
          </Link>
        </Button>
      </div>

      <SkillList skills={allSkills} />
    </div>
  );
}
