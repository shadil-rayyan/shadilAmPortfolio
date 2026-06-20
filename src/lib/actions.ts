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
    if (!adminAuth) return { error: "Firebase not configured" };
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Firebase expects milliseconds
    const expiresInMs = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await adminAuth.createSessionCookie(
        idToken,
        { expiresIn: expiresInMs }
    );

    // Browser cookie maxAge expects seconds
    const maxAgeSeconds = 60 * 60 * 24 * 5; // 5 days

    (await cookies()).set("__session", sessionCookie, {
        maxAge: maxAgeSeconds,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return { success: true };
}
export async function logout() {
    (await cookies()).delete("__session");
    redirect("/login");
}

export async function createBlogPost(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tagsRaw = formData.get("tags") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug || !content) {
    return { error: "Missing required fields" };
  }

  const tags = JSON.stringify(tagsRaw.split(",").map(t => t.trim()).filter(Boolean));

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

export async function updateBlogPost(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tagsRaw = formData.get("tags") as string;
  const published = formData.get("published") === "on";

  if (!id || !title || !slug || !content) {
    return { error: "Missing required fields" };
  }

  const tags = JSON.stringify(tagsRaw.split(",").map(t => t.trim()).filter(Boolean));

  try {
    await db.update(blogs)
      .set({
        title,
        slug,
        description,
        content,
        tags,
        published,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id));
  } catch (e) {
    return { error: "Slug already exists or database error" };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
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

// Projects
import { settings, projects, experience, skills, education, techStack } from "@/lib/db/schema";

// Tech Stack
export async function deleteTechStack(id: string) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  await db.delete(techStack).where(eq(techStack.id, id));
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function createTechStack(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const items = formData.get("items") as string;

  try {
    await db.insert(techStack).values({
      id: nanoid(),
      name,
      items,
    });
    revalidatePath("/");
    return redirect("/admin/settings");
  } catch (e) {
    return { error: "Error creating tech stack" };
  }
}

export async function updateTechStack(formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const items = formData.get("items") as string;

  try {
    await db.update(techStack).set({ name, items }).where(eq(techStack.id, id));
    revalidatePath("/");
  } catch (e) {
    console.error("Error updating tech stack:", e);
  }
  return redirect("/admin/settings");
}

export async function updateSettings(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const key = formData.get("key") as string;
  const value = formData.get("value") as string;

  try {
    await db.insert(settings).values({
      id: nanoid(),
      key,
      value,
    }).onConflictDoUpdate({
      target: settings.key,
      set: { value, updatedAt: new Date() },
    });
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: "Error updating settings" };
  }
}

export async function createProject(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const tagsRaw = formData.get("tags") as string;
  const github = formData.get("github") as string;
  const webapp = formData.get("webapp") as string;
  const published = formData.get("published") === "on";

  const tags = JSON.stringify(tagsRaw.split(",").map(t => t.trim()).filter(Boolean));

  try {
    await db.insert(projects).values({
      id: nanoid(),
      title,
      slug,
      description,
      tags,
      github,
      webapp,
      published,
    });
    revalidatePath("/");
    return redirect("/admin/projects");
  } catch (e) {
    return { error: "Error creating project" };
  }
}

export async function updateProject(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const tagsRaw = formData.get("tags") as string;
  const github = formData.get("github") as string;
  const webapp = formData.get("webapp") as string;
  const published = formData.get("published") === "on";

  const tags = JSON.stringify(tagsRaw.split(",").map(t => t.trim()).filter(Boolean));

  try {
    await db.update(projects).set({ title, slug, description, tags, github, webapp, published }).where(eq(projects.id, id));
    revalidatePath("/");
    return redirect("/admin/projects");
  } catch (e) {
    return { error: "Error updating project" };
  }
}

export async function deleteProject(id: string) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

// Experience
export async function createExperience(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;
  const period = formData.get("period") as string;
  const description = formData.get("description") as string;

  try {
    await db.insert(experience).values({
      id: nanoid(),
      company,
      position,
      location,
      period,
      description,
    });
    revalidatePath("/");
    return redirect("/admin/experience");
  } catch (e) {
    return { error: "Error creating experience" };
  }
}

export async function updateExperience(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;
  const period = formData.get("period") as string;
  const description = formData.get("description") as string;

  try {
    await db.update(experience).set({ company, position, location, period, description }).where(eq(experience.id, id));
    revalidatePath("/");
    return redirect("/admin/experience");
  } catch (e) {
    return { error: "Error updating experience" };
  }
}

export async function deleteExperience(id: string) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  await db.delete(experience).where(eq(experience.id, id));
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

// Skills
export async function createSkill(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const icon = formData.get("icon") as string;

  try {
    await db.insert(skills).values({
      id: nanoid(),
      title,
      category,
      icon,
    });
    revalidatePath("/");
    return redirect("/admin/skills");
  } catch (e) {
    return { error: "Error creating skill" };
  }
}

export async function updateSkill(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const icon = formData.get("icon") as string;

  try {
    await db.update(skills).set({ title, category, icon }).where(eq(skills.id, id));
    revalidatePath("/");
    return redirect("/admin/skills");
  } catch (e) {
    return { error: "Error updating skill" };
  }
}

export async function deleteSkill(id: string) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  await db.delete(skills).where(eq(skills.id, id));
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

// Education
export async function createEducation(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const school = formData.get("school") as string;
  const degree = formData.get("degree") as string;
  const period = formData.get("period") as string;
  const grade = formData.get("grade") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  try {
    await db.insert(education).values({
      id: nanoid(),
      school,
      degree,
      period,
      grade,
      description,
      image,
    });
    revalidatePath("/");
    return redirect("/admin/education");
  } catch (e) {
    return { error: "Error creating education" };
  }
}

export async function updateEducation(prevState: any, formData: FormData) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const school = formData.get("school") as string;
  const degree = formData.get("degree") as string;
  const period = formData.get("period") as string;
  const grade = formData.get("grade") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  try {
    await db.update(education).set({ school, degree, period, grade, description, image }).where(eq(education.id, id));
    revalidatePath("/");
    return redirect("/admin/education");
  } catch (e) {
    return { error: "Error updating education" };
  }
}

export async function deleteEducation(id: string) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  await db.delete(education).where(eq(education.id, id));
  revalidatePath("/");
  revalidatePath("/admin/education");
  return { success: true };
}

