import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
});

export const blogs = pgTable("blogs", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  content: text("content").notNull(),
  tags: text("tags"),
  image: text("image"),
  published: boolean("published").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  image: text("image"),
  video: text("video"),
  tags: text("tags"),
  category: text("category"),
  github: text("github"),
  webapp: text("webapp"),
  published: boolean("published").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const experience = pgTable("experience", {
  id: text("id").primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  location: text("location"),
  period: text("period").notNull(),
  description: text("description"),
  order: text("order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"), 
  category: text("category"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(), 
  value: text("value").notNull(), 
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const education = pgTable("education", {
  id: text("id").primaryKey(),
  school: text("school").notNull(),
  degree: text("degree").notNull(),
  period: text("period").notNull(),
  grade: text("grade"),
  description: text("description"),
  image: text("image"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const techStack = pgTable("tech_stack", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  items: text("items").notNull(), // JSON string
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
