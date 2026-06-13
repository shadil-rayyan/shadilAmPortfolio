import { db } from "@/lib/db/index";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth-utils";
import { BlogEditor } from "@/components/admin/blog-editor";
import { Header } from "@/components/header";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { session } = await validateRequest();
  if (!session) {
    return redirect("/login");
  }

  const { id } = await params;
  const [post] = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <BlogEditor post={post} />
      </main>
    </div>
  );
}
