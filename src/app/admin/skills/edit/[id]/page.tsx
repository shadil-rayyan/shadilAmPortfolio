import { db } from "@/lib/db/index";
import { skills } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth-utils";
import { SkillEditor } from "@/components/admin/skill-editor";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { session } = await validateRequest();
  if (!session) return redirect("/login");

  const { id } = await params;
  const [skill] = await db.select().from(skills).where(eq(skills.id, id)).limit(1);

  if (!skill) notFound();

  return <SkillEditor skill={skill} />;
}
