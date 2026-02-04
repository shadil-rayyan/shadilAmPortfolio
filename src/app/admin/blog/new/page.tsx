import { BlogEditor } from "@/components/admin/blog-editor";
import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";

export default async function NewBlogPostPage() {
  const { session } = await validateRequest();
  if (!session) {
    return redirect("/admin/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <BlogEditor />
      </main>
    </div>
  );
}
