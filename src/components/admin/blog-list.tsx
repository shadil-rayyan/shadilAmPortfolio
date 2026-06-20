"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteBlogPost, reorderBlogPosts } from "@/lib/actions";
import { SortableList, SortableTableRow } from "./sortable-list";
import { useToast } from "@/hooks/use-toast";

interface Blog {
  id: string;
  title: string;
  published: boolean | null;
  createdAt: Date | null;
}

interface BlogListProps {
  blogs: Blog[];
}

export function BlogList({ blogs }: BlogListProps) {
  const [items, setItems] = useState(blogs.map((b) => b.id));
  const [isReordering, setIsReordering] = useState(false);
  const { toast } = useToast();

  const handleReorder = async (newOrder: string[]) => {
    setItems(newOrder);
    setIsReordering(true);
    const result = await reorderBlogPosts(newOrder);
    setIsReordering(false);
    if (result?.error) {
      toast({ title: "Error reordering", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteBlogPost(id);
    window.location.reload();
  };

  const blogMap = Object.fromEntries(blogs.map((b) => [b.id, b]));

  return (
    <div className="border-2 rounded-xl overflow-hidden bg-card shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="w-10"></th>
            <th className="p-4 font-semibold text-sm">Title</th>
            <th className="p-4 font-semibold text-sm text-center">Status</th>
            <th className="p-4 font-semibold text-sm">Date</th>
            <th className="p-4 font-semibold text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-12 text-center text-muted-foreground italic">No posts yet.</td>
            </tr>
          ) : (
            <SortableList items={items} onReorder={handleReorder}>
              {items.map((id) => {
                const blog = blogMap[id];
                if (!blog) return null;
                return (
                  <SortableTableRow key={blog.id} id={blog.id}>
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
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild className="hover:text-primary">
                          <Link href={`/admin/blog/edit/${blog.id}`}><Pencil className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(blog.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </SortableTableRow>
                );
              })}
            </SortableList>
          )}
        </tbody>
      </table>
      {isReordering && (
        <div className="p-2 text-center text-sm text-muted-foreground bg-muted/20">
          Saving order...
        </div>
      )}
    </div>
  );
}
