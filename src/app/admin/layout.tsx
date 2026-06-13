import { Header } from "@/components/header";
import { AdminNav } from "@/components/admin/admin-nav";
import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session } = await validateRequest();
   if (!session) {
     return redirect("/login");
   }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <AdminNav />
        <main className="flex-1 p-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
