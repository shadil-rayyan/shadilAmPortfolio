import { db } from "@/lib/db/index";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth-utils";
import { ProjectEditor } from "@/components/admin/project-editor";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { session } = await validateRequest();
  if (!session) return redirect("/login");

  const { id } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);

  if (!project) notFound();

  return <ProjectEditor project={project} />;
}
