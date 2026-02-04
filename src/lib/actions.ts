"use server";

import { db } from "@/lib/db/index";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; 
import { validateRequest } from "@/lib/auth-utils";
import { adminAuth } from "./firebase/firebaseadmin";
import { nanoid } from "nanoid";

export async function createSession(idToken: string) {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    (await cookies()).set("__session", sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
    
    return { success: true };
}

export async function logout() {
    (await cookies()).set("__session", "", { maxAge: 0 });
    return redirect("/admin/login");
}

export async function createBlogPost(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug || !content) {
    return { error: "Missing required fields" };
  }

  try {
    await db.insert(blogs).values({
      id: nanoid(),
      title,
      slug,
      description,
      content,
      tags,
      published,
    });
  } catch (e) {
    return { error: "Slug already exists or database error" };
  }

  revalidatePath("/blog");
  return redirect("/admin");
}

export async function deleteBlogPost(id: string) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  await db.delete(blogs).where(eq(blogs.id, id));
  revalidatePath("/blog");
  revalidatePath("/admin");
  return { success: true };
}
