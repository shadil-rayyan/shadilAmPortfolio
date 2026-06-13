import { db } from "@/lib/db/index";
import { education } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth-utils";
import { EducationEditor } from "@/components/admin/education-editor";

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { session } = await validateRequest();
  if (!session) return redirect("/login");

  const { id } = await params;
  const [edu] = await db.select().from(education).where(eq(education.id, id)).limit(1);

  if (!edu) notFound();

  return <EducationEditor edu={edu} />;
}
