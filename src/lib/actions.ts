"use server";

import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache"; 

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username");
  if (typeof username !== "string" || username.length < 3 || username.length > 31) {
    return { error: "Invalid username" };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    return { error: "Invalid password" };
  }

  const [existingUser] = await db.select().from(users).where(eq(users.username, username.toLowerCase()));
  if (!existingUser) {
    return { error: "Incorrect username or password" };
  }

  const validPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return { error: "Incorrect username or password" };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/admin");
}

export async function logout() {
  const { session } = await validateRequest();
  if (!session) {
    return { error: "Unauthorized" };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/admin/login");
}

import { validateRequest } from "@/lib/auth-utils";

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
      id: generateIdFromEntropySize(10),
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
