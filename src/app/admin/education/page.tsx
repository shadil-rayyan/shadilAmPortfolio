export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/db/index";
import { education } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap, Pencil } from "lucide-react";
import { deleteEducation } from "@/lib/actions";

export default async function AdminEducationPage() {
  let allEdu: any[] = [];
  try {
    allEdu = await db.select().from(education).orderBy(education.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin education history:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-muted-foreground mt-1">Your academic background.</p>
        </div>
        <Button asChild>
          <Link href="/admin/education/new">
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {allEdu.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-xl bg-card flex items-center justify-between shadow-sm">
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
        ))}
      </div>
    </div>
  );
}
