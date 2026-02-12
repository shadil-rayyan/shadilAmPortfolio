export const dynamic = "force-dynamic";

import { db } from "@/lib/db/index";
import { skills } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteSkill } from "@/lib/actions";
import Link from "next/link";

export default async function AdminSkillsPage() {
  let allSkills: any[] = [];
  try {
    allSkills = await db.select().from(skills);
  } catch (error) {
    console.error("Failed to fetch admin skills:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground mt-1">Technologies you master.</p>
        </div>
        <Button asChild>
          <Link href="/admin/skills/new">
            <Plus className="mr-2 h-4 w-4" /> Add Skill
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allSkills.map((skill) => (
          <div key={skill.id} className="p-4 border rounded-xl bg-card flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
                <h3 className="font-semibold">{skill.title}</h3>
                <p className="text-[10px] text-muted-foreground italic uppercase tracking-widest">{skill.category}</p>
            </div>
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/skills/edit/${skill.id}`}><Pencil className="h-3 w-3" /></Link>
                </Button>
                <form action={async () => {
                "use server";
                await deleteSkill(skill.id);
                }}>
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-3 w-3" />
                </Button>
                </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
