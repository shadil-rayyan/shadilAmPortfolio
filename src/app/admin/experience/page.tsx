export const dynamic = "force-dynamic";

import Link from "next/link";

import { db } from "@/lib/db/index";
import { experience } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteExperience } from "@/lib/actions";

export default async function AdminExperiencePage() {
  let allExp: any[] = [];
  try {
    allExp = await db.select().from(experience).orderBy(experience.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin experience list:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Work Experience</h1>
          <p className="text-muted-foreground mt-1">Your professional journey.</p>
        </div>
        <Button asChild>
          <Link href="/admin/experience/new">
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Link>
        </Button>
      </div>

      <div className="border-2 rounded-xl overflow-hidden bg-card shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="p-4 font-semibold text-sm">Company</th>
              <th className="p-4 font-semibold text-sm">Position</th>
              <th className="p-4 font-semibold text-sm">Period</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allExp.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-muted-foreground italic">No experience added yet.</td>
              </tr>
            ) : (
              allExp.map((exp) => (
                <tr key={exp.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-semibold">{exp.company}</td>
                  <td className="p-4">{exp.position}</td>
                  <td className="p-4 text-sm text-muted-foreground italic">{exp.period}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/experience/edit/${exp.id}`}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    <form action={async () => {
                      "use server";
                      await deleteExperience(exp.id);
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
