export const dynamic = "force-dynamic";

import { db } from "@/lib/db/index";
import { blogs } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, FileText, Pencil, Trash2 } from "lucide-react";
import { deleteBlogPost } from "@/lib/actions";

export default async function AdminBlogPage() {
  let allBlogs: any[] = [];
  try {
    allBlogs = await db.select().from(blogs).orderBy(blogs.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin blog posts:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Write and manage your articles.</p>
        </div>
        <Button asChild className="shadow-md">
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>

      <div className="border-2 rounded-xl overflow-hidden bg-card shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="p-4 font-semibold text-sm">Title</th>
              <th className="p-4 font-semibold text-sm text-center">Status</th>
              <th className="p-4 font-semibold text-sm">Date</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBlogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-muted-foreground italic">No posts yet.</td>
              </tr>
            ) : (
              allBlogs.map((blog) => (
                <tr key={blog.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium max-w-md truncate">{blog.title}</td>
                  <td className="p-4 text-center">
                    {blog.published ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20">Published</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Draft</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground italic">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild className="hover:text-primary">
                      <Link href={`/admin/blog/edit/${blog.id}`}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    <form action={async () => {
                      "use server";
                      await deleteBlogPost(blog.id);
                    }}>
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
