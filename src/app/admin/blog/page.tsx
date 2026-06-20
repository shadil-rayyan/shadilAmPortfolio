export const dynamic = "force-dynamic";

import { db } from "@/lib/db/index";
import { blogs } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { BlogList } from "@/components/admin/blog-list";

export default async function AdminBlogPage() {
  let allBlogs: any[] = [];
  try {
    allBlogs = await db.select().from(blogs).orderBy(blogs.order, blogs.createdAt);
  } catch (error) {
    console.error("Failed to fetch admin blog posts:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Write and manage your articles. Drag to reorder.</p>
        </div>
        <Button asChild className="shadow-md">
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>

      <BlogList blogs={allBlogs} />
    </div>
  );
}