// Reorder actions
export async function reorderBlogPosts(ids: string[]) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  try {
    for (let i = 0; i < ids.length; i++) {
      await db.update(blogs).set({ order: i }).where(eq(blogs.id, ids[i]));
    }
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (e) {
    return { error: "Error reordering blog posts" };
  }
}

export async function reorderProjects(ids: string[]) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  try {
    for (let i = 0; i < ids.length; i++) {
      await db.update(projects).set({ order: i }).where(eq(projects.id, ids[i]));
    }
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: "Error reordering projects" };
  }
}

export async function reorderExperience(ids: string[]) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  try {
    for (let i = 0; i < ids.length; i++) {
      await db.update(experience).set({ order: String(i) }).where(eq(experience.id, ids[i]));
    }
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: "Error reordering experience" };
  }
}

export async function reorderEducation(ids: string[]) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  try {
    for (let i = 0; i < ids.length; i++) {
      await db.update(education).set({ order: i }).where(eq(education.id, ids[i]));
    }
    revalidatePath("/admin/education");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: "Error reordering education" };
  }
}

export async function reorderSkills(ids: string[]) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  try {
    for (let i = 0; i < ids.length; i++) {
      await db.update(skills).set({ order: i }).where(eq(skills.id, ids[i]));
    }
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: "Error reordering skills" };
  }
}

export async function reorderTechStack(ids: string[]) {
  const { session } = await validateRequest();
  if (!session) return { error: "Unauthorized" };
  try {
    for (let i = 0; i < ids.length; i++) {
      await db.update(techStack).set({ order: i }).where(eq(techStack.id, ids[i]));
    }
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: "Error reordering tech stack" };
  }
}
