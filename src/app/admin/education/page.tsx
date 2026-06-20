export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/db/index";
import { education } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EducationList } from "@/components/admin/education-list";

export default async function AdminEducationPage() {
  let allEdu: any[] = [];
  try {
    allEdu = await db.select().from(education).orderBy(education.order, education.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin education history:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-muted-foreground mt-1">Your academic background. Drag to reorder.</p>
        </div>
        <Button asChild>
          <Link href="/admin/education/new">
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Link>
        </Button>
      </div>

      <EducationList educations={allEdu} />
    </div>
  );
}
