export const dynamic = "force-dynamic";

import { LoginForm } from "@/components/admin/login-form";
import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { session } = await validateRequest();
  if (session) {
    return redirect("/admin");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
      <LoginForm />
    </div>
  );
}
