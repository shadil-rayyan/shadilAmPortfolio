"use client";

import { useActionState, useState, useEffect } from "react";
import { createBlogPost, updateBlogPost } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface BlogEditorProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    content: string;
    tags: string | null;
    published: boolean | null;
  };
}

export function BlogEditor({ post }: BlogEditorProps) {
  const isEditing = !!post;
  const [state, action, isPending] = useActionState(
    isEditing ? updateBlogPost : createBlogPost, 
    null
  );
  
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      // Auto-slugify only when creating
      setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-2">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin"><ArrowLeft className="h-5 w-5"/></Link>
          </Button>
          <CardTitle>{isEditing ? "Edit Blog Post" : "Create New Post"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          {isEditing && <input type="hidden" name="id" value={post.id} />}
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="The Future of Web Dev" 
                required 
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input 
                id="slug" 
                name="slug" 
                placeholder="future-of-web-dev" 
                required 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="What is this post about?" 
              className="resize-none h-20"
              defaultValue={post?.description || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown/MDX)</Label>
            <Textarea 
              id="content" 
              name="content" 
              placeholder="# Welcome to my blog..." 
              className="min-h-[400px] font-mono text-sm leading-relaxed"
              required
              defaultValue={post?.content || ""}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 items-center">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                placeholder="react, nextjs, drizzle" 
                defaultValue={post?.tags || ""}
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch id="published" name="published" defaultChecked={post?.published || false} />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>

          {state?.error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md">
              {state.error}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isPending} className="px-8 shadow-md">
              {isPending ? "Saving..." : (
                <>
                  <Save className="mr-2 h-4 w-4" /> {isEditing ? "Update Post" : "Save Post"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
