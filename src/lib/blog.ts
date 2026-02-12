import { db } from './db/index';
import { blogs } from './db/schema';
import { desc, eq, and } from 'drizzle-orm';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags?: string[];
  image?: string;
  author: string;
}

export async function getAllPosts(): Promise<Omit<BlogPost, 'content'>[]> {
  try {
    const posts = await db.select({
      slug: blogs.slug,
      title: blogs.title,
      date: blogs.createdAt,
      description: blogs.description,
      tags: blogs.tags,
      image: blogs.image
    })
    .from(blogs)
    .where(eq(blogs.published, true))
    .orderBy(desc(blogs.createdAt));

    return posts.map(post => ({
      ...post,
      date: post.date ? post.date.toISOString() : new Date().toISOString(),
      tags: post.tags ? JSON.parse(post.tags) : [],
      description: post.description || "",
      image: post.image || undefined,
      author: "Shadil AM"
    }));
  } catch (error) {
    console.error("Failed to fetch all posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const [post] = await db.select()
      .from(blogs)
      .where(and(eq(blogs.slug, slug), eq(blogs.published, true)))
      .limit(1);

    if (!post) return null;

    return {
      slug: post.slug,
      title: post.title,
      date: post.createdAt ? post.createdAt.toISOString() : new Date().toISOString(),
      description: post.description || "",
      content: post.content,
      tags: post.tags ? JSON.parse(post.tags) : [],
      image: post.image || undefined,
      author: "Shadil AM"
    };
  } catch (error) {
    console.error(`Failed to fetch post by slug ${slug}:`, error);
    return null;
  }
}
