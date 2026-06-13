import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { EducationEditor } from "@/components/admin/education-editor";

export default async function NewEducationPage() {
  const { session } = await validateRequest();
  if (!session) return redirect("/login");

  return <EducationEditor />;
}
