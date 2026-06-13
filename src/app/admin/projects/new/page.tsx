import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { ProjectEditor } from "@/components/admin/project-editor";

export default async function NewProjectPage() {
  const { session } = await validateRequest();
  if (!session) return redirect("/login");

  return <ProjectEditor />;
}
