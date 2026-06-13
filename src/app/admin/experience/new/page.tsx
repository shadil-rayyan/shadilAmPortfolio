import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { ExperienceEditor } from "@/components/admin/experience-editor";

export default async function NewExperiencePage() {
  const { session } = await validateRequest();
  if (!session) return redirect("/login");

  return <ExperienceEditor />;
}
