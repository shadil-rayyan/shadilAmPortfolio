import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { SkillEditor } from "@/components/admin/skill-editor";

export default async function NewSkillPage() {
  const { session } = await validateRequest();
  if (!session) return redirect("/login");

  return <SkillEditor />;
}
