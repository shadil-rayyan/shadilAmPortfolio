import { db } from "@/lib/db/index";
import { experience } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth-utils";
import { ExperienceEditor } from "@/components/admin/experience-editor";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { session } = await validateRequest();
  if (!session) return redirect("/login");

  const { id } = await params;
  const [exp] = await db.select().from(experience).where(eq(experience.id, id)).limit(1);

  if (!exp) notFound();

  return <ExperienceEditor exp={exp} />;
}
