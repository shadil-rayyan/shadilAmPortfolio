import { db } from "@/lib/db/index";
import { socialMedia } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Mail,
  MessageCircle,
  Send,
  Rss,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Mail,
  MessageCircle,
  Send,
  Rss,
};

export async function SocialMediaSection() {
  let links: any[] = [];
  try {
    links = await db.select().from(socialMedia).orderBy(asc(socialMedia.order));
  } catch (error) {
    console.error("Failed to fetch social media links:", error);
  }

  if (links.length === 0) return null;

  return (
    <section className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-6">
          {links.map((link) => {
            const Icon = iconMap[link.icon] || Globe;
            return (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="h-6 w-6" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
